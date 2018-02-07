$(function () {

    $('#video').validate({
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
    var usuario = localStorage.getItem('usuario').replace(/\"|\{|\}/g, '').replace(/,/g, ':').split(":");
    if (usuario != null && usuario != "") {
        $('.name').html(findAttribute("nome", usuario));
        $('.email').html(findAttribute("email", usuario));

    } else
        logout('Sessão inválida. Faça o login novamente.');

    getAllTags(true);

    $('.div-search-button button').click(function () {
        search("tag");
    });

    $('#video').submit(function (e) {
        if ($("#video").valid()) {
            $('.page-loader-wrapper').fadeIn();
            $.ajax({
                type: "POST",
                url: "https://tvgaspar-server.herokuapp.com/createVideo",
                data: {
                    titulo: $('input[name="titulo"]').val(),
                    texto: $('input[name="texto"]').val(),
                    link: $('input[name="link"]').val(),
                    token: localStorage.getItem('token')
                },
                success: function (response) {
                    console.log(response);
                    var data = [];
                    var entry;
                    if (registerMessage(response, $('#video'), "VÍDEO", false)) {
                        $('.label-info.success').each(function () {
                            entry = {}
                            entry['idVideo'] = response.insertId;
                            entry['idTag'] = getDataId("tag", $(this).text(), 2);
                            data.push(entry);
                        });
                        console.log(data);
                        $.ajax({
                            type: "POST",
                            url: "https://tvgaspar-server.herokuapp.com/createVideoTag",
                            data: {
                                data: data,
                                token: localStorage.getItem('token')
                            },
                            success: function (response) {
                                console.log(response);
                                registerMessage(response, $('#video'), "VÍDEO", true);
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