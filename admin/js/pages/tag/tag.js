$(function () {
    //$('.page-loader-wrapper').fadeIn();

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
