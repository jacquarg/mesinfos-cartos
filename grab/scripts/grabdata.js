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
            accessEasyness: row[5].trim(),
            supportExample: row[6].trim(),
            subTypology: row[7].trim(),
            domain: row[8].trim(),
            referential: row[1].match(/R\d+/g),
        };


        infos.push(info);

    }
    return infos
}

var rows2Metadoctype = function(rows) {
    var i, row, currentDT = {}, docType, k, v;

    var fieldsCol = {
        champs: true,
        champsValeur: true,
        champsType: true,
        champsDescription: true,
    };
    var docTypes = [];

    for (i=0;i<rows.length;i++) { //
        row = rows[i].cells;
        if (row.commentaires) { continue; }

        if (row.type && row.type !== "" && currentDT.type !== row.type) {
            // New doctype
            if (currentDT.type) {  // Initialization.
                docTypes.push(currentDT);
            }

            currentDT = $.extend({}, true, row);

            // Clean empty keys
            for (k in currentDT) {
                if (currentDT[k] == null || currentDT[k] === "") {
                    delete currentDT[k];
                }
            }
            for (k in fieldsCol) {
                delete currentDT[k];
            }
            currentDT.fields = [];

        }

        // extract data of a field
        field = {};
        for (k in fieldsCol) {
            field[k] = row[k];
        }

        currentDT.fields.push(field);

    }
    // add last document.
    docTypes.push(currentDT);
    //console.log(docTypes);
    return docTypes;
};


