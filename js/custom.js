var disabledLoader = function () {
    $(".loader-item").fadeOut();
    $("#pageloader").fadeOut("slow");
    $('#pageloader').css('background-color', '#fff');
}

var enabledLoader = function () {
    $(".loader-item").fadeIn();
    $("#pageloader").fadeIn();
}

enabledLoaderFosco = function () {
    $('#pageloader').css('background-color', 'rgba(255, 255, 255, 0.8)');
    enabledLoader();
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
        return element.imagem.link;
    });

    var imagesAux = [];
    for (var i = 0; i < images.length; i++)
        if (images[i] != null)
            imagesAux[i] = images[i];

    var images = await getUrls(imagesAux);

    for (var i = 0; i < data.length; i++) {
        if (!data[i].tag.some(t => (t.titulo == "Especial"))) {
            var aux = item;
            aux = aux.replace('?', data[i].categoria[0].titulo);
            aux = aux.replace('?', data[i].noticia.id);
            aux = aux.replace('?', 'javascript:void(0);');
            aux = aux.replace('?', 'javascript:void(0);');
            aux = aux.replace('?', data[i].categoria[0].cor);
            aux = aux.replace('?', data[i].categoria[0].titulo);
            aux = aux.replace('?', 'javascript:void(0);');
            aux = aux.replace('?', data[i].noticia.manchete);
            aux = aux.replace('?', 'javascript:void(0);');
            aux = aux.replace('?', data[i].noticia.resumo);
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
    }
    // disabledLoader();
}

