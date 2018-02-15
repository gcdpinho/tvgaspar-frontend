$(function () {
    //Textare auto growth
    autosize($('textarea.auto-growth'));

    //Datetimepicker plugin
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm',
        lang: "pt-br",
        clearButton: true,
        weekStart: 1,
        cancelText: "Cancelar",
        clearText: "Apagar"
    });

    $('.datetimepicker').on('change', function (e) {
        if ($(this).val() == "")
            $(this).parents('.form-line').removeClass('focused');
        else
            $(this).parents('.form-line').addClass('focused');
        $(this).valid();
    });

    //Validation plugin
    $('#noticia').validate({
        rules: {
            tag: {
                invalidTag: true,
                requiredTag: true
            },
            imagem: {
                invalidImagem: true
            },
            video: {
                invalidVideo: true
            },
            categoria: {
                invalidCategoria: true
            }
        },
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        }
    });

    //Init Firebase plugin
    initFirebase();

    //Get info usuario
    var usuario = getUsuario();
    
    //Set aprovacoes (noticias)
    setAprovacoes(false);

    //Load info de tabelas relacionadas
    getAllTags(false, false);

    //Botão de pesquisar
    $('.div-search-button button').click(function () {
        search($(this).val());
    });

    //Form Salve
    $('#noticia').submit(function (e) {
        if ($("#noticia").valid()) {
            $('.page-loader-wrapper').fadeIn();
            $.ajax({
                type: "POST",
                url: "https://tvgaspar-server.herokuapp.com/createNoticia",
                data: {
                    manchete: $('input[name="manchete"]').val(),
                    subManchete: $('input[name="subManchete"]').val(),
                    texto: $('textarea[name="texto"]').val(),
                    autor: $('input[name="autor"]').val(),
                    dtCadastro: $('input[name="dtCadastro"]').val(),
                    flgAtivo: 1,
                    aprovacao: usuario.isAdm,
                    idUsuario: usuario.id,
                    token: localStorage.getItem('token')
                },
                success: function (response) {
                    console.log(response);
                    var insertId = response.insertId;
                    var data = [];
                    var entry;
                    if (registerMessage(response, $('#noticia'), "NOTÍCIA", false)) {
                        $('.label-info.success').each(function () {
                            entry = {}
                            entry['idNoticia'] = insertId;
                            entry['idTag'] = getDataId("tag", $(this).text(), "titulo");
                            data.push(entry);
                        });
                        console.log(data);
                        $.ajax({
                            type: "POST",
                            url: "https://tvgaspar-server.herokuapp.com/createNoticiaTag",
                            data: {
                                data: data,
                                token: localStorage.getItem('token')
                            },
                            success: function (response) {
                                console.log(response);
                                var data = [];
                                var entry;
                                if (registerMessage(response, $('#noticia'), "NOTÍCIA", false)) {
                                    var arrCategorias = $('input[name="categoria"]').val().split(", ");
                                    arrCategorias = arrCategorias.filter(function (value, index, self) {
                                        return (self.indexOf(value) == index)
                                    });
                                    for (var element in arrCategorias) {
                                        entry = {}
                                        entry['idNoticia'] = insertId;
                                        entry['idCategoria'] = getDataId("categoria", arrCategorias[element], "titulo");
                                        data.push(entry);
                                    }
                                    console.log(data);
                                    $.ajax({
                                        type: "POST",
                                        url: "https://tvgaspar-server.herokuapp.com/createNoticiaCategoria",
                                        data: {
                                            data: data,
                                            token: localStorage.getItem('token')
                                        },
                                        success: function (response) {
                                            console.log(response);
                                            if ($('input[name="video"]').val() != "") {
                                                var data = [];
                                                var entry;
                                                if (registerMessage(response, $('#noticia'), "NOTÍCIA", false)) {
                                                    var arrVideos = $('input[name="video"]').val().split(", ");
                                                    arrVideos = arrVideos.filter(function (value, index, self) {
                                                        return (self.indexOf(value) == index)
                                                    });
                                                    for (var element in arrVideos) {
                                                        entry = {}
                                                        entry['idNoticia'] = insertId;
                                                        entry['idVideo'] = getDataId("video", arrVideos[element], "link");
                                                        data.push(entry);
                                                    }
                                                    console.log(data);
                                                    $.ajax({
                                                        type: "POST",
                                                        url: "https://tvgaspar-server.herokuapp.com/createNoticiaVideo",
                                                        data: {
                                                            data: data,
                                                            token: localStorage.getItem('token')
                                                        },
                                                        success: function (response) {
                                                            console.log(response);
                                                            if ($('input[name="imagem"]').val() != "") {
                                                                var data = [];
                                                                var entry;
                                                                if (registerMessage(response, $('#noticia'), "NOTÍCIA", false)) {
                                                                    var arrImagens = $('input[name="imagem"]').val().split(", ");
                                                                    arrImagens = arrImagens.filter(function (value, index, self) {
                                                                        return (self.indexOf(value) == index)
                                                                    });
                                                                    for (var element in arrImagens) {
                                                                        entry = {}
                                                                        entry['idNoticia'] = insertId;
                                                                        entry['idImagem'] = getDataId("imagem", arrImagens[element], "link");
                                                                        data.push(entry);
                                                                    }
                                                                    console.log(data);
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        url: "https://tvgaspar-server.herokuapp.com/createNoticiaImagem",
                                                                        data: {
                                                                            data: data,
                                                                            token: localStorage.getItem('token')
                                                                        },
                                                                        success: function (response) {
                                                                            console.log(response);
                                                                            registerMessage(response, $('#noticia'), "NOTÍCIA", true);
                                                                        },
                                                                        error: function (error) {
                                                                            console.log(error.message);
                                                                            logout('Sessão inválida. Faça o login novamente.');
                                                                        }
                                                                    });
                                                                }
                                                            } else
                                                                registerMessage(response, $('#noticia'), "NOTÍCIA", true);
                                                        },
                                                        error: function (error) {
                                                            console.log(error.message);
                                                            logout('Sessão inválida. Faça o login novamente.');
                                                        }
                                                    });
                                                }
                                            } else
                                                registerMessage(response, $('#noticia'), "NOTÍCIA", true);
                                        },
                                        error: function (error) {
                                            console.log(error.message);
                                            logout('Sessão inválida. Faça o login novamente.');
                                        }
                                    });
                                }
                            },
                            error: function (error) {
                                console.log(error.message);
                                logout('Sessão inválida. Faça o login novamente.');
                            }
                        });
                    }
                },
                error: function (error) {
                    console.log(error.message);
                    logout('Sessão inválida. Faça o login novamente.');
                }
            });
            e.preventDefault();
        }
    });

});