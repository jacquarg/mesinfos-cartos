function pug_attr(t,e,n,r){if(e===!1||null==e||!e&&("class"===t||"style"===t))return"";if(e===!0)return" "+(r?t:t+'="'+t+'"');if("function"==typeof e.toISOString)e=e.toISOString();else if("string"!=typeof e&&(e=JSON.stringify(e),!n&&-1!==e.indexOf('"')))return" "+t+"='"+e.replace(/'/g,"&#39;")+"'";return n&&(e=pug_escape(e))," "+t+'="'+e+'"'}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}function templatedetaildoctype(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"doctype.pug":"mixin row(d)\n  tr\n    td.nom= d.Nom\n    td.description= d.Description\n    td.exemple= d.Exemple \n    td.format= d.Format\n\nh3= DocType\n.providers\n  each   v, k in providers\n    - console.log(k)\n    img(src=\"img\u002Ftypologies\u002Flogo_\" + k.toLowerCase() + \".png\", title=k)\n\np= Description\np= Documentation\n\ntable\n  thead\n    tr\n      th Donnée\n      th Description\n      th Exemple\n      th Format\n  tbody\n    each d in data\n      if (d)\n        +row(d)\n"};
;var locals_for_with = (locals || {});(function (Description, DocType, Documentation, console, data, providers) {;pug_debug_line = 1;pug_debug_filename = "doctype.pug";
pug_mixins["row"] = pug_interp = function(d){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 3;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ctd class=\"nom\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "doctype.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = d.Nom) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 4;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ctd class=\"description\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "doctype.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = d.Description) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 5;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ctd class=\"exemple\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "doctype.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = d.Exemple) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 6;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ctd class=\"format\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "doctype.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = d.Format) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
};
;pug_debug_line = 8;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 8;pug_debug_filename = "doctype.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = DocType) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
;pug_debug_line = 9;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cdiv class=\"providers\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "doctype.pug";
// iterate providers
var pug_obj0 = providers;
if ('number' == typeof pug_obj0.length) {

  for (var k = 0, pug_length0 = pug_obj0.length; k < pug_length0; k++) {
    var v = pug_obj0[k];

;pug_debug_line = 11;pug_debug_filename = "doctype.pug";
console.log(k)
;pug_debug_line = 12;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cimg" + (pug_attr("src", "img/typologies/logo_" + k.toLowerCase() + ".png", true, false)+pug_attr("title", k, true, false)) + "\u002F\u003E";
  }

} else {
  var pug_length0 = 0;
  for (var k in pug_obj0) {
    pug_length0++;
    var v = pug_obj0[k];

;pug_debug_line = 11;pug_debug_filename = "doctype.pug";
console.log(k)
;pug_debug_line = 12;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cimg" + (pug_attr("src", "img/typologies/logo_" + k.toLowerCase() + ".png", true, false)+pug_attr("title", k, true, false)) + "\u002F\u003E";
  }

}

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 14;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 14;pug_debug_filename = "doctype.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = Description) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 15;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 15;pug_debug_filename = "doctype.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = Documentation) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 17;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ctable\u003E";
;pug_debug_line = 18;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cthead\u003E";
;pug_debug_line = 19;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 20;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 20;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "Donnée\u003C\u002Fth\u003E";
;pug_debug_line = 21;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 21;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "Description\u003C\u002Fth\u003E";
;pug_debug_line = 22;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 22;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "Exemple\u003C\u002Fth\u003E";
;pug_debug_line = 23;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 23;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "Format\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003C\u002Fthead\u003E";
;pug_debug_line = 24;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ctbody\u003E";
;pug_debug_line = 25;pug_debug_filename = "doctype.pug";
// iterate data
var pug_obj1 = data;
if ('number' == typeof pug_obj1.length) {

  for (var pug_index1 = 0, pug_length1 = pug_obj1.length; pug_index1 < pug_length1; pug_index1++) {
    var d = pug_obj1[pug_index1];

;pug_debug_line = 26;pug_debug_filename = "doctype.pug";
if ((d)) {
;pug_debug_line = 27;pug_debug_filename = "doctype.pug";
pug_mixins["row"](d);
}
  }

} else {
  var pug_length1 = 0;
  for (var pug_index1 in pug_obj1) {
    pug_length1++;
    var d = pug_obj1[pug_index1];

;pug_debug_line = 26;pug_debug_filename = "doctype.pug";
if ((d)) {
;pug_debug_line = 27;pug_debug_filename = "doctype.pug";
pug_mixins["row"](d);
}
  }

}

pug_html = pug_html + "\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";}.call(this,"Description" in locals_for_with?locals_for_with.Description:typeof Description!=="undefined"?Description:undefined,"DocType" in locals_for_with?locals_for_with.DocType:typeof DocType!=="undefined"?DocType:undefined,"Documentation" in locals_for_with?locals_for_with.Documentation:typeof Documentation!=="undefined"?Documentation:undefined,"console" in locals_for_with?locals_for_with.console:typeof console!=="undefined"?console:undefined,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined,"providers" in locals_for_with?locals_for_with.providers:typeof providers!=="undefined"?providers:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}