$(function () {
    //Validation plugin
    $('#tag').validate({
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

     //Preenchimento da categoria (edit)
     var dataTag = JSON.parse(localStorage.getItem('tagEdit'));
     $('input[name="tag"]').val(dataTag.titulo);
     $('input[name="tag"]').focus();

    //Get info usuario
    var usuario = getUsuario();

    //Set aprovacoes (noticias)
    setAprovacoes(false);

    $('.page-loader-wrapper').fadeOut();

    //Form Salve
    $('#tag').submit(function (e) {
        if ($("#tag").valid()) {
            $('.page-loader-wrapper').fadeIn();
            $.ajax({
                type: "POST",
                url: "https://tvgaspar-server.herokuapp.com/updateTag",
                data: {
                    titulo: $('input[name="tag"]').val(),
                    id: dataTag.id,
                    token: localStorage.getItem('token')
                },
                success: function (response) {
                    console.log(response);
                    localStorage.setItem('tag', "");
                    localStorage.setItem('not', "TAG editada com sucesso!");

                    location.href = "listar.html";
                },
                error: function (error) {
                    console.log(error.message);
                    logout('Sessão inválida. Faça o login novamente.');
                }
            });
            e.preventDefault();
        }
    });

});