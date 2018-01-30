$(function () {
    if (performance.navigation.type == 1 && localStorage.getItem('msgError') != "")
        localStorage.setItem('msgError', "");
        

    $('#sign_in').validate({
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.input-group').append(error);
        }
    });


    $('#sign_in').submit(function (e) {
        if ($("#sign_in").valid()) {
            $('.page-loader-wrapper').fadeIn();
            $.ajax({
                type: "POST",
                url: "https://tvgaspar-server.herokuapp.com/login",
                data: {
                    nome: $('input[name="username"]').val(),
                    senha: $('input[name="password"]').val() // TO DO: mandar a senha encriptada?
                },
                success: function (response) {
                    console.log(response.message);
                    if (response.success) {
                        localStorage.setItem('token', response.token);
                        localStorage.setItem('msgError', "");
                        $('.page-loader-wrapper').fadeOut();
                        location.href = "../../index.html";
                    } else
                        $('.page-loader-wrapper').fadeOut();
                },
                error: function (error) {
                    console.log(error);
                    $('.page-loader-wrapper').fadeOut();
                }
            });
            e.preventDefault();
        }
    });

    $(".msgError").html(localStorage.getItem('msgError'));


});