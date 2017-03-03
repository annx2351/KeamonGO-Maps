var map;
var infowindow;
var kbh;

window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");
    $.getJSON("steder.json", visPunktListe);

}

function visPunktListe(punkter) {
    console.log("punkter");
    punkter.forEach(visPunktInfo);
}

function initMap() {
    kbh = new google.maps.LatLng(55.706407, 12.539141);
    map = new google.maps.Map(document.getElementById('map'), {
        center: kbh,
        zoom: 16
    });

    var infoWindow = new google.maps.InfoWindow({
        map: map
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,

            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

function visPunktInfo(sted) {

    console.log("Vis info");
    console.log("id: " + sted.id);
    console.log("lat: " + sted.lat);
    console.log("lng: " + sted.lng);

    var ll = new google.maps.LatLng(sted.lat, sted.lng);
    var m = new google.maps.Marker({
        position: ll,
        map: map,
        animation: google.maps.Animation.DROP
    });
    var w = new google.maps.InfoWindow({
        maxWidth: 100

    });

    m.addListener("click", visinfo);

    function visinfo() {
        var tempinfo =
            document.querySelector("#maps_template").content.cloneNode(true);
        tempinfo.querySelector("h2").innerHTML = sted.navn;
        tempinfo.querySelector("p").innerHTML = sted.txt;
        tempinfo.querySelector(".info_billede").src = sted.billede;
        w.setContent(tempinfo);
        w.open(map, m);
    }


}
