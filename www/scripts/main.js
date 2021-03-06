
var displayJSON = function(data) { console.log(JSON.stringify(data, null, 2));};


// var BASE_WIDTH = 800, BASE_HEIGHT = 600;
var BASE_WIDTH = 823, BASE_HEIGHT = 681;
var CENTER_X = 411 , CENTER_Y = 346 ;

var BASE_RATIO = BASE_WIDTH / BASE_HEIGHT;

var infos = [];
var defis = {};
var currentDefi = 'all';
var popins = {};

// Create popup

// getJSON
$(document).ready(function(){

  $.getJSON(miConfig.infosUri, function(data) {
      infos = data;
  });

  var defiName, uri;
  async.eachSeries(Object.keys(miConfig.defis), function(defiName, callback) {
    $.getJSON(miConfig.defis[defiName], function(data) {
      defis[defiName] = data;
      console.log(defis);
      callback();
    });
    }, function() {
      console.log("Defi loaded");
    });

  $('img').on('dragstart', function(event) { event.preventDefault(); });
  resetDefi();



  $('#container').on('mousedown', draggable);


  $('#legend > [data-typology]').click(function(ev) {
    // dataset not supported on IE < 11
    var filter = { typology: $(ev.target).data().typology };
    if (currentDefi != 'all') {
      filter.defi = currentDefi;
    }
    openListPopin(filter);
  });

  $('[data-defi]').click(function(ev) {
    var defiBtn, src, newDefi;

    // Deactivate previously selected defi.
    if (currentDefi != 'all') {
      defiBtn = $('[data-defi="' + currentDefi + '"].defi');
      src = defiBtn.attr('src').split('-')[0];
      defiBtn.attr('src', src + '.png');
    }

    // dataset not supported on IE < 11
    newDefi = $(ev.target).data().defi;

    var typologies;
    if (currentDefi === newDefi) {
      currentDefi = 'all';
      resetDefi();
    } else {
      currentDefi = newDefi;

      // Activate defi button.
      defiBtn = $('[data-defi="' + newDefi + '"].defi');
      src = defiBtn.attr('src').split('.')[0];
      defiBtn.attr('src', src + '-active.png');

      // Show / Hide some typologies
      typologies = extractTypologies(filterList({ defi: currentDefi }));
    }
    for (var typology in miConfig.typologiesMap) {
      var mapBg = $('img[data-typology="' + typology + '"]');
      if (typologies[typology]) {
        mapBg.hide();
      } else {
        mapBg.show();
      }
    }
    // typologies =
  });

  // Set dimensions
  var wW = $(window).width();
  var wH = $(window).height();
  var width, height;
  if (wW / wH < BASE_RATIO) {
    width = wW;
    height = wW / BASE_RATIO ;
  } else {
    width = wH * BASE_RATIO ;
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
      zoom(delta);
    }
  });
  $('#zoomin').click(function() { zoom(24); });
  $('#zoomout').click(function() { zoom(-24); });


});


zoom = function(delta) {
    $('#container').width($('#container').width() + delta * BASE_RATIO);
    $('#container').height($('#container').height() + delta);

    // Automatically scroll down, to use whole available area.
    window.scrollTo(0, $('#zoom').offset().top);
}

onClickOpenListPopin = function(ev) {
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
      var typology = inArea[0].label;
      var filter = { typology: typology };

      if (currentDefi != 'all') {
        filter.defi = currentDefi;
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

openDetailPopin = function(info, position) {
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
