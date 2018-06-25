$(function ($) {
    $.ajax({
        type: "GET",
        url: serverUrl + "getAllCategorias",
        success: function (response) {
            console.log(response);
            var aux = async () => {
                await showCategoriasFooter(response);
                disabledLoader();
            };
            aux();
        },
        error: function (error) {
            console.log(error);
            disabledLoader();
        }
    });
});

//Google Map
var get_latitude = $('#google-map').data('latitude');
var get_longitude = $('#google-map').data('longitude');

function initialize_google_map() {
    var myLatlng = new google.maps.LatLng(get_latitude, get_longitude);
    var mapOptions = {
        zoom: 14,
        scrollwheel: false,
        center: myLatlng
    };
    var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map
    });
}
google.maps.event.addDomListener(window, 'load', initialize_google_map);