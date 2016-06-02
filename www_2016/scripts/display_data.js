
var displayJSON = function(data) { console.log(JSON.stringify(data, null, 2));};


// var BASE_WIDTH = 800, BASE_HEIGHT = 600;
var BASE_WIDTH = window.miConfig.base.width,
  BASE_HEIGHT = window.miConfig.base.height,
  CENTER_X = window.miConfig.base.centerX,
  CENTER_Y = window.miConfig.base.centerY ;

var BASE_RATIO = BASE_WIDTH / BASE_HEIGHT;

var AREAS_BY_LABEL = miConfig.areas.reduce(function(agg, area) {
  area.providers = {};
  agg[area.label] = area;
  return agg;
}, {});

var infos = [];
var defis = {};
var currentDefi = 'all';
var popin = null;
var detailPopin = null;
var typologies = {};


// Create popup

// getJSON
$(document).ready(function(){

  $.getJSON(miConfig.infosUri, function(data) {
      infos = data;
      initProviders(infos);
  });

  // Set dimensions
  var wW = $(window).width();
  var wH = $(window).height();

  var width, height;
  if ((wW / wH) < BASE_RATIO) {
    width = wW;
    height = wW / BASE_RATIO ;
  } else {
    height = wH;
    width = wH * BASE_RATIO ;

  }

  $("#container").width(width);
  $("#container").height(height);
  $("#container").css('margin-left', (wW - width) / 2);

  $("#container").click(onClickOpenListPopin);



  $(".defi").click(function(ev) {
    var defiBtn, src, newDefi, providersByAreas;
    // Deactivate previously selected defi.
    $('.defi').css('opacity', 0.5);

    // dataset not supported on IE < 11
    newDefi = ev.target.id;


    if (currentDefi === newDefi) {
      currentDefi = 'all';
      resetDefi();
      providersByAreas = AREAS_BY_LABEL;
    } else {
      currentDefi = newDefi;

      // Activate defi button.
      defiBtn = $('#' + newDefi);
      defiBtn.css('opacity', 1);

      // Show / Hide some typologies
      var filterValue = {
        '2016-08': '2016-08',
        '2016-09': ['2016-08', '2016-09'],
        '2017-01': ['2016-08', '2016-09', '2017-01'],
      }[newDefi];

      var list = filterList({ availability: filterValue })
      typologies = extractTypologies(list);
      providersByAreas = miConfig.areas.reduce(function(agg, area) {
        agg[area.label] = { providers:{}};
        return agg;
        }, {})
      dispatchProvidersOnAreas(list.infos, providersByAreas);
    }

    for (var typology in AREAS_BY_LABEL) {
      var mapElem = $('#' + typology);
      if (typologies[typology]) {
        mapElem.removeClass('grayed');
      } else {
        mapElem.addClass('grayed');
      }
    }

    console.log(providersByAreas);
    $('.provider').addClass('grayed');
    for (var label in providersByAreas) {
      var typology = providersByAreas[label];
      for (var provider in typology.providers) {
        var elem = $('#' + label + '_' + provider);
        elem.removeClass('grayed');
      }
    }


  });
  // $("#zoom").width(width);
  // $("#zoom").height(height);

  // $("#legend h3").each(function(i, elem) {
  //   var color = miConfig.typologiesMap[elem.innerHTML].color ;
  //   var colorStr = 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')' ;

  //   $(elem).css('color', colorStr);
  //   $(elem).next('p').css('color', colorStr);

  // });


  // $('#zoom').mousewheel(function(event) {
  //   if (event.target.className.indexOf('mapbg') != -1) {
  //     event.preventDefault();
  //     var delta = event.deltaY * event.deltaFactor / 2 ;
  //     zoom(delta);
  //   }
  // });
  // $('#zoomin').click(function() { zoom(24); });
  // $('#zoomout').click(function() { zoom(-24); });


});

dispatchProvidersOnAreas = function(infos, areas) {
  infos.forEach(function(data) {
    console.log(data);
    if (!(data.typology in areas)) { return; }

    data.providers.forEach(function(provider) {
        areas[data.typology].providers[provider] = true;
      });
  });
};

