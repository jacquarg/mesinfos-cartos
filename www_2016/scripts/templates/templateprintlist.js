function templateprintlist(locals) {
var jade_debug = [ new jade.DebugItem( 1, "templateprintlist.jade" ) ];
try {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (byStatus, longLabel, title) {
jade_debug.unshift(new jade.DebugItem( 0, "templateprintlist.jade" ));
jade_debug.unshift(new jade.DebugItem( 1, "templateprintlist.jade" ));
jade_mixins["usecaselist"] = jade_interp = function(list){
var block = (this && this.block), attributes = (this && this.attributes) || {};
jade_debug.unshift(new jade.DebugItem( 2, "templateprintlist.jade" ));
jade_debug.unshift(new jade.DebugItem( 2, "templateprintlist.jade" ));
buf.push("<ul>");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 3, "templateprintlist.jade" ));
// iterate list
;(function(){
  var $$obj = list;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

jade_debug.unshift(new jade.DebugItem( 3, "templateprintlist.jade" ));
jade_debug.unshift(new jade.DebugItem( 4, "templateprintlist.jade" ));
buf.push("<li" + (jade.attr("data-title", item.Title, true, false)) + ">");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 5, "templateprintlist.jade" ));
if ( item.linkOnly)
{
jade_debug.unshift(new jade.DebugItem( 6, "templateprintlist.jade" ));
jade_debug.unshift(new jade.DebugItem( 6, "templateprintlist.jade" ));
buf.push("<a" + (jade.attr("href", item.Website, true, false)) + " target=\"_blank\">" + (jade.escape(null == (jade_interp = item.Title) ? "" : jade_interp)));
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.shift();
buf.push("</a>");
jade_debug.shift();
jade_debug.shift();
}
else
{
jade_debug.unshift(new jade.DebugItem( 8, "templateprintlist.jade" ));
jade_debug.unshift(new jade.DebugItem( 8, "templateprintlist.jade" ));
buf.push("<span>" + (jade.escape(null == (jade_interp = item.Title) ? "" : jade_interp)));
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.shift();
buf.push("</span>");
jade_debug.shift();
jade_debug.shift();
}
jade_debug.shift();
jade_debug.shift();
buf.push("</li>");
jade_debug.shift();
jade_debug.shift();
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

jade_debug.unshift(new jade.DebugItem( 3, "templateprintlist.jade" ));
jade_debug.unshift(new jade.DebugItem( 4, "templateprintlist.jade" ));
buf.push("<li" + (jade.attr("data-title", item.Title, true, false)) + ">");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 5, "templateprintlist.jade" ));
if ( item.linkOnly)
{
jade_debug.unshift(new jade.DebugItem( 6, "templateprintlist.jade" ));
jade_debug.unshift(new jade.DebugItem( 6, "templateprintlist.jade" ));
buf.push("<a" + (jade.attr("href", item.Website, true, false)) + " target=\"_blank\">" + (jade.escape(null == (jade_interp = item.Title) ? "" : jade_interp)));
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.shift();
buf.push("</a>");
jade_debug.shift();
jade_debug.shift();
}
else
{
jade_debug.unshift(new jade.DebugItem( 8, "templateprintlist.jade" ));
jade_debug.unshift(new jade.DebugItem( 8, "templateprintlist.jade" ));
buf.push("<span>" + (jade.escape(null == (jade_interp = item.Title) ? "" : jade_interp)));
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.shift();
buf.push("</span>");
jade_debug.shift();
jade_debug.shift();
}
jade_debug.shift();
jade_debug.shift();
buf.push("</li>");
jade_debug.shift();
jade_debug.shift();
    }

  }
}).call(this);

jade_debug.shift();
jade_debug.shift();
buf.push("</ul>");
jade_debug.shift();
jade_debug.shift();
};
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 10, "templateprintlist.jade" ));
buf.push("<div class=\"usecaselist\">");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 11, "templateprintlist.jade" ));
buf.push("<h2>" + (jade.escape(null == (jade_interp = longLabel) ? "" : jade_interp)));
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.shift();
buf.push("</h2>");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 12, "templateprintlist.jade" ));
buf.push("<img" + (jade.attr("src", "img/usecases/" + title + ".jpg", true, false)) + " class=\"usecasetitle\"/>");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 14, "templateprintlist.jade" ));
buf.push("<div class=\"list\">");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 15, "templateprintlist.jade" ));
if ( (byStatus.operational))
{
jade_debug.unshift(new jade.DebugItem( 16, "templateprintlist.jade" ));
jade_debug.unshift(new jade.DebugItem( 16, "templateprintlist.jade" ));
buf.push("<h4>");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 16, jade_debug[0].filename ));
buf.push("Currently operational");
jade_debug.shift();
jade_debug.shift();
buf.push("</h4>");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 17, "templateprintlist.jade" ));
jade_mixins["usecaselist"](byStatus.operational);
jade_debug.shift();
jade_debug.shift();
}
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 19, "templateprintlist.jade" ));
if ( (byStatus.under_development))
{
jade_debug.unshift(new jade.DebugItem( 20, "templateprintlist.jade" ));
jade_debug.unshift(new jade.DebugItem( 20, "templateprintlist.jade" ));
buf.push("<h4>");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 20, jade_debug[0].filename ));
buf.push("Under development");
jade_debug.shift();
jade_debug.shift();
buf.push("</h4>");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 21, "templateprintlist.jade" ));
jade_mixins["usecaselist"](byStatus.under_development);
jade_debug.shift();
jade_debug.shift();
}
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 23, "templateprintlist.jade" ));
if ( (byStatus.idea))
{
jade_debug.unshift(new jade.DebugItem( 24, "templateprintlist.jade" ));
jade_debug.unshift(new jade.DebugItem( 24, "templateprintlist.jade" ));
buf.push("<h4>");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 24, jade_debug[0].filename ));
buf.push("Just an idea or a scenario");
jade_debug.shift();
jade_debug.shift();
buf.push("</h4>");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 25, "templateprintlist.jade" ));
jade_mixins["usecaselist"](byStatus.idea);
jade_debug.shift();
jade_debug.shift();
}
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();}.call(this,"byStatus" in locals_for_with?locals_for_with.byStatus:typeof byStatus!=="undefined"?byStatus:undefined,"longLabel" in locals_for_with?locals_for_with.longLabel:typeof longLabel!=="undefined"?longLabel:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));;return buf.join("");
} catch (err) {
  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "mixin usecaselist(list) \n  ul\n    each item in list\n      li(data-title=item.Title)\n        if item.linkOnly\n          a(href=item.Website, target=\"_blank\")= item.Title\n        else\n          span= item.Title\n\n.usecaselist\n  h2= longLabel\n  img.usecasetitle(src=\"img/usecases/\" + title + \".jpg\")\n\n  .list\n    if (byStatus.operational)\n      h4 Currently operational\n      +usecaselist(byStatus.operational)\n\n    if (byStatus.under_development)\n      h4 Under development\n      +usecaselist(byStatus.under_development)\n\n    if (byStatus.idea)\n      h4 Just an idea or a scenario\n      +usecaselist(byStatus.idea)\n");
}
}