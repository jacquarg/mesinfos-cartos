function pug_attr(t,e,n,r){if(e===!1||null==e||!e&&("class"===t||"style"===t))return"";if(e===!0)return" "+(r?t:t+'="'+t+'"');if("function"==typeof e.toISOString)e=e.toISOString();else if("string"!=typeof e&&(e=JSON.stringify(e),!n&&-1!==e.indexOf('"')))return" "+t+"='"+e.replace(/'/g,"&#39;")+"'";return n&&(e=pug_escape(e))," "+t+'="'+e+'"'}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)s=pug_classes(r[g]),s&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}function templatedetaildoctype(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"doctype.pug":"mixin row(d, cls)\n  tr(class=cls)\n    td.nom= d.Nom\n    td.description= d.Description\n    td.exemple= d.Exemple\nli\n  .toggle \n    h4(id=Nom)= Nom\n    a.detenteur(href='#?Détenteur=' + Détenteur.toLowerCase(), title='Toutes les données de ' + Détenteur)\n      img(src=\"img\u002Ftypologies\u002Flogo_\" + Détenteur.toLowerCase() + \".png\", title=Détenteur)\n\n  .details(style='display: none;')\n    .subset\n      p= Description\n      \n      ul.caracteristiques\n        li\n          b Fréquence :&nbsp;\n          = Fréquence\n        li\n          b Latence :&nbsp;\n          = Latence\n    .doctype\n      h5 DocType :&nbsp;\n        a(href='?DocType=' + DocType, title='Toutes les données du type ' + DocType)= DocType\n\n      p= docType.Description\n\n      .similaires\n        h6 Du même type :\n        ul\n          each s in docType.subsets\n            li\n              a(href='?DocType=' + DocType + '#' + s.Nom)= s.Nom\n \n    table.data\n      thead\n        tr\n          th Donnée\n          th Description\n          th Exemple\n      tbody.compact\n        each d in data\n          if (d)\n            +row(d)\n        tr.showmetadata \n          td Metadata\n          td ◢\n          td &nbsp;\n\n        each d in metadata\n          if (d)\n            +row(d, 'metadata')\n"};
;var locals_for_with = (locals || {});(function (Description, DocType, Détenteur, Fréquence, Latence, Nom, data, docType, metadata) {;pug_debug_line = 1;pug_debug_filename = "doctype.pug";
pug_mixins["row"] = pug_interp = function(d, cls){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ctr" + (pug_attr("class", pug_classes([cls], [true]), false, false)) + "\u003E";
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
pug_html = pug_html + (pug_escape(null == (pug_interp = d.Exemple) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
};
;pug_debug_line = 6;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 7;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cdiv class=\"toggle\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "doctype.pug";
pug_html = pug_html + " ";
;pug_debug_line = 8;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ch4" + (pug_attr("id", Nom, true, false)) + "\u003E";
;pug_debug_line = 8;pug_debug_filename = "doctype.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = Nom) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E";
;pug_debug_line = 9;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ca" + (" class=\"detenteur\""+pug_attr("href", '#?Détenteur=' + Détenteur.toLowerCase(), true, false)+pug_attr("title", 'Toutes les données de ' + Détenteur, true, false)) + "\u003E";
;pug_debug_line = 10;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cimg" + (pug_attr("src", "img/typologies/logo_" + Détenteur.toLowerCase() + ".png", true, false)+pug_attr("title", Détenteur, true, false)) + "\u002F\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cdiv class=\"details\" style=\"display: none\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cdiv class=\"subset\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 14;pug_debug_filename = "doctype.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = Description) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 16;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cul class=\"caracteristiques\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 18;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cb\u003E";
;pug_debug_line = 18;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "Fréquence :&nbsp;\u003C\u002Fb\u003E";
;pug_debug_line = 19;pug_debug_filename = "doctype.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = Fréquence) ? "" : pug_interp)) + "\u003C\u002Fli\u003E";
;pug_debug_line = 20;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 21;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cb\u003E";
;pug_debug_line = 21;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "Latence :&nbsp;\u003C\u002Fb\u003E";
;pug_debug_line = 22;pug_debug_filename = "doctype.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = Latence) ? "" : pug_interp)) + "\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 23;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cdiv class=\"doctype\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ch5\u003E";
;pug_debug_line = 24;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "DocType :&nbsp;";
;pug_debug_line = 25;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", '?DocType=' + DocType, true, false)+pug_attr("title", 'Toutes les données du type ' + DocType, true, false)) + "\u003E";
;pug_debug_line = 25;pug_debug_filename = "doctype.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = DocType) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fh5\u003E";
;pug_debug_line = 27;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 27;pug_debug_filename = "doctype.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = docType.Description) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 29;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cdiv class=\"similaires\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ch6\u003E";
;pug_debug_line = 30;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "Du même type :\u003C\u002Fh6\u003E";
;pug_debug_line = 31;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 32;pug_debug_filename = "doctype.pug";
// iterate docType.subsets
var pug_obj0 = docType.subsets;
if ('number' == typeof pug_obj0.length) {

  for (var pug_index0 = 0, pug_length0 = pug_obj0.length; pug_index0 < pug_length0; pug_index0++) {
    var s = pug_obj0[pug_index0];

;pug_debug_line = 33;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 34;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", '?DocType=' + DocType + '#' + s.Nom, true, false)) + "\u003E";
;pug_debug_line = 34;pug_debug_filename = "doctype.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = s.Nom) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
  }

} else {
  var pug_length0 = 0;
  for (var pug_index0 in pug_obj0) {
    pug_length0++;
    var s = pug_obj0[pug_index0];

;pug_debug_line = 33;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 34;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", '?DocType=' + DocType + '#' + s.Nom, true, false)) + "\u003E";
;pug_debug_line = 34;pug_debug_filename = "doctype.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = s.Nom) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
  }

}

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ctable class=\"data\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cthead\u003E";
;pug_debug_line = 38;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 39;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 39;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "Donnée\u003C\u002Fth\u003E";
;pug_debug_line = 40;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 40;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "Description\u003C\u002Fth\u003E";
;pug_debug_line = 41;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 41;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "Exemple\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003C\u002Fthead\u003E";
;pug_debug_line = 42;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ctbody class=\"compact\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "doctype.pug";
// iterate data
var pug_obj1 = data;
if ('number' == typeof pug_obj1.length) {

  for (var pug_index1 = 0, pug_length1 = pug_obj1.length; pug_index1 < pug_length1; pug_index1++) {
    var d = pug_obj1[pug_index1];

;pug_debug_line = 44;pug_debug_filename = "doctype.pug";
if ((d)) {
;pug_debug_line = 45;pug_debug_filename = "doctype.pug";
pug_mixins["row"](d);
}
  }

} else {
  var pug_length1 = 0;
  for (var pug_index1 in pug_obj1) {
    pug_length1++;
    var d = pug_obj1[pug_index1];

;pug_debug_line = 44;pug_debug_filename = "doctype.pug";
if ((d)) {
;pug_debug_line = 45;pug_debug_filename = "doctype.pug";
pug_mixins["row"](d);
}
  }

}

;pug_debug_line = 46;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ctr class=\"showmetadata\"\u003E";
;pug_debug_line = 46;pug_debug_filename = "doctype.pug";
pug_html = pug_html + " ";
;pug_debug_line = 47;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 47;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "Metadata\u003C\u002Ftd\u003E";
;pug_debug_line = 48;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 48;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "◢\u003C\u002Ftd\u003E";
;pug_debug_line = 49;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 49;pug_debug_filename = "doctype.pug";
pug_html = pug_html + "&nbsp;\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 51;pug_debug_filename = "doctype.pug";
// iterate metadata
var pug_obj2 = metadata;
if ('number' == typeof pug_obj2.length) {

  for (var pug_index2 = 0, pug_length2 = pug_obj2.length; pug_index2 < pug_length2; pug_index2++) {
    var d = pug_obj2[pug_index2];

;pug_debug_line = 52;pug_debug_filename = "doctype.pug";
if ((d)) {
;pug_debug_line = 53;pug_debug_filename = "doctype.pug";
pug_mixins["row"](d, 'metadata');
}
  }

} else {
  var pug_length2 = 0;
  for (var pug_index2 in pug_obj2) {
    pug_length2++;
    var d = pug_obj2[pug_index2];

;pug_debug_line = 52;pug_debug_filename = "doctype.pug";
if ((d)) {
;pug_debug_line = 53;pug_debug_filename = "doctype.pug";
pug_mixins["row"](d, 'metadata');
}
  }

}

pug_html = pug_html + "\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";}.call(this,"Description" in locals_for_with?locals_for_with.Description:typeof Description!=="undefined"?Description:undefined,"DocType" in locals_for_with?locals_for_with.DocType:typeof DocType!=="undefined"?DocType:undefined,"Détenteur" in locals_for_with?locals_for_with.Détenteur:typeof Détenteur!=="undefined"?Détenteur:undefined,"Fréquence" in locals_for_with?locals_for_with.Fréquence:typeof Fréquence!=="undefined"?Fréquence:undefined,"Latence" in locals_for_with?locals_for_with.Latence:typeof Latence!=="undefined"?Latence:undefined,"Nom" in locals_for_with?locals_for_with.Nom:typeof Nom!=="undefined"?Nom:undefined,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined,"docType" in locals_for_with?locals_for_with.docType:typeof docType!=="undefined"?docType:undefined,"metadata" in locals_for_with?locals_for_with.metadata:typeof metadata!=="undefined"?metadata:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}