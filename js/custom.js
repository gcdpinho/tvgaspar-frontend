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
            aux = aux.replace('?', 'javascript:void(0);');
            aux = aux.replace('?', data[j].id);
            aux = aux.replace('?', data[j].categoriaTitulo);
            aux = aux.replace('?', obj.number);
            aux = aux.replace('?', data[j].cor);
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
        aux = aux.replace('?', data[i].id);
        aux = aux.replace('?', 'javascript:void(0);');
        aux = aux.replace('?', 'javascript:void(0);');
        aux = aux.replace('?', data[i].cor);
        aux = aux.replace('?', data[i].categoriaTitulo);
        aux = aux.replace('?', 'javascript:void(0);');
        aux = aux.replace('?', data[i].manchete);
        aux = aux.replace('?', 'javascript:void(0);');
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

var generateCors = function (categorias) {
    var cor = "";
    for (categoria of categorias)
        cor += `.${categoria.titulo} .bar-title::before{background-color:${categoria.cor} !important;} 
        .${categoria.titulo} a.noticia-title:hover{color: ${categoria.cor} !important}`

    $('body').append(`<style>${cor}</style>`);
}

var getDiffCategorias = function (data) {
    var categorias = [];
    var aux = [];
    for (noticia of data)
        if (!aux.includes(noticia.categoriaTitulo)) {
            aux.push(noticia.categoriaTitulo);
            categorias.push({
                titulo: noticia.categoriaTitulo,
                cor: noticia.cor
            });
        }
    return categorias;
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

var goToNoticiaByCategoria = function (categoria) {
    location.href = `noticiaCategoria.html?tituloCategoria=${$(categoria).text()}`;
}

var goToNoticia = function (id) {
    location.href = `noticia.html?idNoticia=${$(id).data('id')}`;
}

var getQueryParams = function (qs, name) {
    qs = qs.split("?").pop();

    var params = [],
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params.push({
            k: decodeURIComponent(tokens[1]),
            v: decodeURIComponent(tokens[2])
        });
    }

    var data = {};
    params.every((v, k) => {
        if (v.k == name) {
            data[v.k] = v.v;
            return false;
        }
    });

    return data;
}

var showNoticiasCategoria = async function (data, row, limit) {
    var controlLimite = 0;
    var images = data.map(function (element) {
        return element.imagemLink;
    });

    var imagesAux = [];
    for (var i = 0; i < images.length; i++)
        if (images[i] != null)
            imagesAux[i] = images[i];

    var images = await getUrls(imagesAux);
    for (var i = 0; i < data.length; i++) {
        if (images[i] == undefined)
            var aux = noticiaCategoriaNoImage;
        else
            var aux = noticiaCategoria;
        aux = aux.replace('?', data[i].cor);
        aux = aux.replace('?', data[i].manchete);
        aux = aux.replace('?', data[i].texto);
        aux = aux.replace('interrogacao', images[i] == undefined ? "" : images[i]);

        $(row).append(aux);
        controlLimite++;
        if (controlLimite >= limit)
            break;
    }

    disabledLoader();
}

var showNoticiaById = async function (data, row) {
    var images = data.map(function (element) {
        return element.imagemLink;
    });

    var imagesAux = [];
    for (var i = 0; i < images.length; i++)
        if (images[i] != null)
            imagesAux[i] = images[i];

    var images = await getUrls(imagesAux);
    for (var i = 0; i < data.length; i++) {
        var aux = noticia;
        aux = aux.replace('?', data[i].manchete);
        aux = aux.replace('?', data[i].subManchete == undefined ? "" : data[i].subManchete);
        aux = aux.replace('?', await treatmentImage(data[i].texto));
        // aux = aux.replace('interrogacao', images[i] == undefined ? "" : images[i]);

        $(row).append(aux);
    }

    disabledLoader();
}

var treatmentImage = async function (texto) {
    var countE = 0;
    var imgs = [];
    texto.split('&lt;img&gt;').forEach(element =>  {
        var e = element.split('&lt;/img&gt;');
        if (e.length > 1) {
            texto = texto.replace(`&lt;img&gt;${e[0]}&lt;/img&gt;`, imgNoticia.replace('tagImg-?', `tagImg-?${countE}`));
            imgs.push(e[0]);
            countE++;
        }
    });

    var images = await getUrls(imgs);

    for (var i = 0; i < images.length; i++)
        texto = texto.replace(`tagImg-?${i}`, images[i]);

    return texto;
}