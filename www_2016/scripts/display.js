
var displayJSON = function(data) { console.log(JSON.stringify(data, null, 2));};


// var BASE_WIDTH = 800, BASE_HEIGHT = 600;
var BASE_WIDTH = window.miConfig.base.width,
  BASE_HEIGHT = window.miConfig.base.height,
  CENTER_X = window.miConfig.base.centerX,
  CENTER_Y = window.miConfig.base.centerY ;

var BASE_RATIO = BASE_WIDTH / BASE_HEIGHT;

var POSITIONS = miConfig.areas.reduce(function(agg, area) {
  agg[area.label] = area.position;
  return agg;
}, {});

var infos = [];
var defis = {};
var currentDefi = 'all';
var popin = null;
var detailPopin = null;

// Create popup

$(document).ready(function(){
    getJSON();
    setDimensions();
});

getJSON = function() {
// getJSON
  $.getJSON(miConfig.infosUri, function(data) {
      infos = data;
  });
};

setDimensions = function() {
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
};


onClickOpenListPopin = function(ev) {
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
      var filter = { typology: typology };
      openListPopin(filter);
    }
};


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

////////////// Handle polars /////////////////////////
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
////////////// /////////////////////////


openListPopin = function(filter) {
  if (popin) {
    popin.remove();
    popin = null;
  }
  var list = prepareListForPopin(filter);
  console.log(list);
  popin = $(templatelistpopin(list));

  popin.find('.close').click(function(ev) {
    ev.stopPropagation();
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

prepareListForPopin = function(filter) {
  console.log("here1");
  var list;
  list = filterList(filter);
  list.position = POSITIONS[list.title];
  console.log("here2");

  return list;
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


////////////// Data filtering and manipulations ///////////////

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


  // Helper : pass a test on the value (which may be an array of values)
  var valueSome = function(value, test) {
    if (value && value instanceof Array) {
      return value.some(test);
    } else {
      return test(value);
    }
  };
  var hasValue = function(value, filterValue) {
    return valueSome(value, function(v) { return v === filterValue ; });
  };

  if ('typology' in filter) {
    list.title = filter.typology;
  }
  list.infos = infos.filter(function(info) {
      var keep = true;
      var passFilter = false;
      for (k in filter) {
        if (k === 'all') { // key word search, filter[k] is a String.
          passFilter = Object.keys(info).some(function(key) {
            return valueSome(info[key], function(v) {
              if (typeof v !== "string") { return false; }
              return v.toLowerCase().indexOf(filter[k]) !== -1 ; });
          });
        } else if (k === 'defi') {
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

// Split list by values of given key, in by[Key] field.
groupByKey = function(list, key) {
  var byKey = 'by' + key[0].toUpperCase() + key.slice(1);
  list[byKey] = {};

  list.infos.forEach(function(info) {

    var v = info[key];
    if (!v) { return; }

    if (!list[byKey][v]) {
      list[byKey][v] = [];
    }
    list[byKey][v].push(info);
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
