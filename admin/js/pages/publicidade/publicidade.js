$(function () {

    $('#publicidade').validate({
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
});
