$(function () {

    //Datetimepicker plugin
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm',
        lang: "pt-br",
        clearButton: true,
        weekStart: 1,
        cancelText: "Cancelar",
        clearText: "Apagar"
    });

    $('.datetimepicker').on('change', function (e) {
        if ($(this).val() == "")
            $(this).parents('.form-line').removeClass('focused');
        else
            $(this).parents('.form-line').addClass('focused');
        $(this).valid();
    });

    //Validation plugin
    $('#noticia').validate({
        rules: {
            tag: {
                invalidTag: true,
                requiredTag: true
            },
            imagem: {
                invalidImagem: true
            },
            video: {
                invalidVideo: true
            },
            categoria: {
                invalidCategoria: true
            }
        },
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
    var dataNoticia = JSON.parse(localStorage.getItem('noticiaEdit'));
    $('input[name="manchete"]').val(dataNoticia.manchete);
    $('input[name="manchete"]').focus();
    $('input[name="subManchete"]').val(dataNoticia.subManchete);
    $('input[name="subManchete"]').focus();
    $('input[name="autor"]').val(dataNoticia.autor);
    $('input[name="autor"]').focus();
    $('input[name="dtCadastro"]').val(Date.parse(dataNoticia.dtCadastro.split('.')[0]).toString("dd/MM/yyyy H:mm"));
    $('input[name="dtCadastro"]').parents('.form-line').addClass('focused');
    $('textarea[name="texto"]').val(dataNoticia.texto);
    //Textare auto growth
    autosize($('textarea.auto-growth'));
    $('textarea[name="texto"]').focus();
    //Get info usuario
    var usuario = getUsuario();

    //Set aprovacoes (noticias)
    setAprovacoes(false);

    $('.page-loader-wrapper').fadeOut();

    //Form Salve
    $('#noticia').submit(function (e) {
        if ($("#noticia").valid()) {
            $('.page-loader-wrapper').fadeIn();
            $.ajax({
                type: "POST",
                url: "https://tvgaspar-server.herokuapp.com/updateNoticia",
                data: {
                    manchete: $('input[name="manchete"]').val(),
                    subManchete: $('input[name="subManchete"]').val(),
                    texto: $('textarea[name="texto"]').val(),
                    autor: $('input[name="autor"]').val(),
                    dtCadastro: $('input[name="dtCadastro"]').val(),
                    id: dataNoticia.id,
                    token: localStorage.getItem('token')
                },
                success: function (response) {
                    console.log(response);

                    localStorage.setItem('noticia', "");
                    localStorage.setItem('not', "NOTICIA editada com sucesso!");

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