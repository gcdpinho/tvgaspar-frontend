$(function () {
    //Get info usuario
    var usuario = getUsuario();

    setAprovacoes(false);
    var table = ('.js-basic-example');
    var page = "";
    if ($(table).hasClass("noticia")) {
        page = "noticia";
        getAllNoticias(false, false);
    } else if ($(table).hasClass("publicidade")) {
        page = "publicidade";
        getAllPublicidades();
    } else if ($(table).hasClass("imagem")) {
        page = "imagem";
        //Init Firebase plugin
        initFirebase();
        getAllImagens(true);
    } else if ($(table).hasClass("video")) {
        page = "video";
        getAllVideos(false, true);
    } else if ($(table).hasClass("tag")) {
        page = "tag";
        getAllTags(false, true);
    } else if ($(table).hasClass("categoria")) {
        page = "categoria";
        getAllCategorias(false, true);
    }

    //Notification em caso de page reload
    var not = localStorage.getItem('not');
    if (not != null && not != "") {
        showNotification(not, 'success');
        localStorage.setItem('not', "");
    }

    $('.dataTableDelete').click(function () {
        $(".page-loader-wrapper").fadeIn();
        var url = "https://tvgaspar-server.herokuapp.com/";
        switch (page) {
            case "noticia":
                url += "deleteNoticiaById";
                break;
            case "publicidade":
                url += "deletePublicidadeById";
                break;
            case "imagem":
                url += "deleteImagemById";
                break;
            case "video":
                url += "deleteVideoById";
                break;
            case "tag":
                url += "deleteTagById";
                break;
            case "categoria":
                url += "deleteCategoriaById";
                break;
        }

        $.ajax({
            type: "POST",
            url: url,
            data: {
                id: $("#modalId").html(),
                token: localStorage.getItem('token')
            },
            success: function (response) {
                console.log(response);

                if (response.sqlMessage) {
                    $('#defaultModal').modal('hide');
                    registerMessage(response, "", page.toUpperCase(), false);
                } else {
                    localStorage.setItem(page, "");
                    localStorage.setItem('not', acentuacaoTable(page).toUpperCase() + " excluído com sucesso!");

                    location.reload();
                }

            },
            error: function (error) {
                console.log(error.message);
                //logout('Sessão inválida. Faça o login novamente.');
            }
        });
    });
});