var generateCors = function (categorias) {
    var cor = "";
    for (categoria of categorias)
        cor += `.${categoria.titulo} .bar-title::before{background-color:${categoria.cor} !important;} 
        .${categoria.titulo} a.noticia-title:hover{color: ${categoria.cor} !important} 
        .${categoria.titulo} a.resumo:hover{color: ${categoria.cor} !important}`

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

var createLines = async function (row, lines, columns, limit) {
    var l = Math.ceil(limit / columns);
    var controleL = 0;
    var controlPub = 0;
    var pubs = JSON.parse(localStorage.getItem('publicidadesHorizontal'));
    var imgs = [];
    for (var i = 0; i < pubs.length; i++)
        imgs.push(pubs[i].imagemLink);

    var images = await getUrls(imgs);
    for (var i = 0; i < l; i++) {
        aux = linha;
        aux = aux.replace('?', i);

        $(row).append(aux);
        await createColumns($(row).find('.rowItem' + i), columns);
        controleL++;
        if (controleL == lines) {
            controleL = 0;

            if (controlPub < pubs.length) {


                var prop = publicidadeHorizontal;
                prop = prop.replace('interrogacao', pubs[controlPub].link);
                prop = prop.replace('interrogacao', images[controlPub]);

                $(row).append(prop);

                controlPub++;
            }

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

var goToNoticia = function (id, event) {
    if (event.target.className.includes('goToTag'))
        location.href = `noticiaCategoria.html?tituloCategoria=${$(event.target).text()}`;
    else
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
        aux = aux.replace('?', data[i].id);
        aux = aux.replace('?', data[i].cor);
        aux = aux.replace('?', data[i].manchete);
        aux = aux.replace('?', data[i].resumo);
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
    texto.split('&lt;img&gt;').forEach(element => {
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

var showSuperDestaque = async function (data, row) {
    var imgs = [];
    imgs.push(data[0].imagemLink);

    var images = await getUrls(imgs);
    for (var i = 0; i < 1; i++) {
        var aux = noticiaDestaque;
        aux = aux.replace('?', data[i].id);
        aux = aux.replace('?', data[i].manchete);
        aux = aux.replace('?', data[i].subManchete == undefined ? "" : data[i].subManchete);
        aux = aux.replace('?', data[i].resumo);
        aux = aux.replace('interrogacao', images[i] == undefined ? "" : images[i]);

        $(row).append(aux);
    }

}

var showStreamAoVivo = function (data, row) {
    for (var i = 0; i < 1; i++) {
        var aux = streamAoVivo;
        aux = aux.replace('?', data[i].titulo);
        aux = aux.replace('?', data[i].texto == undefined ? "" : data[i].texto);
        aux = aux.replace('?', data[i].link);

        $(row).append(aux);
        $('#parallax-section').height('550px');
    }
}

var agroupNoticia = function (data) {
    var categoria = [];
    var tag = [];
    var result = [];
    var idNoticia = data.map((e) => {
        return e.id;
    });
    idNoticia = idNoticia.filter((x, i, a) => a.indexOf(x) == i);
    for (var i = 0; i < idNoticia.length; i++) {
        tag[idNoticia[i]] = [];
        categoria[idNoticia[i]] = [];
    }
    for (noticia of data)
        for (id of idNoticia)
            if (noticia.id == id) {
                if (!categoria[id].some(cat => (cat.titulo == noticia.categoriaTitulo)))
                    categoria[id].push({
                        titulo: noticia.categoriaTitulo,
                        cor: noticia.cor
                    });
                if (!tag[id].some(t => (t.titulo == noticia.tag)))
                    tag[id].push({
                        titulo: noticia.tag
                    });
                break;
            }
    for (id of idNoticia) {
        var aux = getNoticiaById(data, id);
        aux['categoria'] = categoria[id];
        aux['tag'] = tag[id];
        result.push(aux);
    }

    return result;
}

var getNoticiaById = function (data, id) {
    for (noticia of data)
        if (noticia.id == id)
            return {
                noticia: {
                    id: noticia.id,
                    manchete: noticia.manchete,
                    submanchete: noticia.submanchete,
                    resumo: noticia.resumo,
                    autor: noticia.autor,
                    dtCadastro: noticia.dtCadastro,
                    texto: noticia.texto,
                },
                imagem: {
                    titulo: noticia.imagemTitulo,
                    link: noticia.imagemLink
                }

            };
}

var showColunistas = async function (data, row, limit) {
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
        var aux = itemColunista;
        aux = aux.replace('?', data[i].id);
        aux = aux.replace('?', 'javascript:void(0);');
        aux = aux.replace('?', data[i].manchete);
        aux = aux.replace('?', 'javascript:void(0);');
        aux = aux.replace('?', data[i].resumo);
        aux = aux.replace('interrogacao', images[i] == undefined ? "" : images[i]);

        $(row).append(aux);
        controlLimite++;
        if (controlLimite >= limit)
            break;
    }
}

var showNews = function (data, row, limit) {
    var controlLimite = 0;
    for (var i = 0; i < data.length; i++) {
        if (!data[i].tag.some(t => (t.titulo == "Especial"))) {
            var aux = itemNovasNoticias;
            aux = aux.replace('?', data[i].categoria[0].titulo);
            aux = aux.replace('?', 'javascript:void(0);');
            aux = aux.replace('?', data[i].noticia.id);
            aux = aux.replace('?', data[i].noticia.manchete);

            $(row).append(aux);
            controlLimite++;
            if (controlLimite >= limit)
                break;
        }
    }
}

var showGaleriaVideo = function (data) {
    var row;
    for (var i = 0; i < data.length; i++) {
        var aux;
        if (i == 0) {
            aux = itemGaleriaVideo;
            row = $("#galeriaVideo");
        } else {
            aux = tumbGaleriaVideo;
            row = $("#tumbVideo");
        }

        aux = aux.replace('interrogacao', data[i].link);

        $(row).append(aux);
    }
}

var changeVideoGallery = function (video) {
    enabledLoaderFosco();
    var oldSrc = $('#galeriaVideo iframe').attr('src');
    $('#galeriaVideo iframe').attr('src', $(video).parents('.module-media').find('iframe').attr('src'));
    $(video).parents('.module-media').find('iframe').attr('src', oldSrc);
    setTimeout(disabledLoader, 2000);
}


var showCategoriasFooter = function (categorias) {
    for (categoria of categorias) {
        var aux = itemCategoriaFooter;
        aux = aux.replace('?', 'javascript:void(0);');
        aux = aux.replace('?', categoria.titulo);

        $('.tagcloud').append(aux);
    }
}

var showPublicidadeVertical = async function (data, row, limit) {
    var controlLimite = 0;
    var imgs = [];
    for (var element of data)
        imgs.push(element.imagemLink);

    var images = await getUrls(imgs);
    for (var i = 0; i < data.length; i++) {

        var aux = publicidadeVertical;
        aux = aux.replace('interrogacao', data[i].link);
        aux = aux.replace('interrogacao', images[i]);

        $(row).append(aux);
        controlLimite++;
        if (controlLimite >= limit)
            break;
    }
}

var showPublicidadeTopo = function (row) {
    $.ajax({
        type: "POST",
        url: serverUrl + "getPublicidadesByTipo",
        data: {
            tipo: "Topo"
        },
        success: function (response) {
            console.log(response);
            var f = async () => {
                var images = await getUrls([response[0].imagemLink]);
                var aux = publicidadeTopo;
                aux = aux.replace('interrogacao', response[0].link);
                aux = aux.replace('interrogacao', images[0]);

                $(row).append(aux);
            }
            f();
        },
        error: function (error) {
            console.log(error);
            disabledLoader();
        }
    });
}