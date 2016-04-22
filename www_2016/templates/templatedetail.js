function pug_attr(t,e,n,r){if(e===!1||null==e||!e&&("class"===t||"style"===t))return"";if(e===!0)return" "+(r?t:t+'="'+t+'"');if("function"==typeof e.toISOString)e=e.toISOString();else if("string"!=typeof e&&(e=JSON.stringify(e),!n&&-1!==e.indexOf('"')))return" "+t+"='"+e.replace(/'/g,"&#39;")+"'";return n&&(e=pug_escape(e))," "+t+'="'+e+'"'}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}function templatedetail(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"templatedetail.pug":".detailpopin(data-title=title)\n  .fogbackground\n  .close ×\n  include usecase.pug\n","usecase.pug":".usecase\n  a(href=website)\n    img(src=website + 'favicon.ico')\n    h1.textfill\n      span= title\n\n  .countries\n        each country in countries\n           img(src=country.flagURI, title=country.name)\n      \n  .usecase-main\n    .slogan.textfill\n        span= slogan\n\n    h3 Description\n    .description.textfill\n        span!= description\n    \n  .usecase-right\n    h3 Domain\n    .domains\n        img(src='img\u002Fusecases\u002F'+ domains[0] + '.jpg', title=domains[0])\n        if domains[1]\n            .domain2 \n              |+\n              = domains[1]\n\n    h3 Use Case category\n    .category.textfill\n        span= useCaseCategory\n\n    h3 Website\n    .website.textfill\n        span= website\n\n    \u002F\u002F- h3 Tags\n    \u002F\u002F- h3 Type\n    \u002F\u002F- p= type\n    \u002F\u002F- h3 Resources"};
;var locals_for_with = (locals || {});(function (countries, description, domains, slogan, title, useCaseCategory, website) {;pug_debug_line = 1;pug_debug_filename = "templatedetail.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"detailpopin\""+pug_attr("data-title", title, true, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = "templatedetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"fogbackground\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 3;pug_debug_filename = "templatedetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"close\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "templatedetail.pug";
pug_html = pug_html + "×\u003C\u002Fdiv\u003E";
;pug_debug_line = 1;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cdiv class=\"usecase\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", website, true, false)) + "\u003E";
;pug_debug_line = 3;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cimg" + (pug_attr("src", website + 'favicon.ico', true, false)) + "\u002F\u003E";
;pug_debug_line = 4;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Ch1 class=\"textfill\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 5;pug_debug_filename = "usecase.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fh1\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 7;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cdiv class=\"countries\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "usecase.pug";
// iterate countries
var pug_obj0 = countries;
if ('number' == typeof pug_obj0.length) {

  for (var pug_index0 = 0, pug_length0 = pug_obj0.length; pug_index0 < pug_length0; pug_index0++) {
    var country = pug_obj0[pug_index0];

;pug_debug_line = 9;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cimg" + (pug_attr("src", country.flagURI, true, false)+pug_attr("title", country.name, true, false)) + "\u002F\u003E";
  }

} else {
  var pug_length0 = 0;
  for (var pug_index0 in pug_obj0) {
    pug_length0++;
    var country = pug_obj0[pug_index0];

;pug_debug_line = 9;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cimg" + (pug_attr("src", country.flagURI, true, false)+pug_attr("title", country.name, true, false)) + "\u002F\u003E";
  }

}

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 11;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cdiv class=\"usecase-main\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cdiv class=\"slogan textfill\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 13;pug_debug_filename = "usecase.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = slogan) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 15;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 15;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "Description\u003C\u002Fh3\u003E";
;pug_debug_line = 16;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cdiv class=\"description textfill\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 17;pug_debug_filename = "usecase.pug";
pug_html = pug_html + (null == (pug_interp = description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 19;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cdiv class=\"usecase-right\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 20;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "Domain\u003C\u002Fh3\u003E";
;pug_debug_line = 21;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cdiv class=\"domains\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cimg" + (pug_attr("src", 'img/usecases/'+ domains[0] + '.jpg', true, false)+pug_attr("title", domains[0], true, false)) + "\u002F\u003E";
;pug_debug_line = 23;pug_debug_filename = "usecase.pug";
if (domains[1]) {
;pug_debug_line = 24;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cdiv class=\"domain2\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "usecase.pug";
pug_html = pug_html + " ";
;pug_debug_line = 25;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "+";
;pug_debug_line = 26;pug_debug_filename = "usecase.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = domains[1]) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 28;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 28;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "Use Case category\u003C\u002Fh3\u003E";
;pug_debug_line = 29;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cdiv class=\"category textfill\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 30;pug_debug_filename = "usecase.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = useCaseCategory) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 32;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "Website\u003C\u002Fh3\u003E";
;pug_debug_line = 33;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cdiv class=\"website textfill\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "usecase.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 34;pug_debug_filename = "usecase.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = website) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"countries" in locals_for_with?locals_for_with.countries:typeof countries!=="undefined"?countries:undefined,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"domains" in locals_for_with?locals_for_with.domains:typeof domains!=="undefined"?domains:undefined,"slogan" in locals_for_with?locals_for_with.slogan:typeof slogan!=="undefined"?slogan:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"useCaseCategory" in locals_for_with?locals_for_with.useCaseCategory:typeof useCaseCategory!=="undefined"?useCaseCategory:undefined,"website" in locals_for_with?locals_for_with.website:typeof website!=="undefined"?website:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}