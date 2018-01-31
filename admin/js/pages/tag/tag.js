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
            console.log('oi');
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
            $.ajax({
                type: "POST",
                url: "https://tvgaspar-server.herokuapp.com/createTag",
                data: {
                    titulo: $('input[name="tag"]').val(),
                    token: localStorage.getItem('token')
                },
                success: function (response) {
                    console.log(response);
                    sucessMessage(response);
                },
                error: function (error) {
                    console.log(error.message);
                    $('.page-loader-wrapper').fadeOut();
                    showNotification("Erro ao cadastrar TAG, tente novamente", "error");
                }
            });
            e.preventDefault();

        }
    });

});