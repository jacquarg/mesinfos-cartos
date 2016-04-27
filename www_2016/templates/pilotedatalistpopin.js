function pug_attr(t,e,n,r){if(e===!1||null==e||!e&&("class"===t||"style"===t))return"";if(e===!0)return" "+(r?t:t+'="'+t+'"');if("function"==typeof e.toISOString)e=e.toISOString();else if("string"!=typeof e&&(e=JSON.stringify(e),!n&&-1!==e.indexOf('"')))return" "+t+"='"+e.replace(/'/g,"&#39;")+"'";return n&&(e=pug_escape(e))," "+t+'="'+e+'"'}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}
function pug_style(r){if(!r)return"";if("object"==typeof r){var e="",t="";for(var n in r)pug_has_own_property.call(r,n)&&(e=e+t+n+":"+r[n],t=";");return e}return r=""+r,";"===r[r.length-1]?r.slice(0,-1):r}function templatelistpopin(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"pilotedatalistpopin.pug":".listpopin(data-title=title, style=\"border: solid 2px rgb(\" + color.r + \", \" + color.g + \", \" + color.b + \"); left:\" + position.left + \";top:\" + position.top + \";\")\n  .header(style=\"background-color: rgb(\" + color.r + \", \" + color.g + \", \" + color.b + \");\")\n    img.icon(src=headerIconPath)\n    h3= title\n    .close ×\n  .list\n    ul\n      each data in infos\n        li\n          span= data.title\n\n"};
;var locals_for_with = (locals || {});(function (color, headerIconPath, infos, position, title) {;pug_debug_line = 1;pug_debug_filename = "pilotedatalistpopin.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"listpopin\""+pug_attr("data-title", title, true, false)+pug_attr("style", pug_style("border: solid 2px rgb(" + color.r + ", " + color.g + ", " + color.b + "); left:" + position.left + ";top:" + position.top + ";"), true, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = "pilotedatalistpopin.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"header\""+pug_attr("style", pug_style("background-color: rgb(" + color.r + ", " + color.g + ", " + color.b + ");"), true, false)) + "\u003E";
;pug_debug_line = 3;pug_debug_filename = "pilotedatalistpopin.pug";
pug_html = pug_html + "\u003Cimg" + (" class=\"icon\""+pug_attr("src", headerIconPath, true, false)) + "\u002F\u003E";
;pug_debug_line = 4;pug_debug_filename = "pilotedatalistpopin.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 4;pug_debug_filename = "pilotedatalistpopin.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
;pug_debug_line = 5;pug_debug_filename = "pilotedatalistpopin.pug";
pug_html = pug_html + "\u003Cdiv class=\"close\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pilotedatalistpopin.pug";
pug_html = pug_html + "×\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 6;pug_debug_filename = "pilotedatalistpopin.pug";
pug_html = pug_html + "\u003Cdiv class=\"list\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "pilotedatalistpopin.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 8;pug_debug_filename = "pilotedatalistpopin.pug";
// iterate infos
var pug_obj0 = infos;
if ('number' == typeof pug_obj0.length) {

  for (var pug_index0 = 0, pug_length0 = pug_obj0.length; pug_index0 < pug_length0; pug_index0++) {
    var data = pug_obj0[pug_index0];

;pug_debug_line = 9;pug_debug_filename = "pilotedatalistpopin.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 10;pug_debug_filename = "pilotedatalistpopin.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 10;pug_debug_filename = "pilotedatalistpopin.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = data.title) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fli\u003E";
  }

} else {
  var pug_length0 = 0;
  for (var pug_index0 in pug_obj0) {
    pug_length0++;
    var data = pug_obj0[pug_index0];

;pug_debug_line = 9;pug_debug_filename = "pilotedatalistpopin.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 10;pug_debug_filename = "pilotedatalistpopin.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 10;pug_debug_filename = "pilotedatalistpopin.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = data.title) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fli\u003E";
  }

}

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"color" in locals_for_with?locals_for_with.color:typeof color!=="undefined"?color:undefined,"headerIconPath" in locals_for_with?locals_for_with.headerIconPath:typeof headerIconPath!=="undefined"?headerIconPath:undefined,"infos" in locals_for_with?locals_for_with.infos:typeof infos!=="undefined"?infos:undefined,"position" in locals_for_with?locals_for_with.position:typeof position!=="undefined"?position:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}