$(function () {
    $('#imagem').validate({
        rules: {
            tag: {
                invalidTag: true,
                requiredTag: true
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
    var usuario = localStorage.getItem('usuario');
    if (usuario != null && usuario != "") {
        usuario = usuario.replace(/\"|\{|\}/g, '').replace(/,/g, ':').split(":");
        $('.name').html(findAttribute("nome", usuario));
        $('.email').html(findAttribute("email", usuario));

    } else {
        logout('Sessão inválida. Faça o login novamente.');
    }

    getAllTags();

    $('.div-search-button button').click(function () {
        search("tag");
    });

    $('#imagem').submit(function (e) {
        if ($("#imagem").valid()) {
            $('.page-loader-wrapper').fadeIn();
            $.ajax({
                type: "POST",
                url: "https://tvgaspar-server.herokuapp.com/createImagem",
                data: {
                    titulo: $('input[name="titulo"]').val(),
                    link: $('input[name="link"]').val(),
                    token: localStorage.getItem('token')
                },
                success: function (response) {
                    console.log(response);
                    var data = [];
                    var entry;
                    if (registerMessage(response, $('#imagem'), "IMAGEM", false)) {
                        $('.label-info.success').each(function () {
                            entry = {}
                            entry['idImagem'] = response.insertId;
                            entry['idTag'] = getDataId("tag", $(this).text(), 2);
                            data.push(entry);
                        });
                        console.log(data);
                        $.ajax({
                            type: "POST",
                            url: "https://tvgaspar-server.herokuapp.com/createImagemTag",
                            data: {
                                data: data,
                                token: localStorage.getItem('token')
                            },
                            success: function (response) {
                                console.log(response);
                                registerMessage(response, $('#imagem'), "IMAGEM", true);
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