initProviders = function(infos) {
  //AREAS_BY_LABEL

  dispatchProvidersOnAreas(infos, AREAS_BY_LABEL);

  for (var label in AREAS_BY_LABEL) {
    var typology = AREAS_BY_LABEL[label];
    var index = 0;
    for (var provider in typology.providers) {
      var img = $('<img class="provider" id="' + label + '_' + provider + '" src="img/typologies/logo_' + provider.toLowerCase() + '.png" >');

      var coordinates = polarToAbsolute(typology.rMax - 5, typology.tMax - index * 0.13 - 0.2);
      index++;

      img.css('left', coordinates[0] + 'px');
      img.css('top', coordinates[1] + 'px');
      $('#container').append(img);
    }
  }

};

zoom = function(delta) {
    $('#container').width($('#container').width() + delta * BASE_RATIO);
    $('#container').height($('#container').height() + delta);

    // Automatically scroll down, to use whole available area.
    window.scrollTo(0, $('#zoom').offset().top);
}

onClickOpenListPopin = function(ev) {
    // if (dragDistance > 5) { return }
    var coord = toResizedPolar(ev);
    var inArea;
    inArea = miConfig.areas.filter(function(area) {
      if (area.rMin < coord.r && coord.r < area.rMax) {
        var tMax = area.tMax;
        var t = coord.t
        if (area.tMin > area.tMax) {
          tMax += 2 * Math.PI;
          if (coord.t < area.tMin) { t += 2 * Math.PI; }
        }
        if (area.tMin < t && t < tMax) {
          return true;
        }
      }
      return false;
    });

    if (inArea.length > 0) {
      var typology = inArea[0].label;
      if (typology === 'Center') {
        typology = 'Proifl';
      }
      var filter = { typology: typology };


      if (currentDefi != 'all') {
        filter.availability = currentDefi;
      }
      openListPopin(filter);
    }
};


var previousMouseMove;
drag = function(e) {
  e.preventDefault();
  var moveY = 0, moveX = 0;
  if (e.movementY !== undefined) {
    moveY = e.movementY;
    moveX = e.movementX;
  } else {
    if (previousMouseMove !== undefined) {
      moveY = e.screenY - previousMouseMove.y
      moveX = e.screenX - previousMouseMove.x
    }
    previousMouseMove = { x: e.screenX, y: e.screenY } ;
  }

  $('#zoom').scrollTop($('#zoom').scrollTop()  - moveY);
  $('#zoom').scrollLeft($('#zoom').scrollLeft()  - moveX);
  dragDistance += moveX * moveX + moveY * moveY ;

}

removeDrag = function(e) {
  $('#container').css('cursor', 'default');
  previousMouseMove = undefined;

  document.removeEventListener('mouseup', removeDrag);
  document.removeEventListener('mousemove', drag);

  onClickOpenListPopin(e)
}

// Make the background draggable
draggable = function(e) {
  dragDistance = 0;
  document.addEventListener('mouseup', removeDrag);

  if (e.target.className.indexOf('mapbg') != -1) {
    $('#container').css('cursor', 'grabbing');
    $('#container').css('cursor', '-webkit-grabbing');

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', removeDrag);
  }
}

resetDefi = function() {
  var defiBtn, src ;
  if (currentDefi != 'all') {
      defiBtn = $('[data-defi="' + currentDefi + '"].defi');
      src = defiBtn.attr('src').split('-')[0];
      defiBtn.attr('src', src + '.png');
  }

  currentDefi = 'all';
  $('img[data-typology]').hide();
}

getSizeRatio = function() {
  return $("#container").width() / BASE_WIDTH ;
}

getOffsetCoordinatesOfEvent = function(e) {
  var x = (e.offsetX || e.pageX - $(e.target).offset().left);
  var y = (e.offsetY || e.pageY - $(e.target).offset().top);
  return [x, y];
}

toResizedPolar = function(e) {
  console.log(e);
  var coords = getOffsetCoordinatesOfEvent(e);
  var x = coords[0];
  var y = coords[1];

  var sizeRatio = getSizeRatio();
  console.log("x: " + x + ", y: " + y);

  // apply ratio
  x = x / sizeRatio ;
  y = y / sizeRatio ;

  // var CENTER_X = 406 , CENTER_Y = 300 ;

  // move to centered direct cartesian
  x = x - CENTER_X ;
  y = -y + CENTER_Y ;

  console.log("x: " + x + ", y: " + y);

  // convert to polar
  r = Math.sqrt(x * x + y * y);
  t = Math.atan2(y, x);
  t = (t + 2 * Math.PI) %  (2 * Math.PI)
  console.log(r);
  console.log(t);
  return {r: r, t: t};
}

