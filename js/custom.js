$(function ($) {
    initFirebase();
    $.ajax({
        type: "GET",
        url: "https://tvgaspar-server.herokuapp.com/getAllNoticiasAprovadas",
        success: function (response) {
            console.log(response);
            showNoticias(response, $('#ultimasNoticias'), 3, 2, 12);
            showNoticias(response, $('#demaisNoticias'), 2, 2, 10);
        },
        error: function (error) {
            console.log(error);
            disabledLoader();
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

// Lines não funciona
var showNoticias = async function (data, row, columns, lines, limit) {
    var controlC = 0;
    var controlL = 0;
    var controlLimite = 0;

    createLines(row, lines, columns, limit);

    var images = data.map(function(element){
        return element.imagemLink;
    });

    var imagesAux = [];
    for (var i=0; i<images.length; i++)
        if (images[i] != null)
            imagesAux[i] = images[i];

    var teste = await getUrls(imagesAux);

    console.log(teste);

    for (var i = 0; i < data.length; i++) {
        var aux = item;
        aux = aux.replace('?', data[i].categoriaTitulo);
        aux = aux.replace('?', '#');
        aux = aux.replace('?', '#');
        aux = aux.replace('?', data[i].categoriaTitulo);
        aux = aux.replace('?', '#');
        aux = aux.replace('?', data[i].manchete);
        aux = aux.replace('?', '#');
        aux = aux.replace('?', data[i].texto);
        aux = aux.replace('interrogacao', teste[i]);
        
        $(row).find('.rowItem' + controlL + ' .colItem' + controlC).append(aux);
        controlC++;
        
        if (controlC == columns){
            controlC = 0;
            controlL++;
        }

        controlLimite++;
        if (controlLimite >= limit)
            break;
    }

    disabledLoader();
}

var createLines = function (row, lines, columns, limit) {
    var l = Math.ceil(limit / columns);
    var controleL = 0;
    for (var i = 0; i < l; i++) {
        aux = linha;
        aux = aux.replace('?', i);

        $(row).append(aux);
        createColumns($(row).find('.rowItem' + i), columns);
        controleL++;
        if (controleL == lines){
            controleL = 0;
            $(row).append(propaganda);
        }
    }
}

var createColumns = function (row, columns) {
    var col = 12 / columns;

    for (var i = 0; i < columns; i++) {
        var aux = coluna;
        aux = aux.replace('?', col);
        aux = aux.replace('?', col);
        aux = aux.replace('?', i);

        $(row).append(aux);
    }
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

//Get URL da imagem Firebase
var getUrls = async function (arrayDeImagens) {
    return Promise.all(arrayDeImagens.map(async nome =>
        await firebase.storage().ref().child('imagens/' + nome).getDownloadURL()
    )).then();
}

var initFirebase = function () {
    firebase.initializeApp({
        apiKey: "AIzaSyAN8z_RHWKICWDl-QQ5cAQ8b1LvIWfrvOw",
        authDomain: "tvgaspar-backend.firebaseapp.com",
        databaseURL: "https://tvgaspar-backend.firebaseio.com",
        projectId: "tvgaspar-backend",
        storageBucket: "tvgaspar-backend.appspot.com",
        messagingSenderId: "702505431041"
    });
}