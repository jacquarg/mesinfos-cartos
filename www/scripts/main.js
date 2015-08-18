
var displayJSON = function(data) { console.log(JSON.stringify(data, null, 2));};


var infos = [];

// Create popup

// getJSON
$(document).ready(function(){

  $.getJSON(miConfig.infosUri, function(data) {
      console.log(data);
      infos = data;
  });

  $('img').on('dragstart', function(event) { event.preventDefault(); });

  $('[data-typology]').click(function(ev) {
    console.log(ev);
    openListPopin({
      typology: ev.target.dataset.typology
    });

  });

  $('#showPopup').click(function() {
    openListPopin({
        typology: 'Données personnelles médicales',
        //domain: 'Médico-financier',
    });
  });

  // $('#showPopup').click(function() {
  //   var lst = filterList({
  //       typology: 'Données personnelles médicales',
  //       domain: 'Médico-financier',
  //   });

  //   var popin = $("<div class='draggable'></div>");

  //   popin.html(lst.map(function(info) {
  //       return '<li>' + info.desc + '</li>';
  //   }).join('\n'));

  //   popin.draggable();

  //   $("body").append(popin);

  // });
});

openListPopin = function(filter) {
  var popin, list;
  var template = function(list) {
    var caract = miConfig.typologiesMap[list.title];
    var colors = caract.color.r + ', ' + caract.color.g + ', ' + caract.color.b ;
    return "<div class='listpopin' style='border-color: rgba(" + colors + ", 0.2);' >"
    +   "<div class='header' style='background-color: rgb(" + colors + ");' >"
    +     "<img class='icon' src='img/" + caract.headerIcon  + "'>"
    +     "<h2>" + list.title + "</h2>"
    +     "<div class='close'>X</div>"
    +   "</div>"
    +   "<ul class='list' style='border-color: rgb(" + colors + ");'></ul>"
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
    line.click(function() {
      openDetailPopin(info);
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
  popin = $(template(list));

  list.infos.forEach(function(info) {
    popin.find('.list').append(lineTemplate(info));
  })
  // popin.find('.list').html(list.map(lineTemplate).join('\n'));

  openPopin(popin);
  // popin.draggable();
  // popin.find('.close').click(function() {
  //   popin.remove();
  // });



  // $("body").append(popin);

};

openDetailPopin = function(info) {

  var template = function(info) {
    return "<div class='detailpopin'>"
    +   "<div class='close'></div>"
    +    "<div>" + info.desc + "</div>";
    +    "<div>" + info.support + "</div>";
    +    "<div>" + info.access + "</div>";
    +    "<div>" + info.accessEasyness + "</div>";
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