polarToAbsolute = function(r, t) {
  var x = r * Math.cos(t) + CENTER_X;
  var y = CENTER_Y - r * Math.sin(t);
  var sizeRatio = getSizeRatio();
  x *= sizeRatio;
  y *= sizeRatio;
  return [x, y];
}


openListPopin = function(filter) {
  if (popin) {
    popin.remove();
    popin = null;
  }
  var list;
  list = filterList(filter);
  console.log(list);
  $.extend(list, AREAS_BY_LABEL[list.title]);

  popin = $(templatelistpopin(list));

  popin.find('.close').click(function() {
    popin.remove();
  });

  popin.find('li span').click(function(ev) {
      var position = {
        left: $(ev.target).parents('.listpopin').position().left - 182 - Math.random() * 5,
        top: ev.pageY - $('#container').offset().top - 20,
      };
      console.log(ev);
      var name = ev.target.parentElement.dataset.title;
      console.log(getByKV('title', name));
      openDetailPopin(getByKV('title', name), position);
    });

  $("#container").append(popin);
};

openListPopinOLD = function(filter, position) {
  var popin, list;

  var template = function(list, position) {
    var caract = miConfig.typologiesMap[list.title];
    console.log(position);
    if (position === undefined) {
      var sizeRatio = $("#container").width() / BASE_WIDTH ;
      position = {
        left: caract.position.left * sizeRatio,
        top: caract.position.top * sizeRatio,
      }
    }

    position.left = Math.max(position.left, 0);
    position.top = Math.max(position.top, 0);

    var colors = caract.color.r + ', ' + caract.color.g + ', ' + caract.color.b ;
    var sizeRatio = $("#container").width() / BASE_WIDTH ;
    return "<div class='listpopin' data-title='" + list.title + "' style='border: solid 2px rgb(" + colors + "); left:" + position.left + "px;top:" + position.top + "px;' >"
    +   "<div class='header' style='background-color: rgb(" + colors + ");' >"
    +     "<img class='icon' src='img/" + caract.headerIcon  + "'>"
    +     "<h3>" + list.title + "</h3>"
    +     "<img src='img/close.png' class='close'/>"
    +   "</div>"
    +   "<div class='list'></div>"
    + "</div>";
  };

  var lineTemplate = function(info) {
    var html = "<li title='Où ? Comment y accéder ? ...' >" ;
     if (info.referential && info.typology != miConfig.referentialTypology) {
      html += "<img class='referentiallink' src='img/referential_link.png'>";
    }
    html +=   "<span>"
    +     info.desc
    +   "</span>";

    html += "</li>";

    var line = $(html);
    // Position of surrounding popups
    line.find('span').click(function(ev) {
      var position = {
        left: $(ev.target).parents('.listpopin').position().left - 182 - Math.random() * 5,
        top: ev.pageY - $('#container').offset().top - 20,
      };
      openDetailPopin(info, position);
    });
    line.find('.referentiallink').click(function(ev) {
      openListPopin({
        typology: miConfig.referentialTypology,
        referential: info.referential
      }, {
        left: $(ev.target).parents('.listpopin').position().left + 250 + 10,
        top: ev.pageY - $('#container').offset().top - 20
      });
    });

    return line;
  };

  list = filterList(filter);
  console.log(list);
  // only one popup with this typology
  if ($('[data-title="' + list.title + '"].listpopin').length > 0) { return; }


  if (list.infos.length == 0) {
    // totally filtered popin, don't show it empty.
    console.info("No info to dislpay.");
    return;
  }

  list = groupByKeyword(list);
  popin = $(template(list, position));

  var keywords = Object.keys(list.byKeyword);
  keywords.sort();
  var sublist;
  keywords.forEach(function(k) {
    sublist = $("<div>"
    +   "<h4>" + k + "</h4>"
    +   "<ul class='sublist'></ul>"
    + "</div>");
    list.byKeyword[k].forEach(function(info) {
      sublist.find('.sublist').append(lineTemplate(info));
    });
    popin.find('.list').append(sublist);
  });

  openPopin(popin)
    .draggable( "option", "handle", ".header" );
};


