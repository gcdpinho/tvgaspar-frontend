$(function () {

    $('#imagem').validate({
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

    $('#imagem').submit(function(e){
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
                    $('input').each(function(index){
                        $(this).val("");
                        $(this).parents('.form-line').removeClass("focused");
                    });
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
