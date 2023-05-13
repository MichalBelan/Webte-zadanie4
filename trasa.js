//   var map = L.map('map');

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '© OpenStreetMap contributors'
//   }).addTo(map);

//   L.Routing.control({
//       waypoints: [
//           L.latLng(49.160043, 20.2221734),
//           L.latLng(49.1935285, 19.8982463)
//       ],
//       routeWhileDragging: true
//   }).addTo(map);





var photosInfo = []


$(document).ready(function () {

    corporateData();
});

function mapa(json) {
    $.each(json.gallery, function (key, val) {
        photosInfo.push(val);
        
    });
    console.log(photosInfo);
    var map = L.map('map').setView([48.9688821, 19.935943], 8.67);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let control = L.Routing.control({
        waypoints: [],
        addWaypoints: false,
        draggableWaypoints: false,
        routeWhileDragging: false,

        lineOptions: {
            styles: [{opacity: 1}]
        },
       
        createMarker: function (i, waypoint , photo ) {
            const marker = L.marker(waypoint.latLng, 
            //     {

            //   draggable: true,
            //   bounceOnAdd: false,
            //   bounceOnAddOptions: {
            //     duration: 1000,
            //     height: 800,
            //     function() {
            //       (bindPopup(myPopup).openOn(map))
            //     }
            //   },
             
            //}
            ).bindPopup('photo')
            .openPopup();
            return marker;
          }
        }).addTo(map);


        let waypoints = [];
        let found;
        for (let i = 0; i < photosInfo.length; i++) {
            
            found = false;
    
            for (let j = i + 1; j < photosInfo.length; j++)
                if (photosInfo[i].coords == photosInfo[j].coords) {
                    
                    found = true;
                    break;
                }
    
            if (found)
                continue;
    
            const latLng = (photosInfo[i].coords).split(',').map( Number );
            waypoints.push(L.latLng(latLng[0], latLng[1]));

        }
        console.log(waypoints);
    
        control.setWaypoints(waypoints);
        control.getRouter().options.lineOptions.styles = [{color: "red", opacity: 1}];
        control.route();
         control.hide();
         routeHidden = true;


    document.getElementById("map-button").addEventListener("click", function () {
        if (routeHidden) {
            control.show();
            control.getRouter().options.lineOptions.styles = [{color: "red", opacity: 1}];
            routeHidden = false;
        }
        else {
            control.hide();
            control.getRouter().options.lineOptions.styles = [{color: "red", opacity: 0}];
            routeHidden = true;
        }

        control.route();


    });




}


function corporateData() {

    $.ajax({
        url: 'json.json',
        dataType: 'json',
        success: function (json) {
            mapa(json)
        },
        error: function () {
            console.log('Nenacitalo json document');
        }
    });

}