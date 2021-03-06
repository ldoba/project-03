// Affichage de la map - On crée un objet map si besoin dans d'autres villes

class Map {
    constructor(lat, lon, target, zoom) {
        this.lat = lat;
        this.lon = lon;
        this.target = target;
        this.zoom = zoom;
        this.mymap = L.map(this.target).setView([this.lat, this.lon], this.zoom);
        this.stationMarker = null;
    }

    initMap() {
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            accessToken: 'sk.eyJ1IjoibHNnc3NsbiIsImEiOiJja2NwMHJlOHQwcWRqMnJzNmd0eTVocGlrIn0.r928SiZoG7u1tzr17u6yRw',
            maxZoom: 30
        }).addTo(this.mymap);
        return this;
    }
    async main() {

        let response = await fetch('https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=a174a5f60953c51e797d3b90159183e7e22a500c');
        // On vérifie la réponse de l'api
        if (response.ok) {
            var stationsList = await response.json();
            console.log(stationsList);
            console.log('Retour serveur OK :', response.status);
            console.log('il y a ' + stationsList.length + ' stations dans cette ville');
            for (var i = 0; i < stationsList.length; i++) {
                const name = stationsList[i].name;
                const address = stationsList[i].address;
                const available_bikes = stationsList[i].available_bikes;
                const status = stationsList[i].status;
                const lat = stationsList[i].position.lat;
                const lng = stationsList[i].position.lng;
                //Je crée les deux icons vert et rouge
                const bicycleIconGreen = L.icon({
                    iconUrl: 'images/velo-vert.png',
                    iconSize:     [30, 30], // size of the icon
                    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                });
                const bicycleIconRed = L.icon({
                    iconUrl: 'images/velo-rouge.png',
                    iconSize:     [30, 30], // size of the icon
                    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                });
                //On crée la fonction qui récupère les infos
                function getStationInformations() {
                    document.getElementById('station-name').textContent = name;
                    document.getElementById('station-address').textContent = address;
                    document.getElementById('station-status').textContent = status;
                    document.getElementById('station-available_bikes').textContent = available_bikes;
                    document.getElementById("form-info").style.visibility = "visible";
                    document.getElementById("btn-booking").style.visibility = "visible";
                }
                function stationNotDisponible() {
                    document.getElementById('station-name').textContent = name;
                    document.getElementById('station-address').textContent = address;
                    document.getElementById('station-status').textContent = status;
                    document.getElementById('station-available_bikes').textContent = available_bikes;
                    document.getElementById("form-info").style.visibility = "hidden";
                    document.getElementById("canvas").style.visibility = "hidden";
                    document.getElementById("btn-booking").style.visibility = "hidden";
                }
                if (available_bikes > 0 && status == 'OPEN') {
                    //si dispo marker vert
                    var markerGreen = L.marker([lat, lng], { icon: bicycleIconGreen }).addTo(this.mymap);
                    markerGreen.addEventListener("click", getStationInformations);
                } else {
                    //si indispo marker rouge
                    console.log('Pas de station disponible');
                    var markerRed = L.marker([lat, lng], { icon: bicycleIconRed }).addTo(this.mymap);
                    markerRed.addEventListener("click", stationNotDisponible);
                }
            }
        } else {
            console.log('Retour serveur not OK', response.status);
        }
    }
};

// On set la map sur Toulouse
const mapToulouse = new Map(43.6044622, 1.4442469, document.getElementById('map'), 13);
mapToulouse.initMap();
mapToulouse.main();

