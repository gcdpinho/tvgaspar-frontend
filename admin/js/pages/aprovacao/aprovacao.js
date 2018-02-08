$(function () {
    //Get info usuario
    var usuario = getUsuario();

    //Set aprovacoes (noticias)
    setAprovacoes();

    search("noticia");

    $('.page-loader-wrapper').fadeOut();
});