var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
var eqs = null;
var timer = document.getElementById("timer");
var circles = [];
var map = L.map('map').setView([45, -103], 4)
var layer = null;

createMap();
startTimer();

function createMap(){
    $.get( url, function( data ) {
        eqs = data.features;
        layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: "pk.eyJ1Ijoib3NtYW4tYyIsImEiOiJja2ppeDlwbjgxZWR2MnFvN3ZnZ3ljdHhxIn0.yilVD5Dw8QTCrYOsZfsZaA"
        }).addTo(map);
        createCircles()
    });
}

function updateMap(){
    $.get( url, function( data ) {
        eqs = data.features;
        for (var i = 0; i < circles.length; i++){
            map.removeLayer(circles[i]);
        }
        createCircles();
        }
    );
}

function createCircles(){
    for (var i = 0; i < eqs.length; i++){
        var color = findColor(eqs[i].properties.mag);
        var circle = L.circle([eqs[i].geometry.coordinates[1], eqs[i].geometry.coordinates[0]], {
            color: color,
            fillColor: color,
            fillOpacity: 0.5,
            radius: eqs[i].properties.mag * 2000
        }).addTo(map);
        circles.push(circle);
    }
}

function findColor(mag){
    if (mag < 4){
        return "green";
    }
    else if (mag < 7){
        return "orange";
    }
    else{
        return "red";
    }
}

function startTimer() {
    setInterval(function () {
        if (timer.innerHTML === "0"){
            updateMap();
            timer.innerHTML = "60";
        }
        else{
            var current = timer.innerHTML;
            timer.innerHTML = (parseInt(current) - 1).toString();
        }
        }, 1000);
}


