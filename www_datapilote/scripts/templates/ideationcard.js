function pug_attr(t,e,n,r){if(e===!1||null==e||!e&&("class"===t||"style"===t))return"";if(e===!0)return" "+(r?t:t+'="'+t+'"');if("function"==typeof e.toISOString)e=e.toISOString();else if("string"!=typeof e&&(e=JSON.stringify(e),!n&&-1!==e.indexOf('"')))return" "+t+"='"+e.replace(/'/g,"&#39;")+"'";return n&&(e=pug_escape(e))," "+t+'="'+e+'"'}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}
function pug_style(r){if(!r)return"";if("object"==typeof r){var e="",t="";for(var n in r)pug_has_own_property.call(r,n)&&(e=e+t+n+":"+r[n],t=";");return e}return r=""+r,";"===r[r.length-1]?r.slice(0,-1):r}function templateideationcard(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"ideationcard.pug":".ideationcard\n  .typology(style=\"background-color: rgb(\" + typologyColor.r + \",\" + typologyColor.g + \",\" + typologyColor.b + \");\")= Typologie\n  .name= Nom\n  img.holder(src=\"img\u002Ftypologies\u002Flogo_\" + Détenteur.toLowerCase() + \".png\", title=Détenteur)\n  .description= Description\n  .frequency= Fréquence\n"};
;var locals_for_with = (locals || {});(function (Description, Détenteur, Fréquence, Nom, Typologie, typologyColor) {;pug_debug_line = 1;pug_debug_filename = "ideationcard.pug";
pug_html = pug_html + "\u003Cdiv class=\"ideationcard\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "ideationcard.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"typology\""+pug_attr("style", pug_style("background-color: rgb(" + typologyColor.r + "," + typologyColor.g + "," + typologyColor.b + ");"), true, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = "ideationcard.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = Typologie) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 3;pug_debug_filename = "ideationcard.pug";
pug_html = pug_html + "\u003Cdiv class=\"name\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "ideationcard.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = Nom) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 4;pug_debug_filename = "ideationcard.pug";
pug_html = pug_html + "\u003Cimg" + (" class=\"holder\""+pug_attr("src", "img/typologies/logo_" + Détenteur.toLowerCase() + ".png", true, false)+pug_attr("title", Détenteur, true, false)) + "\u002F\u003E";
;pug_debug_line = 5;pug_debug_filename = "ideationcard.pug";
pug_html = pug_html + "\u003Cdiv class=\"description\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "ideationcard.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = Description) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 6;pug_debug_filename = "ideationcard.pug";
pug_html = pug_html + "\u003Cdiv class=\"frequency\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "ideationcard.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = Fréquence) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"Description" in locals_for_with?locals_for_with.Description:typeof Description!=="undefined"?Description:undefined,"Détenteur" in locals_for_with?locals_for_with.Détenteur:typeof Détenteur!=="undefined"?Détenteur:undefined,"Fréquence" in locals_for_with?locals_for_with.Fréquence:typeof Fréquence!=="undefined"?Fréquence:undefined,"Nom" in locals_for_with?locals_for_with.Nom:typeof Nom!=="undefined"?Nom:undefined,"Typologie" in locals_for_with?locals_for_with.Typologie:typeof Typologie!=="undefined"?Typologie:undefined,"typologyColor" in locals_for_with?locals_for_with.typologyColor:typeof typologyColor!=="undefined"?typologyColor:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}