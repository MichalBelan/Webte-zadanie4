var photos = []

document.getElementById('links').onclick = function (event) {
    event = event || window.event
    var target = event.target || event.srcElement
    var link = target.src ? target.parentNode : target
    var options = { index: link, event: event }
    var links = this.getElementsByTagName('a')
    blueimp.Gallery(links, options)
}




function Click() {
    document.getElementById('mysearch').value = '';

}

const icon = document.querySelector('.icon');
const search = document.querySelector('.search');
icon.onclick = function () {
    search.classList.toggle('active')
}






$(document).ready(function () {

    corporateData();
});

function createGallery(json) {
    let photoGallery = document.getElementById("links");

    $.each(json.gallery, function (key, val) {
        //  imgArray.push(loadImage(photoGallery, val));
        var a = document.createElement("a");
        var img = document.createElement("img");
        a.setAttribute("href", val.path + val.filename);
        a.setAttribute("title", val.title);
        img.setAttribute("src", val.path + val.filename);
        img.setAttribute("alt", val.title);
        photos.push(img);
        a.appendChild(img);
        photoGallery.appendChild(a);
    });


}

var search1 = document.getElementById('mysearch');
search1.addEventListener('input', function (event) {
    filter(search1.value);
})

function filter(input) {
    for (let i = 0; i < photos.length; i++) {

        if (photos[i].alt.includes(input) ) {
            photos[i].style.display = "inline-block";
            
        } else {
            photos[i].style.display = "none";
        }
    }
}

function corporateData() {

    $.ajax({
        url: 'json.json',
        dataType: 'json',
        success: function (json) {
            createGallery(json)
        },
        error: function () {
            console.log('Nenacitalo json document');
        }
    });

}

