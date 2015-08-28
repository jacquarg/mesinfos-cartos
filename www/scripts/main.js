
var displayJSON = function(data) { console.log(JSON.stringify(data, null, 2));};


var BASE_WIDTH = 800, BASE_HEIGHT = 600;
var infos = [];

// Create popup

// getJSON
$(document).ready(function(){

  $.getJSON(miConfig.infosUri, function(data) {
      console.log(data);
      infos = data;
  });

  $('img').on('dragstart', function(event) { event.preventDefault(); });

  $('img').click(function(ev) {
    var coord = toResizedPolar(ev);
    var inArea = miConfig.areas.filter(function(area) {
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
    console.log(inArea);
    if (inArea.length > 0) {
      openListPopin({ typology: inArea[0].label });
    }
  });

  $('[data-typology]').click(function(ev) {
    console.log(ev);
    openListPopin({
      typology: ev.target.dataset.typology
    });

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

  $("#legend h3").each(function(i, elem) {
    console.log(elem);
    var color = miConfig.typologiesMap[elem.innerHTML].color ;
    var colorStr = 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')' ;

    $(elem).css('color', colorStr);
    $(elem).next('p').css('color', colorStr);

  });
});

toResizedPolar = function(e) {
  console.log(e);
  var x = e.offsetX;
  var y = e.offsetY;
  var sizeRatio = $("#container").width() / BASE_WIDTH ;
  console.log("x: " + x + ", y: " + y);

  // apply ratio
  x = x / sizeRatio ;
  y = y / sizeRatio ;

  var CENTER_X = 406 , CENTER_Y = 300 ;
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

openListPopin = function(filter) {
  var popin, list;
  var template = function(list) {
    var caract = miConfig.typologiesMap[list.title];
    var colors = caract.color.r + ', ' + caract.color.g + ', ' + caract.color.b ;
    var position = "left:" + caract.position.left
      + "%;top:" + caract.position.top + "%;";
    return "<div class='listpopin' style='box-shadow: 0px 0px 6px 10px rgba(" + colors + ", 0.3);" + position + "' >"
    +   "<div class='header' style='background-color: rgb(" + colors + ");' >"
    +     "<img class='icon' src='img/" + caract.headerIcon  + "'>"
    +     "<h2>" + list.title + "</h2>"
    +     "<div class='close'>X</div>"
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
    line.find('span').click(function(ev) {
      console.log(ev);
      var position = {
        left: $(ev.target).parents('.listpopin').offset().left - 290,
        top: ev.pageY
      };
      console.log(position);
      openDetailPopin(info, position);
    });
    line.find('.referentiallink').click(function() {
      openListPopin({
        typology: "Référentiels et Normes",
        referential: info.referential,
      });
    });

    return line;
  };

  list = filterList(filter);
  list = groupByKeyword(list);
  popin = $(template(list));

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

  openPopin(popin);
  // popin.draggable();
  // popin.find('.close').click(function() {
  //   popin.remove();
  // });



  // $("body").append(popin);

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
    return "<div class='detailpopin' style='box-shadow: 0px 0px 6px 10px rgba(" + colors + ", 0.3);" + position + "' >"
    +   "<div class='close'>X</div>"
    +   "<p class='desc'>" + info.desc + "</p>"
    +   "<div class='support'>"
    +     "<div class='header'>"
    +       "<img src='img/icon_support.png' >"
    +       "<h4>OÙ CELA SE TROUVE</h4>"
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

  $("body").append(popin);

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

        if (filter[k] instanceof Array) {
          passFilter = filter[k].some(function(v) {
            return hasValue(info[k], v); });
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
