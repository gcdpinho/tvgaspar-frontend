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
            if (response.length > 0)
                showSuperDestaque(response, '#parallax-section');
            else
                $.ajax({
                    type: "POST",
                    url: serverUrl + "getVideoByTag",
                    data: {
                        tituloTag: "Stream"
                    },
                    success: function (response) {
                        console.log(response);
                        if (response.length > 0)
                            showStreamAoVivo(response, '#parallax-section');
                        else
                            $('#parallax-section').remove();
                    },
                    error: function (error) {
                        console.log(error);
                        disabledLoader();
                    }
                });
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
                        type: "POST",
                        url: serverUrl + "getNoticiasAprovadasByCategoria",
                        data: {
                            tituloCategoria: "Colunista"
                        },
                        success: function (response) {
                            console.log(response);
                            showColunistas(response, $('#colunista ul'), 10);
                            $.ajax({
                                type: "GET",
                                url: serverUrl + "getAllNoticiasAprovadas",
                                success: function (response) {
                                    console.log(response);
                                    const aux = async () => {
                                        var data = agroupNoticia(response);
                                        showNews(data, $('#news ul'), 5);
                                        showNoticias(data, $('#ultimasNoticias'), 3, 2, 12);
                                        await showNoticias(data, $('#demaisNoticias'), 2, 2, 10);
                                        var categorias = getDiffCategorias(response);
                                        generateCors(categorias);
                                        disabledLoader();
                                    };
                                    aux();
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
        },
        error: function (error) {
            console.log(error);
            disabledLoader();
        }
    });
});