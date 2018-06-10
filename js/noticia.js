$(function ($) {
    initFirebase();
    var data = getQueryParams(location.href, "idNoticia");
    if (!$.isEmptyObject(data))
        $.ajax({
            type: "POST",
            url: serverUrl + "getNoticiasAprovadasByIdNoticia",
            data: data,
            success: function (response) {
                console.log(response);
                $('.main-menu.nav').css('background-color', response[0].cor);
                $(`a.categoria${response[0].categoriaTitulo}`).parents('li').addClass('active');
                $('.dropdown-menu>.active>a, .dropdown-menu>.active>a:focus, .dropdown-menu>.active>a:hover').css('background-color', response[0].cor);
                $('.dropdown-menu>.active>a, .dropdown-menu>.active>a:focus, .dropdown-menu>.active>a:hover').css('background-image', 'none');
                showNoticiaById(response, '#noticia-detail');
            },
            error: function (error) {
                console.log(error);
                disabledLoader();
            }
        });
});