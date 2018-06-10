$(function ($) {
    initFirebase();
    var data = getQueryParams(location.href, "tituloCategoria");
    var dataDestaque = Object.assign({}, data);
    dataDestaque['tituloTag'] = "Destaque";
    if (!$.isEmptyObject(data))
        $.ajax({
            type: "POST",
            url: serverUrl + "getNoticiasAprovadasByTagByCategoria",
            data: dataDestaque,
            success: function (response) {
                console.log(response);
                showSlider(response, $('#news-slider'), 4);
                $.ajax({
                    type: "POST",
                    url: serverUrl + "getNoticiasAprovadasByCategoria",
                    data: data,
                    success: function (response) {
                        console.log(response);
                        $('.main-menu.nav').css('background-color', response[0].cor);
                        $(`a.categoria${data.tituloCategoria}`).parents('li').addClass('active');
                        $('.dropdown-menu>.active>a, .dropdown-menu>.active>a:focus, .dropdown-menu>.active>a:hover').css('background-color', response[0].cor);
                        $('.dropdown-menu>.active>a, .dropdown-menu>.active>a:focus, .dropdown-menu>.active>a:hover').css('background-image', 'none');
                        showNoticiasCategoria(response, '#col-noticiaCategoria', 8);
                    },
                    error: function (error) {
                        console.log(error);
                        disabledLoader();
                    }
                });
            },
            error: function (error) {
                console.log(error);
                disabledLoader();
            }
        });
});