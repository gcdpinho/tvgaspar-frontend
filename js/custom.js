$(function ($) {
    $.ajax({
        type: "GET",
        url: "https://tvgaspar-server.herokuapp.com/getAllNoticiasAprovadas",
        success: function (response) {
            console.log(response);
            showNoticias(response, 3, 2, 15);
        },
        error: function (error) {
            console.log(error.message);
        }
    });
});

var disabledLoader = function () {
    $(".loader-item").fadeOut();
    $("#pageloader").fadeOut("slow");
}

var enabledLoader = function () {
    $(".loader-item").fadeIn();
    $("#pageloader").fadeIn();
}

var showNoticias = function (data, column, lines, limit) {
    var controlC = 0;
    var controlL = 0;
    var controlLimite = 0;
    for (var i = 0; i < data.length; i++) {
        var aux = item;
        aux = aux.replace('?', data[i].categoriaTitulo);
        aux = aux.replace('?', '#');
        aux = aux.replace('?', data[i].imagemLink);
        aux = aux.replace('?', '#');
        aux = aux.replace('?', data[i].categoriaTitulo);
        aux = aux.replace('?', '#');
        aux = aux.replace('?', data[i].manchete);
        aux = aux.replace('?', '#');
        aux = aux.replace('?', data[i].texto);
        $('#colItem' + controlC).append(aux);
        if (controlC < 3)
            controlC++;
        else
            controlC = 0;
        controlLimite++;
        if (controlLimite >= limit)
            break;
    }

    disabledLoader();
}

var getNoticias = function () {
    var date = new Date();
    var noticia = {
        manchete: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        subManchete: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        autor: "Lorem ipsum",
        img: "image_620x465.jpg",
        dtCadastro: date.toLocaleDateString() + " " + date.toLocaleTimeString()
    };

    return noticia;
}