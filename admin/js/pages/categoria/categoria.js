$(function () {

    $('#categoria').validate({
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
        logout('Sessão inválida. Faça o login novamente.');
    }
    $('.page-loader-wrapper').fadeOut();

    $('#categoria').submit(function(e){
        if ($("#categoria").valid()) {
            $('.page-loader-wrapper').fadeIn();
            $.ajax({
                type: "POST",
                url: "https://tvgaspar-server.herokuapp.com/createCategoria",
                data: {
                    titulo: $('input[name="titulo"]').val(),
                    texto: $('input[name="texto"]').val(),
                    cor:  $('input[name="cor"]').val(),
                    token: localStorage.getItem('token')
                },
                success: function (response) {
                    console.log(response);
                    registerMessage(response, $('#categoria'), "CATEGORIA");
                },
                error: function (error) {
                    console.log(error.message);
                    $('.page-loader-wrapper').fadeOut();
                    showNotification("Erro ao cadastrar CATEGORIA, tente novamente", "error");
                }
            });
            e.preventDefault(); 
        }
    });
});
