$(function () {
    //Get info usuario
    var usuario = getUsuario();

    setAprovacoes(false);
    var table = ('.js-basic-example');
    if ($(table).hasClass("noticia"))
        getAllNoticias(false, false);
    else if ($(table).hasClass("publicidade"))
        getAllPublicidades();
    else if ($(table).hasClass("imagem")) {
        //Init Firebase plugin
        initFirebase();
        getAllImagens(true);
    } else if ($(table).hasClass("video"))
        getAllVideos(false, true);
    else if ($(table).hasClass("tag"))
        getAllTags(false, true);
    else if ($(table).hasClass("categoria"))
        getAllCategorias(false, true);

});