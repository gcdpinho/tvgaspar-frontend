$(function () {
    var dropify = $('.dropify').dropify({
        messages: {
            'default': 'Arraste ou clique para selecionar um arquivo',
            'replace': 'Arraste ou clique para substituir o arquivo',
            'remove': 'Remover',
            'error': 'Erro, tente novamente'
        }
    });

    dropify.on('dropify.afterClear', function (event, element) {
        $(this).parents(".form-line").removeClass("focused");

    });

    $(".dropify-wrapper").on('change', function () {
        $('.dropify').focus();
        $(this).parents(".form-line").removeClass("error");
        $(this).parents(".form-group").find("label.error").css("display", "none");
    });

    $.validator.addMethod("requiredImage", function (value, element, config) {
        return $('.dropify-wrapper').hasClass('has-preview');
    }, "Preencha esse campo.");

    firebase.initializeApp({
        apiKey: "AIzaSyAN8z_RHWKICWDl-QQ5cAQ8b1LvIWfrvOw",
        authDomain: "tvgaspar-backend.firebaseapp.com",
        databaseURL: "https://tvgaspar-backend.firebaseio.com",
        projectId: "tvgaspar-backend",
        storageBucket: "tvgaspar-backend.appspot.com",
        messagingSenderId: "702505431041"
    });

    $('#imagem').validate({
        rules: {
            tag: {
                invalidTag: true,
                requiredTag: true
            },
            link: {
                requiredImage: true
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
    var usuario = localStorage.getItem('usuario');
    if (usuario != null && usuario != "") {
        usuario = usuario.replace(/\"|\{|\}/g, '').replace(/,/g, ':').split(":");
        $('.name').html(findAttribute("nome", usuario));
        $('.email').html(findAttribute("email", usuario));

    } else {
        logout('Sessão inválida. Faça o login novamente.');
    }

    getAllTags();

    $('.div-search-button button').click(function () {
        search("tag");
    });

    $('#imagem').submit(function (e) {
        if ($("#imagem").valid()) {
            $('.page-loader-wrapper').fadeIn();
            var file = $('input[name="link"]').prop('files')[0];
            $.ajax({
                type: "POST",
                url: "https://tvgaspar-server.herokuapp.com/createImagem",
                data: {
                    titulo: $('input[name="titulo"]').val(),
                    link: file.name,
                    token: localStorage.getItem('token')
                },
                success: function (response) {
                    console.log(response);
                    var data = [];
                    var entry;
                    if (registerMessage(response, $('#imagem'), "IMAGEM", false)) {
                        $('.label-info.success').each(function () {
                            entry = {}
                            entry['idImagem'] = response.insertId;
                            entry['idTag'] = getDataId("tag", $(this).text(), 2);
                            data.push(entry);
                        });
                        console.log(data);
                        $.ajax({
                            type: "POST",
                            url: "https://tvgaspar-server.herokuapp.com/createImagemTag",
                            data: {
                                data: data,
                                token: localStorage.getItem('token')
                            },
                            success: function (response) {
                                console.log(response);       
                                var storageRef = firebase.storage().ref();
                            
                                storageRef.child('imagens/' + file.name).put(file).then(function (snapshot) {
                                    registerMessage(response, $('#imagem'), "IMAGEM", true);
                                }, function(error){
                                    console.log(error);
                                    showNotification("Erro ao cadastrar IMAGEM, tente novamente.", "error");
                                });
                            },
                            error: function (error) {
                                console.log(error.message);
                                logout('Sessão inválida. Faça o login novamente.');
                            }
                        });
                    }
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