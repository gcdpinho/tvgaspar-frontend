$(function ($) {
    initFirebase();
    $.ajax({
        type: "POST",
        url: serverUrl + "getNoticiasAprovadasByTag",
        data: {
            tituloTag: "Super Destaque"
        },
        success: function (response) {
            console.log(response);
            showSuperDestaque(response, '#parallax-section');
            $.ajax({
                type: "POST",
                url: serverUrl + "getNoticiasAprovadasByTag",
                data: {
                    tituloTag: "Destaque"
                },
                success: function (response) {
                    console.log(response);
                    showSlider(response, $('#news-slider'), 4);
                    $.ajax({
                        type: "GET",
                        url: serverUrl + "getAllNoticiasAprovadas",
                        success: function (response) {
                            console.log(response);
                            showNoticias(response, $('#ultimasNoticias'), 3, 2, 12);
                            showNoticias(response, $('#demaisNoticias'), 2, 2, 10);
                            var categorias = getDiffCategorias(response);
                            generateCors(categorias);
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
        },
        error: function (error) {
            console.log(error);
            disabledLoader();
        }
    });

});