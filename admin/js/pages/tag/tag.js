$(function () {
    //$('.page-loader-wrapper').fadeIn();
    $('#tag').validate({
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

    } else {
        localStorage.setItem('msgError', 'Sessão inválida. Faça o login novamente.');
        location.href = "../../pages/examples/sign-in.html";
    }
    $('.page-loader-wrapper').fadeOut();

    $('#tag').submit(function (e) {
        if ($("#tag").valid()) {
            $('.page-loader-wrapper').fadeIn();
            var titulo = $('.body input').val();
            $.ajax({
                type: "POST",
                url: "https://tvgaspar-server.herokuapp.com/createTag",
                data: {
                    titulo: titulo[0].toUpperCase() + titulo.substring(1, titulo.length),
                    token: localStorage.getItem('token')
                },
                success: function (response) {
                    console.log(response);
                    $(titulo).val("");
                    $('.page-loader-wrapper').fadeOut();
                },
                error: function (error) {
                    console.log(error.message);
                    $('.page-loader-wrapper').fadeOut();
                }
            });
            e.preventDefault();
            
        }
    });

});