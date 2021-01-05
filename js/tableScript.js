var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
var eqs = null;
var table = document.getElementById("table");

createTable();

function createTable(){
    $.get( url, function( data ) {
        eqs = data.features;
        for (var i = 0; i < eqs.length; i++){
            var newRow = table.insertRow();
            var newCell = newRow.insertCell();
            newCell.innerHTML = eqs[i].properties.place;
            newCell = newRow.insertCell();
            newCell.innerHTML = eqs[i].properties.mag;
            newCell = newRow.insertCell();
            newCell.innerHTML = timePassed(eqs[i].properties.time);
        }
    });
}

function timePassed(timestamp){
    return moment(timestamp).fromNow();
}

var template = $("#tableScript").html();
var compiledTemplate = Handlebars.compile(template);
compiledTemplate({});
