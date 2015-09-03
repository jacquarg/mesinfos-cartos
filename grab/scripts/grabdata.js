// Define spreadsheet URL.
//var SPS_EXPE_MESINFOS = 'https://docs.google.com/a/hoodbrains.com/spreadsheets/d/11FHr8STCtM4M-Kd6jznsR9d5cP6_mzqAzlXsN5Us0PY/edit#gid=128913589'
var SPS_EXPE_MESINFOS = 'https://docs.google.com/a/hoodbrains.com/spreadsheets/d/11FHr8STCtM4M-Kd6jznsR9d5cP6_mzqAzlXsN5Us0PY/edit#gid=1283790985'

// $('#graph-container').
function fetchFromSpreadsheets(spreadSheetUri, referentialUri, callback) {
    async.mapSeries([spreadSheetUri, referentialUri], fetchFromSpreadsheet,
        function(err, res) {
            if (err) { return callback(err); }

            callback(null, res[0].concat(res[1]));
    });
}

function fetchFromSpreadsheet(spreadSheetUri, callback) {
    // STUB
    // $.getJSON('data/MIS-datamodel.json', function(json) { callback(null, json); });
    // return
    // // END Stub

    sheetrock({
        url: spreadSheetUri,
        callback: function (error, options, response) {
            if (error) { return callback(error); }
            var infos, err;
            try {
                infos = rows2Infos(response.rows);
                callback(err, infos);
            } catch (e) {
                err = e;
                console.log(e);
            }
            // callback(err, metaDoctypes);
      }
    });
}

var rows2Infos = function(rows) {
    // Pour chaque ligne
    // sauter les ligne à ignorer,
    // champs :
    // typologie, domaine, description, support, accès, facilité d'accès, exemple de supports, referencial
    console.log(rows);


    var infos = [], row, info;
    for (i=0; i<rows.length; i++) {
        row = rows[i].cellsArray;
        if (row[9]) { continue; }

        info = {
            typology: row[0].trim(),
            desc: row[2].trim(),
            support: row[3].trim(),
            access: row[4].trim(),
            accessEasiness: row[5].trim(),
            supportExample: row[6].trim(),
            subTypology: row[7].trim(),
            domain: row[8].trim(),
            referential: row[1].match(/R\d+/g),
        };


        infos.push(info);

    }
    return infos
}

function fetchDefiFromSpreadsheet(spreadSheetUri, callback) {
    sheetrock({
        url: spreadSheetUri,
        callback: function (error, options, response) {
            if (error) { return callback(error); }
            var infos, err;
            try {
                infos = rows2InfoNames(response.rows);
                callback(err, infos);
            } catch (e) {
                err = e;
                console.log(e);
            }
            // callback(err, metaDoctypes);
      }
    });
}


var rows2InfoNames = function(rows) {
    console.log(rows);

    var infos = [], row, info;
    for (i=0; i<rows.length; i++) {
        row = rows[i].cellsArray;
        if (row[9]) { continue; }

        infos.push(row[0].trim());

    }
    return infos
}
