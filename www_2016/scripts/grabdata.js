// Define spreadsheet URL.

// $('#graph-container').

function fetchFromSpreadsheet(spreadSheetUri, parser, callback) {
    // STUB
    // $.getJSON('data/MIS-datamodel.json', function(json) { callback(null, json); });
    // return
    // // END Stub

    sheetrock({
        url: spreadSheetUri,
        labels: ['Nom', 'Description', 'Exemple', 'Typologie', 'DocType'],
        callback: function (error, options, response) {
            if (error) { return callback(error); }
            var infos, err;
            try {
                infos = parser(response.rows);
                callback(err, infos);
            } catch (e) {
                err = e;
                console.log(e);
            }
            // callback(err, metaDoctypes);
      }
    });
}



var rows2Data = function(rows) {
    // Pour chaque ligne
    // sauter les ligne à ignorer,
    console.log('toto');
    console.log(rows);

    var infos = [], row, info;
    // skip first (heading) line
    for (i=1; i<rows.length; i++) {
        row = rows[i].cellsArray;
        if (row[13]) { continue; }

        // parse country
        info = {
            typology: row[3].trim(),
            name: row[0].trim(),
            description: row[1].trim(),
            exemple: row[2].trim(),

            fields: row[6].replace(/\n/g, '').split('*'),
            availability: row[3].trim(),
            providers: [row[1].trim()],
        };

        infos.push(info);

    }
    // group by title :

    var res = [];
    var mapping = {};
    infos.forEach(function(info) {
        if (info.title in mapping) {
            mapping[info.title].providers.push(info.providers[0]);
        } else {
            mapping[info.title] = info;
            res.push(info);
        }
    });

    return res;
};

var rows2Usecases = function(rows) {
    // Pour chaque ligne
    // sauter les ligne à ignorer,
    // champs :
    // typologie, domaine, description, support, accès, facilité d'accès, exemple de supports, referencial
    console.log(rows);

    var infos = [], row, info;
    // skip first (heading) line
    for (i=1; i<rows.length; i++) {
        row = rows[i].cellsArray;
        if (row[9]) { continue; }

        // parse country

        info = {
            typology: row[0].trim(),
            domains: [row[0].trim(), row[1].trim()],
            title: row[3].trim(),
            slogan: row[4].trim(),
            description: row[5].trim().replace(/[\n]/g,'<br>'),
            useCaseCategory: row[6].trim(),
            //type: row[5].trim(),
            website: row[7].trim(),
            countries: row[8].split(';').map(function(country) {
                    var name = country.trim();
                    if (!name) { return null; }

                    var code = countryName2Code[name.toLowerCase()];
                    if (!code) { return null; }

                    return {
                        name: name,
                        code: code,
                        flagURI: 'img/flags/' + code.toLowerCase() + '.png',
                    };
                }).filter(function(obj) { return !!obj}),
            status: row[2],
            //tags: row[8].trim(),
        };

        infos.push(info);

    }
    return infos
};


var rows2ServicesMI = function(rows) {
    // Pour chaque ligne
    // sauter les ligne à ignorer,
    // champs :
    // typologie, domaine, description, support, accès, facilité d'accès, exemple de supports, referencial
    console.log(rows);

    var infos = [], row, info;
    // skip first (heading) line
    for (i=1; i<rows.length; i++) {
        row = rows[i].cellsArray;
        //if (row[]) { continue; }

        // parse country

        info = {
            typology: row[2].trim(),
            domains: [row[2].trim(), row[3].trim()],
            title: row[0].trim(),
            slogan: row[5].trim(),
            description: row[6].trim().replace(/[\n]/g,'<br>'),
            tags: row[4].split(',').map(function(tag) {return tag.trim()}),
            website: row[11].trim(),
            status: row[1],
            linkOnMesInfosSite: row[12]
        };

        infos.push(info);

    }
    return infos
};



// MesInfos Energie / Sante
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

var rows2DataOld = function(rows) {
    // Pour chaque ligne
    // sauter les ligne à ignorer,
    // champs :
    // typologie, domaine, description, support, accès, facilité d'accès, exemple de supports, referencial
    console.log(rows);

    var infos = [], row, info;
    // skip first (heading) line
    for (i=1; i<rows.length; i++) {
        row = rows[i].cellsArray;
        if (row[13]) { continue; }

        // parse country
        info = {
            typology: row[5].trim(),
            title: row[0].trim(),
            fields: row[6].replace(/\n/g, '').split('*'),
            availability: row[3].trim(),
            providers: [row[1].trim()],
        };

        infos.push(info);

    }
    // group by title :

    var res = [];
    var mapping = {};
    infos.forEach(function(info) {
        if (info.title in mapping) {
            mapping[info.title].providers.push(info.providers[0]);
        } else {
            mapping[info.title] = info;
            res.push(info);
        }
    });

    return res;
};
