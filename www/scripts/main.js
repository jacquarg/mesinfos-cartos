
var displayJSON = function(data) { console.log(JSON.stringify(data, null, 2));};


var infos = [];

// Create popup

// getJSON
$(document).ready(function(){

  $.getJSON(miConfig.infosUri, function(data) {
      console.log(data);
      infos = data;
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
    return "<div class='draggable'>"
    +   "<div class='close'></div>"
    +   "<div class='list'></div>"
    + "</div>";
  };

  var lineTemplate = function(info) {
    var html = "<li>"
    +   "<span>"
    +     info.desc
    +   "</span>";

    if (info.referential) {
      html += "<span class='referential'>Referential</span>";
    }

    html += "</li>";

    var line = $(html);
    line.click(function() {
      openDetailPopin(info);
    });
    line.find('.referential').click(function() {
      openListPopin({
        typology: "Référentiels et Normes",
        referential: info.referential,
      });
    });

    return line;
  };

  list = filterList(filter);
  popin = $(template());

  list.forEach(function(info) {
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
    return "<div class='draggable'>"
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

  var hasValue = function(value, filterValue) {
    if (value && value instanceof Array) {
      return value.some(function(v) { return v === filterValue ;});
    } else {
      return value === filterValue;
    }
  };
    return infos.filter(function(info) {
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
};
