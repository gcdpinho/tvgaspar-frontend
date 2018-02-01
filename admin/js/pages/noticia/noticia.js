$(function () {
    //$('.page-loader-wrapper').fadeIn();

    //Textare auto growth
    autosize($('textarea.auto-growth'));
    //Datetimepicker plugin
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY - HH:mm',
        lang: "pt-br",
        clearButton: true,
        weekStart: 1,
        cancelText: "Cancelar",
        clearText: "Apagar"
    });

    $('.datetimepicker').on('change', function (e) {
        $('.datetimepicker').parents('.form-line').removeClass('error');
        $('#data-error').css('display', 'none');
    });
    $('#noticia').validate({
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

    $('#noticia').submit(function (e) {
        if ($("#noticia").valid()) {
            console.log("ok");
            e.preventDefault();

        }
    });

});