openDetailPopin = function(info) {
  // Only one detailpopin at a time
  if (detailPopin) {
    detailPopin.remove();
    detailPopin = null;
  }

  detailPopin = $(templatedetail(info));

  detailPopin.find('.close').click(function() {
    detailPopin.remove();
  });

  $("#container").append(detailPopin);

  detailPopin.find("img").error(function(){ $(this).hide(); });
  detailPopin.find('h1.textfill').textfill({ maxFontPixels: 90, });
  detailPopin.find('.textfill.slogan').textfill({ maxFontPixels: 30, });
  detailPopin.find('.textfill.description').textfill({ maxFontPixels: 20, });
  detailPopin.find('.textfill.category').textfill({ maxFontPixels: 20, });
  detailPopin.find('.textfill.website').textfill({ maxFontPixels: 20, });
};

openDetailPopinOLD = function(info, position) {
  // Don't open wame twice.
  if ($('[data-title="' + info.desc + '"].detailpopin').length > 0) { return; }


  var caract = miConfig.typologiesMap[info.typology];
  var colors = caract.color.r + ', ' + caract.color.g + ', ' + caract.color.b ;
  position.left = Math.max(position.left, 0);
  position.top = Math.max(position.top, 0);
  var position = "left:" + position.left
      + "px;top:" + position.top + "px;";
  if (info.supportExample) {
    info.supportExampleWLinks = info.supportExample.replace(/https?:\/\/([^\/]*)[^\s]*/g, "<a target='_blank' href='$&'>$1</a>");
  } else {
    info.supportExampleWLinks = '';
  }

  var template = function(info) {
    return "<div class='detailpopin' data-title='" + info.desc + "'style='" + position + "' >"
    +   "<div class='title'>"
    +     "<img src='img/close.png' class='close' />"
    +   info.desc
    +   "</div>"
    +   "<div class='support'>"
    +     "<div class='header'>"
    +       "<img src='img/icon_support.png' >"
    +       "<h4>OÙ</h4>"
    +     "</div>"
    +     "<p>" + info.support + "</p>"
    +   "</div>"
    +   "<div class='access'>"
    +     "<div class='header'>"
    +       "<img src='img/icon_access.png' >"
    +       "<h4>COMMENT Y ACCÉDER</h4>"
    +     "</div>"
    +     "<p>" + info.access + "</p>"
    +     "<p><i>" + info.supportExampleWLinks + "</i></p>"
    +   "</div>"
    +   "<div class='accesseasiness'>"
    +       "<h4>FACILITÉ D'ACCÈS</h4>"
    +       "<img src='img/accesseasiness_" + info.accessEasiness + ".png' >"
    +   "</div>"
    + "</div>";
  };

  openPopin(template(info));

}

openPopin = function(html) {
  var popin = $(html);

  popin.draggable({
    containment: '#zoom'
  });
  popin.find('.close').click(function() {
    popin.remove();
  });

  $("#container").append(popin);

  return popin;
}

getByKV = function(key, value) {
    var filter = {};
    filter[key] = value;
    var list = filterList(filter);
    return list.infos[0];
};

filterList = function(filter) {
  var list = {
    title: "search",
    // infos: [],
  };

  var hasValue = function(value, filterValue) {
    if (value && value instanceof Array) {
      return value.some(function(v) { return v === filterValue ;});
    } else {
      return value === filterValue;
    }
  };

  if ('typology' in filter) {
    list.title = filter.typology;
  }
  list.infos = infos.filter(function(info) {
      var keep = true;
      var passFilter = false;
      for (k in filter) {
        if (k === 'defi') {
          passFilter = $.inArray(info.desc, defis[filter[k]]) != -1;
        } else if (filter[k] instanceof Array) {
          passFilter = filter[k].some(function(v) { return hasValue(info[k], v); });
        } else {
          passFilter = hasValue(info[k], filter[k]);
        }

        keep = keep && passFilter ;
      }
      return keep;
  });
  return list;
};

groupByKeyword = function(list) {
  list.byKeyword = {};

  list.infos.forEach(function(info) {
    // TODO : domain --> keyword.
    if (!(info.domain in list.byKeyword)) {
      list.byKeyword[info.domain] = [];
    }
    list.byKeyword[info.domain].push(info);

  });
  return list;
};

extractTypologies = function(list) {
  typologies = {};

  list.infos.forEach(function(info) {
    typologies[info.typology] = true;
  });

  return typologies;
}
