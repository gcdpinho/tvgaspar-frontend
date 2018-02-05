$(function () {

    $('#publicidade').validate({
        rules: {
            imagem: {
                invalidImagem: true
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

    getAllImagens();

    $('.div-search-button button').click(function () {
        search("imagem");
    });

    $('#publicidade').submit(function (e) {
        if ($("#publicidade").valid()) {
            $('.page-loader-wrapper').fadeIn();
            $.ajax({
                type: "POST",
                url: "https://tvgaspar-server.herokuapp.com/createPublicidade",
                data: {
                    titulo: $('input[name="titulo"]').val(),
                    tipo: $('input[name="tipo"]').val(),
                    texto: $('input[name="texto"]').val(),
                    link: $('input[name="link"]').val(),
                    flgAtivo: 1,
                    idImagem: getDataId("imagem", $('input[name="imagem"]').val(), 4),
                    token: localStorage.getItem('token')
                },
                success: function (response) {
                    console.log(response);
                    registerMessage(response, $('#publicidade'), "PUBLICIDADE", true);
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