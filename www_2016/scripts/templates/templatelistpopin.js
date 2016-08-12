function templatelistpopin(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (byStatus, longLabel, position, title) {
jade_mixins["usecaselist"] = jade_interp = function(list){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<ul>");
// iterate list
;(function(){
  var $$obj = list;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<li" + (jade.attr("data-title", item.Title, true, false)) + ">");
if ( item.linkOnly)
{
buf.push("<a" + (jade.attr("href", item.Website, true, false)) + " target=\"_blank\">" + (jade.escape(null == (jade_interp = item.Title) ? "" : jade_interp)) + "</a>");
}
else
{
buf.push("<span>" + (jade.escape(null == (jade_interp = item.Title) ? "" : jade_interp)) + "</span>");
}
buf.push("</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<li" + (jade.attr("data-title", item.Title, true, false)) + ">");
if ( item.linkOnly)
{
buf.push("<a" + (jade.attr("href", item.Website, true, false)) + " target=\"_blank\">" + (jade.escape(null == (jade_interp = item.Title) ? "" : jade_interp)) + "</a>");
}
else
{
buf.push("<span>" + (jade.escape(null == (jade_interp = item.Title) ? "" : jade_interp)) + "</span>");
}
buf.push("</li>");
    }

  }
}).call(this);

buf.push("</ul>");
};
buf.push("<div" + (jade.attr("data-title", title, true, false)) + (jade.attr("style", "left:" + position.left + "; top:" + position.top, true, false)) + " ;=\";\"" + (jade.cls(['listpopin',position.orientation], [null,true])) + "><div class=\"close\">×</div><div" + (jade.attr("title", longLabel, true, false)) + " class=\"header\"><img" + (jade.attr("src", "img/usecases/" + title + ".jpg", true, false)) + "/></div><div class=\"list\">");
if ( (byStatus.operational))
{
buf.push("<h4>Currently operational</h4>");
jade_mixins["usecaselist"](byStatus.operational);
}
if ( (byStatus.under_development))
{
buf.push("<h4>Under development</h4>");
jade_mixins["usecaselist"](byStatus.under_development);
}
if ( (byStatus.idea))
{
buf.push("<h4>Just an idea or a scenario</h4>");
jade_mixins["usecaselist"](byStatus.idea);
}
buf.push("</div></div>");}.call(this,"byStatus" in locals_for_with?locals_for_with.byStatus:typeof byStatus!=="undefined"?byStatus:undefined,"longLabel" in locals_for_with?locals_for_with.longLabel:typeof longLabel!=="undefined"?longLabel:undefined,"position" in locals_for_with?locals_for_with.position:typeof position!=="undefined"?position:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));;return buf.join("");
}