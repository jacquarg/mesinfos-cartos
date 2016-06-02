
var data = [];
var doctypes = [];

parseAData = function(d) {

};

getJSON = function() {
  $.getJSON('data/list_data.json', function(data) {
      infos = data;
  });

}
