
// MAPS

    /*//Création d'une variable par ville si besoin d'en faire plusieurs
    var toulouse = [43.6044622, 1.4442469];

    //création de la map : objet L (leaflet) avec methode map > initialiser une map avec (notre container) + setview sur coordonnées Toulouse + niveau de zoom
    var map = L.map('map').setView(toulouse, 13);

    //création du calque image
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        accessToken: 'sk.eyJ1IjoibHNnc3NsbiIsImEiOiJja2NwMHJlOHQwcWRqMnJzNmd0eTVocGlrIn0.r928SiZoG7u1tzr17u6yRw',
        maxZoom:30
    }).addTo(map); //on ajoute ce calque à la map

    //on crée un icon vélo
    var bicycleIcon = L.icon({
        iconUrl: 'images/velo.png',
        iconSize:     [50, 50], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
*/

// Affichage de la map - On crée un objet map si besoin dans d'autres villes
    class Map{
        constructor(lat, lon, target, zoom){
            this.lat = lat;
            this.lon = lon;
            this.target = target;
            this.zoom = zoom;
            this.mymap = L.map(this.target).setView([this.lat, this.lon], this.zoom);
            this.stationMarker = null;
        }
        initMap(){
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            accessToken: 'sk.eyJ1IjoibHNnc3NsbiIsImEiOiJja2NwMHJlOHQwcWRqMnJzNmd0eTVocGlrIn0.r928SiZoG7u1tzr17u6yRw',
            maxZoom:30
        }).addTo(this.mymap);
        return this;
        }
    };
// On set la map sur Toulouse
    let mapToulouse = new Map(43.6044622, 1.4442469, document.getElementById('map'), 13)
        .initMap();

// On récupére les données de l'api JC Decaux pour Toulouse
    
    const getMarkers = async function(){
        let response =  await fetch('https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=a174a5f60953c51e797d3b90159183e7e22a500c')
        if (response.ok) {
            var stationsList  = await response.json();
            console.log(stationsList)
            console.log('Retour serveur OK :', response.status)
            var stationsNumber = this.stationsList.lenght;
            console.log('Voici le nombre de station :', stationsNumber)
        }
    }
// j'ai la liste de tous mes markers
    getMarkers();

// je crée objet station
    class Station {
        constructor (adress, status, available_bikes, lat, lng){
            this.adress = adress;
            this.status = status ;
            this.available_bikes = available_bikes ;
            this.lat = lat;
            this.lng = lng;
        }
    }

// Je crée la fonction qui va écrire mes markers automatiquement
    
    function setMarkers() {
        var stationsLenght = getMarkers.length;
        for(let i = 0; i == this.slides.length; i++){
                this.slides[i].style.width = this.containerWidth + "px";
                totalWidth = totalWidth + this.containerWidth;
            }
            //set width of slider-items container
            this.slider.querySelector(".slider-items").style.width=totalWidth + "px";
        
    }

/*
    let stations = getMarkers();
    console.log(stations)
    let stationMarker = L.marker([station.position.lat, station.position.lng]).addTo(mapToulouse);

    //ancienne requete sans fetch
        request(){
            let request = new XMLHttpRequest();
            let that = this;
            request.onreadystatechange = function(){
                if(this.readyState == XMLHttpRequest.DONE && this.statusText == 200){
                    let stations = JSON.parse(this.responseText);
                    for (let station of stations){
                        console.log(station);
                        let stationMarker = L.marker([station.position.lat, station.position.lng]).addTo(that.mymap);
                    }
                }
            };
            request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=a174a5f60953c51e797d3b90159183e7e22a500c");
            request.send();
            return this;
        };
    */