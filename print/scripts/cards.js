
var displayJSON = function(data) { console.log(JSON.stringify(data, null, 2));};

var infos = [];

$(document).ready(function(){

  $.getJSON(miConfig.infosUri, function(data) {
      infos = data;

    infos.forEach(function(info, index) {

    var template = function(info) {
      var caract = miConfig.typologiesMap[info.typology];
      var colors = caract.color.r + ', ' + caract.color.g + ', ' + caract.color.b ;

      if (info.supportExample) {
        info.supportExampleWLinks = info.supportExample.replace(/https?:\/\/([^\/]*)[^\s]*/g, "<a target='_blank' href='$&'>$1</a>");
      } else {
        info.supportExampleWLinks = '';
      }

      return "<div class='detailpopin' data-title='" + info.desc
      // + "' style='"
      // + "left:" + 300 * (index % 3) + "px; top:" + 500 * Math.floor(index / 3)
      // + "px;"
      + "' >"
      +   "<div class='typology'  style='color: rgb(" + colors + ");'>"
      +    "<p>" + info.typology + "</p>"
      +   "</div>"
      +   "<div class='title'>"
      +   "<span>"
      +   info.desc
      +   "</span>"
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

      $('body').append($(template(info)));

    });

      $('.title').textfill({
        maxFontPixels: 17,
        minFontPixels: 12,
        changeLineHeight: true,
      });

  });
});
