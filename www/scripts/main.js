
var displayJSON = function(data) { console.log(JSON.stringify(data, null, 2));};


// var BASE_WIDTH = 800, BASE_HEIGHT = 600;
var BASE_WIDTH = 823, BASE_HEIGHT = 681;
var CENTER_X = 411 , CENTER_Y = 346 ;

var infos = [];
var defis = {};
var currentDefi = undefined;
// Create popup

// getJSON
$(document).ready(function(){

  $.getJSON(miConfig.infosUri, function(data) {
      infos = data;
  });

  var defiName, uri;
  for (defiName in miConfig.defis) {
    $.getJSON(miConfig.defis[defiName], function(data) {
      defis[defiName] = data;
    });
  }

  $('img').on('dragstart', function(event) { event.preventDefault(); });
  resetDefi();

  $('.mapbg').click(function(ev) {
    if (dragDistance > 5) { return }
    var coord = toResizedPolar(ev);
    var inArea;
    if (coord.r < 30) {
      inArea = [{label: "Mon profil"}];
    } else {
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
    }
    if (inArea.length > 0) {
      var filter = { typology: inArea[0].label };
      if (currentDefi) {
        filter.defi = currentDefi;
      }
      openListPopin(filter);
    }
  });

  $('#container').on('mousedown', draggable);


  $('#legend > [data-typology]').click(function(ev) {
    var filter = { typology: ev.target.dataset.typology };
    if (currentDefi) {
      filter.defi = currentDefi;
    }
    openListPopin(filter);
  });

  $('[data-defi]').click(function(ev) {
    var typologies;
    currentDefi = ev.target.dataset.defi;
    if (currentDefi === 'all') {
      resetDefi();
    } else {
      // Show / Hide some typologies
      typologies = extractTypologies(filterList({ defi: currentDefi }));
    }
    for (var typology in miConfig.typologiesMap) {
      var mapBg = $('img[data-typology="' + typology + '"]');
      console.log(mapBg);
      if (typologies[typology]) {
        mapBg.hide();
      } else {
        mapBg.show();
      }
    }
    // typologies =
  });

  // Set dimensions
  var ratio = BASE_WIDTH / BASE_HEIGHT;
  var wW = $(window).width();
  var wH = $(window).height();
  var width, height;
  if (wW / wH < ratio) {
    width = wW;
    height = wW / ratio ;
  } else {
    width = wH * ratio ;
    height = wH;
  }

  $("#container").width(width);
  $("#container").height(height);

  // $("#zoom").width(width);
  // $("#zoom").height(height);

  $("#legend h3").each(function(i, elem) {
    var color = miConfig.typologiesMap[elem.innerHTML].color ;
    var colorStr = 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')' ;

    $(elem).css('color', colorStr);
    $(elem).next('p').css('color', colorStr);

  });


  $('#zoom').mousewheel(function(event) {
    if (event.target.className.indexOf('mapbg') != -1) {
      event.preventDefault();
      var delta = event.deltaY * event.deltaFactor / 2 ;
      $('#container').width($('#container').width() + delta * ratio);
      $('#container').height($('#container').height() + delta);

      // Automatically scroll down, to use whole available area.
      window.scrollTo(0, $('#zoom').offset().top + $('zoom').height());
    }
  });

});


drag = function(e) {
  e.preventDefault();
  $('#zoom').scrollTop($('#zoom').scrollTop()  - e.movementY);
  $('#zoom').scrollLeft($('#zoom').scrollLeft()  - e.movementX);
  dragDistance += e.movementX * e.movementX + e.movementY * e.movementY ;

}

removeDrag = function() {
  document.removeEventListener('mouseup', removeDrag);
  document.removeEventListener('mousemove', drag);
}

// Make the background draggable
draggable = function(e) {
  console.log(e.target);
  if (e.target.className.indexOf('mapbg') != -1) {
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', removeDrag);
    dragDistance = 0;
  }
}

resetDefi = function() {
  currentDefi = undefined;
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

openListPopin = function(filter, position) {
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
    console.log(position);
    var colors = caract.color.r + ', ' + caract.color.g + ', ' + caract.color.b ;
    var sizeRatio = $("#container").width() / BASE_WIDTH ;
    return "<div class='listpopin' style='border: solid 2px rgb(" + colors + "); left:" + position.left + "px;top:" + position.top + "px;' >"
    +   "<div class='header' style='background-color: rgb(" + colors + ");' >"
    +     "<img class='icon' src='img/" + caract.headerIcon  + "'>"
    +     "<h3>" + list.title + "</h3>"
    +     "<img src='img/close.png' class='close'/>"
    +   "</div>"
    +   "<div class='list'></div>"
    + "</div>";
  };

  var lineTemplate = function(info) {
    var html = "<li>" ;
     if (info.referential) {
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

openDetailPopin = function(info, position) {
  var caract = miConfig.typologiesMap[info.typology];
  var colors = caract.color.r + ', ' + caract.color.g + ', ' + caract.color.b ;
  var position = "left:" + position.left
      + "px;top:" + position.top + "px;";
  if (info.supportExample) {
    info.supportExampleWLinks = info.supportExample.replace(/https?:\/\/([^\/]*)[^\s]*/g, "<a target='_blank' href='$&'>$1</a>");
  } else {
    info.supportExampleWLinks = '';
  }

  var template = function(info) {
    return "<div class='detailpopin' style='" + position + "' >"
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

  popin.draggable();
  popin.find('.close').click(function() {
    popin.remove();
  });

  $("#container").append(popin);

  return popin;
}

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
