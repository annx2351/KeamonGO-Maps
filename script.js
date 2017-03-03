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

    var mig = new google.maps.Marker({

        map: map,
        icon: "images/dot.png"
    });

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {

            var minPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            map.setCenter(minPos);
            mig.setPosition(minPos);



        });
    } else {
        alert("Geolocation NOT");
    }
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
