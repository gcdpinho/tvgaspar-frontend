$(function () {
    //Get info usuario
    var usuario = getUsuario();

    //Set aprovacoes (noticias)
    setAprovacoes(false);

    search("noticia");
    
    var not = localStorage.getItem('not');
    if (not != null && not != ""){
        showNotification(not, 'success');
        localStorage.setItem('not', "");
    }

    $('.page-loader-wrapper').fadeOut();

    $('.noticia-detail button').click(function () {
        $('.page-loader-wrapper').fadeIn();
        $.ajax({
            type: "POST",
            url: "https://tvgaspar-server.herokuapp.com/updateAprovacao",
            data: {
                id: getDataId("noticia", $('input[name="manchete"]').val(), 2),
                aprovacao: 1,
                token: localStorage.getItem('token')
            },
            success: function (response) {
                console.log(response);
                getAllNoticias(true);
            },
            error: function (error) {
                console.log(error.message);
                logout('Sessão inválida. Faça o login novamente.');
            }
        });
    });
});