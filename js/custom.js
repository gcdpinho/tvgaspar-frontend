$(function ($) {
    initFirebase();
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

var disabledLoader = function () {
    $(".loader-item").fadeOut();
    $("#pageloader").fadeOut("slow");
}

var enabledLoader = function () {
    $(".loader-item").fadeIn();
    $("#pageloader").fadeIn();
}

// var showSlider = async function (data, row, limit) {
//     var lines = Math.ceil(data.length / limit);
//     var controlData = data.length;
//     var controlItem = 0;
//     var auxLength;

//     var images = data.map(function (element) {
//         return element.imagemLink;
//     });

//     var imagesAux = [];
//     for (var i = 0; i < images.length; i++)
//         if (images[i] != null)
//             imagesAux[i] = images[i];

//     var images = await getUrls(imagesAux);


//     for (var i = 0; i < lines; i++) {
//         var aux = linha;
//         aux = aux.replace('?', i);
//         $(row).append(aux);
//         if (controlData < limit) {
//             auxLength = controlData;
//             createColumns($(row).find('.rowItem' + i), controlData);
//         } else {
//             auxLength = limit;
//             createColumns($(row).find('.rowItem' + i), limit);
//         }

//         for (var j = controlItem; j < controlItem + auxLength; j++) {
//             var aux = itemDestaque;
//             // aux = aux.replace('?', '#');
//             // aux = aux.replace('?', data[j].categoriaTitulo);
//             // aux = aux.replace('?', data[j].categoriaTitulo);
//             // aux = aux.replace('?', data[j].manchete);
//             // aux = aux.replace('interrogacao', images[j] == undefined ? "" : images[j]);
//             // $(row).find('.rowItem' + i + ' .colItem' + j).append(aux);
//             aux = aux.replace('?', data[j].categoriaTitulo);
//            // aux = aux.replace('?', '#');
//             aux = aux.replace('?', '#');
//             aux = aux.replace('?', data[j].categoriaTitulo);
//             aux = aux.replace('?', '#');
//             aux = aux.replace('?', data[j].manchete);
//             aux = aux.replace('?', '#');
//             aux = aux.replace('?', data[j].texto);
//             aux = aux.replace('interrogacao', images[j] == undefined ? "" : images[j]);
//             $(row).find('.rowItem' + i + ' .colItem' + j).append(aux);
//         }
//         controlData -= limit;

//     }

//     $(row).owlCarousel({
//         autoPlay: false,
//         stopOnHover: true,
//         navigation: true,
//         navigationText: ["<i class='fa-angle-left'></i>", "<i class='fa-angle-right'></i>"],
//         paginationSpeed: 1000,
//         goToFirstSpeed: 2000,
//         singleItem: true,
//         autoHeight: true,
//         transitionStyle: "fade"
//     });

// }

var showSlider = async function (data, row, limit) {
    var lines = Math.ceil(data.length / limit);
    var controlData = data.length;
    var controlItem = 0;
    var auxLength;

    var images = data.map(function (element) {
        return element.imagemLink;
    });

    var imagesAux = [];
    for (var i = 0; i < images.length; i++)
        if (images[i] != null)
            imagesAux[i] = images[i];

    var images = await getUrls(imagesAux);

    for (var i = 0; i < lines; i++) {
        var aux = rowSlider;
        aux = aux.replace('?', i);
        $(row).append(aux);
        if (controlData < limit)
            auxLength = controlData;
        else
            auxLength = limit;
        var index = 0;
        for (var j = controlItem; j < controlItem + auxLength; j++) {
            var aux = itemSlider;
            var obj = getInfoColumn(index, auxLength);
            aux = aux.replace('?', obj.tipo);
            aux = aux.replace('?', '#');
            aux = aux.replace('?', data[j].categoriaTitulo);
            aux = aux.replace('?', obj.number);
            aux = aux.replace('?', data[j].categoriaTitulo);
            aux = aux.replace('?', data[j].manchete);
            aux = aux.replace('interrogacao', images[j] == undefined ? "" : images[j]);
            $(row).find('.rowSlider' + i).append(aux);
            index++;
            
        }
        controlItem += auxLength;
        controlData -= limit;

    }

    $(row).owlCarousel({
        autoPlay: false,
        stopOnHover: true,
        navigation: true,
        navigationText: ["<i class='fa-angle-left'></i>", "<i class='fa-angle-right'></i>"],
        paginationSpeed: 1000,
        goToFirstSpeed: 2000,
        singleItem: true,
        autoHeight: true,
        transitionStyle: "fade"
    });
}

var showNoticias = async function (data, row, columns, lines, limit) {
    var controlC = 0;
    var controlL = 0;
    var controlLimite = 0;

    createLines(row, lines, columns, limit);

    var images = data.map(function (element) {
        return element.imagemLink;
    });

    var imagesAux = [];
    for (var i = 0; i < images.length; i++)
        if (images[i] != null)
            imagesAux[i] = images[i];

    var images = await getUrls(imagesAux);

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
        aux = aux.replace('interrogacao', images[i] == undefined ? "" : images[i]);

        $(row).find('.rowItem' + controlL + ' .colItem' + controlC).append(aux);
        controlC++;

        if (controlC == columns) {
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
        if (controleL == lines) {
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

var getInfoColumn = function (index, length) {
    var tipo = "";
    var number = 0;
    switch (index) {
        case 0:
            tipo = length == 1 ? "zero" : "first";
            number = 1;
            break;
        case 1:
            tipo = length == 2 ? "first" : "second";
            number = 6;
            break;
        case 2:
            tipo = length == 3 ? "second" : "third";
            number = 4;
            break;
        case 3:
            tipo = "fourth";
            number = 2;
            break;
    }

    return {
        tipo: tipo,
        number: number
    }
}