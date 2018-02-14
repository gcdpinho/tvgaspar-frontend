$(function () {
    //Get info usuario
    var usuario = getUsuario();

    //Set aprovacoes (noticias)
    setAprovacoes(false);

    //Show table
    search("aprovacao");

    if (localStorage.getItem('aprovacao').length <= 2) {
        $('.div-table').html("Não há notícias para aprovação.");
        $('.div-table').css('margin-top', '30px');
        $('.page-loader-wrapper').fadeOut();
    }

    //Notification em caso de page reload
    var not = localStorage.getItem('not');
    if (not != null && not != "") {
        showNotification(not, 'success');
        localStorage.setItem('not', "");
    }

    //Aprovação da notícia (update)
    $('.noticia-detail button').click(function () {
        $('.page-loader-wrapper').fadeIn();
        $.ajax({
            type: "POST",
            url: "https://tvgaspar-server.herokuapp.com/updateAprovacao",
            data: {
                id: getDataId("aprovacao", $('input[name="manchete"]').val(), "manchete"),
                aprovacao: 1,
                token: localStorage.getItem('token')
            },
            success: function (response) {
                console.log(response);
                createInsercao(function () {
                    getAllNoticias(true, true);
                }, {
                    campo: "aprovacao"
                });
            },
            error: function (error) {
                console.log(error.message);
                logout('Sessão inválida. Faça o login novamente.');
            }
        });
    });
});