if (typeof jQuery === "undefined") {
    throw new Error("jQuery plugins need to be before this file");
}

$.AdminBSB = {};
$.AdminBSB.options = {
    colors: {
        red: '#F44336',
        pink: '#E91E63',
        purple: '#9C27B0',
        deepPurple: '#673AB7',
        indigo: '#3F51B5',
        blue: '#2196F3',
        lightBlue: '#03A9F4',
        cyan: '#00BCD4',
        teal: '#009688',
        green: '#4CAF50',
        lightGreen: '#8BC34A',
        lime: '#CDDC39',
        yellow: '#ffe821',
        amber: '#FFC107',
        orange: '#FF9800',
        deepOrange: '#FF5722',
        brown: '#795548',
        grey: '#9E9E9E',
        blueGrey: '#607D8B',
        black: '#000000',
        white: '#ffffff'
    },
    leftSideBar: {
        scrollColor: 'rgba(0,0,0,0.5)',
        scrollWidth: '4px',
        scrollAlwaysVisible: false,
        scrollBorderRadius: '0',
        scrollRailBorderRadius: '0',
        scrollActiveItemWhenPageLoad: true,
        breakpointWidth: 1170
    },
    dropdownMenu: {
        effectIn: 'fadeIn',
        effectOut: 'fadeOut'
    }
}

/* Left Sidebar - Function =================================================================================================
 *  You can manage the left sidebar menu options
 *  
 */
$.AdminBSB.leftSideBar = {
    activate: function () {
        var _this = this;
        var $body = $('body');
        var $overlay = $('.overlay');

        //Close sidebar
        $(window).click(function (e) {
            var $target = $(e.target);
            if (e.target.nodeName.toLowerCase() === 'i') {
                $target = $(e.target).parent();
            }

            if (!$target.hasClass('bars') && _this.isOpen() && $target.parents('#leftsidebar').length === 0) {
                if (!$target.hasClass('js-right-sidebar')) $overlay.fadeOut();
                $body.removeClass('overlay-open');
            }
        });

        $.each($('.menu-toggle.toggled'), function (i, val) {
            $(val).next().slideToggle(0);
        });

        //When page load
        $.each($('.menu .list li.active'), function (i, val) {
            var $activeAnchors = $(val).find('a:eq(0)');

            $activeAnchors.addClass('toggled');
            $activeAnchors.next().show();
        });

        //Collapse or Expand Menu
        $('.menu-toggle').on('click', function (e) {
            var $this = $(this);
            var $content = $this.next();

            if ($($this.parents('ul')[0]).hasClass('list')) {
                var $not = $(e.target).hasClass('menu-toggle') ? e.target : $(e.target).parents('.menu-toggle');

                $.each($('.menu-toggle.toggled').not($not).next(), function (i, val) {
                    if ($(val).is(':visible')) {
                        $(val).prev().toggleClass('toggled');
                        $(val).slideUp();
                    }
                });
            }

            $this.toggleClass('toggled');
            $content.slideToggle(320);
        });

        //Set menu height
        _this.setMenuHeight();
        _this.checkStatuForResize(true);
        $(window).resize(function () {
            _this.setMenuHeight();
            _this.checkStatuForResize(false);
        });

        //Set Waves
        Waves.attach('.menu .list a', ['waves-block']);
        Waves.init();
    },
    setMenuHeight: function (isFirstTime) {
        if (typeof $.fn.slimScroll != 'undefined') {
            var configs = $.AdminBSB.options.leftSideBar;
            var height = ($(window).height() - ($('.legal').outerHeight() + $('.user-info').outerHeight() + $('.navbar').innerHeight()));
            var $el = $('.list');

            $el.slimscroll({
                height: height + "px",
                color: configs.scrollColor,
                size: configs.scrollWidth,
                alwaysVisible: configs.scrollAlwaysVisible,
                borderRadius: configs.scrollBorderRadius,
                railBorderRadius: configs.scrollRailBorderRadius
            });

            //Scroll active menu item when page load, if option set = true
            if ($.AdminBSB.options.leftSideBar.scrollActiveItemWhenPageLoad) {
                var activeItemOffsetTop = $('.menu .list li.active')[0].offsetTop
                if (activeItemOffsetTop > 150) $el.slimscroll({
                    scrollTo: activeItemOffsetTop + 'px'
                });
            }
        }
    },
    checkStatuForResize: function (firstTime) {
        var $body = $('body');
        var $openCloseBar = $('.navbar .navbar-header .bars');
        var width = $body.width();

        if (firstTime) {
            $body.find('.content, .sidebar').addClass('no-animate').delay(1000).queue(function () {
                $(this).removeClass('no-animate').dequeue();
            });
        }

        if (width < $.AdminBSB.options.leftSideBar.breakpointWidth) {
            $body.addClass('ls-closed');
            $openCloseBar.fadeIn();
        } else {
            $body.removeClass('ls-closed');
            $openCloseBar.fadeOut();
        }
    },
    isOpen: function () {
        return $('body').hasClass('overlay-open');
    }
};
//==========================================================================================================================

/* Right Sidebar - Function ================================================================================================
 *  You can manage the right sidebar menu options
 *  
 */
$.AdminBSB.rightSideBar = {
    activate: function () {
        var _this = this;
        var $sidebar = $('#rightsidebar');
        var $overlay = $('.overlay');

        //Close sidebar
        $(window).click(function (e) {
            var $target = $(e.target);
            if (e.target.nodeName.toLowerCase() === 'i') {
                $target = $(e.target).parent();
            }

            if (!$target.hasClass('js-right-sidebar') && _this.isOpen() && $target.parents('#rightsidebar').length === 0) {
                if (!$target.hasClass('bars')) $overlay.fadeOut();
                $sidebar.removeClass('open');
            }
        });

        $('.js-right-sidebar').on('click', function () {
            $sidebar.toggleClass('open');
            if (_this.isOpen()) {
                $overlay.fadeIn();
            } else {
                $overlay.fadeOut();
            }
        });
    },
    isOpen: function () {
        return $('.right-sidebar').hasClass('open');
    }
}
//==========================================================================================================================

/* Searchbar - Function ================================================================================================
 *  You can manage the search bar
 *  
 */
var $searchBar = $('.search-bar');
$.AdminBSB.search = {
    activate: function () {
        var _this = this;

        //Search button click event
        $('.js-search').on('click', function () {
            _this.showSearchBar();
        });

        //Close search click event
        $searchBar.find('.close-search').on('click', function () {
            _this.hideSearchBar();
        });

        //ESC key on pressed
        $searchBar.find('input[type="text"]').on('keyup', function (e) {
            if (e.keyCode == 27) {
                _this.hideSearchBar();
            }
        });
    },
    showSearchBar: function () {
        $searchBar.addClass('open');
        $searchBar.find('input[type="text"]').focus();
    },
    hideSearchBar: function () {
        $searchBar.removeClass('open');
        $searchBar.find('input[type="text"]').val('');
    }
}
//==========================================================================================================================

/* Navbar - Function =======================================================================================================
 *  You can manage the navbar
 *  
 */
$.AdminBSB.navbar = {
    activate: function () {
        var $body = $('body');
        var $overlay = $('.overlay');

        //Open left sidebar panel
        $('.bars').on('click', function () {
            $body.toggleClass('overlay-open');
            if ($body.hasClass('overlay-open')) {
                $overlay.fadeIn();
            } else {
                $overlay.fadeOut();
            }
        });

        //Close collapse bar on click event
        $('.nav [data-close="true"]').on('click', function () {
            var isVisible = $('.navbar-toggle').is(':visible');
            var $navbarCollapse = $('.navbar-collapse');

            if (isVisible) {
                $navbarCollapse.slideUp(function () {
                    $navbarCollapse.removeClass('in').removeAttr('style');
                });
            }
        });
    }
}
//==========================================================================================================================

/* Input - Function ========================================================================================================
 *  You can manage the inputs(also textareas) with name of class 'form-control'
 *  
 */
$.AdminBSB.input = {
    activate: function () {
        //On focus event
        $('.form-control').focus(function () {
            $(this).parents('.form-line').addClass('focused');
        });

        //On focusout event
        $('.form-control').focusout(function () {
            var $this = $(this);
            if ($this.parents('.form-group').hasClass('form-float')) {
                if (($this.val() == '' && $this.prop('files') == null) || ($this.prop('files') != null && $this.prop('files').length <= 0)) {
                    $this.parents('.form-line').removeClass('focused');
                }
            } else {
                $this.parents('.form-line').removeClass('focused');
            }
        });

        //On label click
        $('body').on('click', '.form-float .form-line .form-label', function () {
            $(this).parent().find('input').focus();
        });

        //Not blank form
        $('.form-control').each(function () {
            if ($(this).val() !== '') {
                $(this).parents('.form-line').addClass('focused');
            }
        });
    }
}
//==========================================================================================================================

/* Form - Select - Function ================================================================================================
 *  You can manage the 'select' of form elements
 *  
 */
$.AdminBSB.select = {
    activate: function () {
        if ($.fn.selectpicker) {
            $('select:not(.ms)').selectpicker();
        }
    }
}
//==========================================================================================================================

/* DropdownMenu - Function =================================================================================================
 *  You can manage the dropdown menu
 *  
 */

$.AdminBSB.dropdownMenu = {
    activate: function () {
        var _this = this;

        $('.dropdown, .dropup, .btn-group').on({
            "show.bs.dropdown": function () {
                var dropdown = _this.dropdownEffect(this);
                _this.dropdownEffectStart(dropdown, dropdown.effectIn);
            },
            "shown.bs.dropdown": function () {
                var dropdown = _this.dropdownEffect(this);
                if (dropdown.effectIn && dropdown.effectOut) {
                    _this.dropdownEffectEnd(dropdown, function () {});
                }
            },
            "hide.bs.dropdown": function (e) {
                var dropdown = _this.dropdownEffect(this);
                if (dropdown.effectOut) {
                    e.preventDefault();
                    _this.dropdownEffectStart(dropdown, dropdown.effectOut);
                    _this.dropdownEffectEnd(dropdown, function () {
                        dropdown.dropdown.removeClass('open');
                    });
                }
            }
        });

        //Set Waves
        Waves.attach('.dropdown-menu li a', ['waves-block']);
        Waves.init();
    },
    dropdownEffect: function (target) {
        var effectIn = $.AdminBSB.options.dropdownMenu.effectIn,
            effectOut = $.AdminBSB.options.dropdownMenu.effectOut;
        var dropdown = $(target),
            dropdownMenu = $('.dropdown-menu', target);

        if (dropdown.length > 0) {
            var udEffectIn = dropdown.data('effect-in');
            var udEffectOut = dropdown.data('effect-out');
            if (udEffectIn !== undefined) {
                effectIn = udEffectIn;
            }
            if (udEffectOut !== undefined) {
                effectOut = udEffectOut;
            }
        }

        return {
            target: target,
            dropdown: dropdown,
            dropdownMenu: dropdownMenu,
            effectIn: effectIn,
            effectOut: effectOut
        };
    },
    dropdownEffectStart: function (data, effectToStart) {
        if (effectToStart) {
            data.dropdown.addClass('dropdown-animating');
            data.dropdownMenu.addClass('animated dropdown-animated');
            data.dropdownMenu.addClass(effectToStart);
        }
    },
    dropdownEffectEnd: function (data, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        data.dropdown.one(animationEnd, function () {
            data.dropdown.removeClass('dropdown-animating');
            data.dropdownMenu.removeClass('animated dropdown-animated');
            data.dropdownMenu.removeClass(data.effectIn);
            data.dropdownMenu.removeClass(data.effectOut);

            if (typeof callback == 'function') {
                callback();
            }
        });
    }
}
//==========================================================================================================================

/* Browser - Function ======================================================================================================
 *  You can manage browser
 *  
 */
var edge = 'Microsoft Edge';
var ie10 = 'Internet Explorer 10';
var ie11 = 'Internet Explorer 11';
var opera = 'Opera';
var firefox = 'Mozilla Firefox';
var chrome = 'Google Chrome';
var safari = 'Safari';

$.AdminBSB.browser = {
    activate: function () {
        var _this = this;
        var className = _this.getClassName();

        if (className !== '') $('html').addClass(_this.getClassName());
    },
    getBrowser: function () {
        var userAgent = navigator.userAgent.toLowerCase();

        if (/edge/i.test(userAgent)) {
            return edge;
        } else if (/rv:11/i.test(userAgent)) {
            return ie11;
        } else if (/msie 10/i.test(userAgent)) {
            return ie10;
        } else if (/opr/i.test(userAgent)) {
            return opera;
        } else if (/chrome/i.test(userAgent)) {
            return chrome;
        } else if (/firefox/i.test(userAgent)) {
            return firefox;
        } else if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
            return safari;
        }

        return undefined;
    },
    getClassName: function () {
        var browser = this.getBrowser();

        if (browser === edge) {
            return 'edge';
        } else if (browser === ie11) {
            return 'ie11';
        } else if (browser === ie10) {
            return 'ie10';
        } else if (browser === opera) {
            return 'opera';
        } else if (browser === chrome) {
            return 'chrome';
        } else if (browser === firefox) {
            return 'firefox';
        } else if (browser === safari) {
            return 'safari';
        } else {
            return '';
        }
    }
}
//==========================================================================================================================

$(function () {
    $.AdminBSB.browser.activate();
    $.AdminBSB.leftSideBar.activate();
    $.AdminBSB.rightSideBar.activate();
    $.AdminBSB.navbar.activate();
    $.AdminBSB.dropdownMenu.activate();
    $.AdminBSB.input.activate();
    $.AdminBSB.select.activate();
    $.AdminBSB.search.activate();
});


/* CUSTOM SCRIPTS GLOBAIS */

//Função de logout do sistema
var logout = function (msgError) {
    console.log(msgError);
    localStorage.setItem('token', "");
    localStorage.setItem('usuario', "");
    localStorage.setItem('tag', "");
    localStorage.setItem('imagem', "");
    localStorage.setItem('video', "");
    localStorage.setItem('categoria', "");
    localStorage.setItem('noticia', "");
    localStorage.setItem('aprovacao', "");
    localStorage.setItem('not', "");
    if (typeof msgError == "object")
        localStorage.setItem('msgError', "");
    else
        localStorage.setItem('msgError', msgError);

    var path = location.pathname;
    if (path.indexOf('pages') >= 0)
        location.href = "../examples/sign-in.html";
    else
        location.href = "pages/examples/sign-in.html"
}

$('#logout').click(logout);

//Preencher com as informações do usuário
var findAttribute = function (attribute, data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i] == attribute)
            return data[i + 1];
    }

    return -1;
}

//Notificação de sucesso ou erro
var showNotification = function (text, state) {
    var color = "bg-green";
    if (state == "error")
        color = "bg-red";

    $.notify({
        message: text
    }, {
        type: color,
        allow_dismiss: true,
        newest_on_top: true,
        timer: 1000,
        placement: {
            from: "top",
            align: "center"
        },
        animate: {
            enter: "animated fadeInDown",
            exit: "animated fadeOutUp"
        },
        template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (true ? "p-r-35" : "") + '" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
    });
}

//Teste de sucesso para elementos cadastrados
var registerMessage = function (response, form, text, notification) {
    if (response.sqlMessage) {
        if (response.sqlMessage.indexOf("Duplicate") >= 0) {
            var entry = response.sqlMessage.split('\'')[1].replace('\'', '');
            var name;
            $('.form-control').each(function (index) {
                if ($(this).val() == entry) {
                    name = $(this).attr("name");
                    return;
                }
            });
            var error = {};
            error[name] = name.toUpperCase() + " já cadastrado";
            $(form).validate().showErrors(error);
            $('.page-loader-wrapper').fadeOut();

            return false;
        }
        else
        if (response.sqlMessage.indexOf("foreign key") >= 0) {
            showNotification("Não é possível excluir esta " + text + ".", "error");
            $('.page-loader-wrapper').fadeOut();
        }
        else {
            showNotification("Erro ao cadastrar " + text + ", tente novamente.", "error");
            $('.page-loader-wrapper').fadeOut();
        }
    } else
    if (notification) {
        $('.form-control').each(function (index) {
            $(this).val("");
            $(this).parents('.form-line').removeClass("focused");
            $(this).parents('.bootstrap-tagsinput').find('span').each(function (index) {
                $(this).find('span[data-role="remove"]').click();
            });
            if ($(this).parents('.dropify-clear'))
                $('.dropify-clear').click();
        });

        $('.page-loader-wrapper').fadeOut();

        showNotification(text + " cadastrada com sucesso!", "success");
    }

    return true;
}

//Get todas as tags
var getAllTags = async function (close, listar) {
    $.validator.addMethod("invalidTag", function (value, element, config) {
        return $('.label-info.error').length > 0 ? false : true;
    }, "Existem TAGS não cadastradas.");

    $.validator.addMethod("requiredTag", function (value, element, config) {
        return $('.label-info').length > 0 ? true : false;
    }, "Preencha esse campo.");

    $(".bootstrap-tagsinput").find('input').focus(function () {
        $(this).parents(".form-line").addClass("focused");
    });

    $(".bootstrap-tagsinput").find('input').focusout(function () {
        if ($(this).parents(".bootstrap-tagsinput").find('span').length <= 0)
            $(this).parents(".form-line").removeClass("focused");
        $(this).parents(".form-line").removeClass("error");
    });

    $('.bootstrap-tagsinput').find('input').addClass('form-control');
    $('.bootstrap-tagsinput').find('input').attr('name', 'tag');

    var tags = localStorage.getItem("tag");
    if (tags == null || tags == "") {
        $.ajax({
            type: "POST",
            url: "https://tvgaspar-server.herokuapp.com/getAllTags",
            data: {
                token: localStorage.getItem('token')
            },
            success: function (response) {
                console.log(response);
                var tags = [];
                $(response).each(function (index) {
                    tags.push($(this)[0]);
                });
                localStorage.setItem("tag", JSON.stringify(tags));
                if (listar)
                    search("tag");
                else
                if (close)
                    $('.page-loader-wrapper').fadeOut();
                else
                    getAllVideos(false, false);
            },
            error: function (error) {
                console.log(error.message);
                logout('Sessão inválida. Faça o login novamente.');
            }
        });
    } else
    if (listar)
        search("tag");
    else
    if (close)
        $('.page-loader-wrapper').fadeOut();
    else
        getAllVideos(false, false);
}

//Get todas imagens
var getAllImagens = async function (listar) {
    $.validator.addMethod("invalidImagem", function (value, element, config) {
        if (value == "")
            return true;
        else {
            var imagens = value.split(", ");
            for (var element in imagens)
                if (getDataId("imagem", imagens[element], 4) == undefined)
                    return false;

            return true;
        }
    }, "Existem IMAGENS não cadastradas.");

    var imagens = localStorage.getItem("imagem");
    if (imagens == null || imagens == "") {
        $.ajax({
            type: "POST",
            url: "https://tvgaspar-server.herokuapp.com/getAllImagens",
            data: {
                token: localStorage.getItem('token')
            },
            success: function (response) {
                console.log(response);
                var imagens = [];
                $(response).each(function (index) {
                    imagens.push($(this)[0]);
                });
                localStorage.setItem("imagem", JSON.stringify(imagens));
                if (listar)
                    search("imagem");
                else
                    $('.page-loader-wrapper').fadeOut();
            },
            error: function (error) {
                console.log(error.message);
                logout('Sessão inválida. Faça o login novamente.');
            }
        });
    } else
    if (listar)
        search("imagem");
    else {
        $('.page-loader-wrapper').fadeOut();
    }
}

//Get todos os vídeos
var getAllVideos = async function (close, listar) {
    $.validator.addMethod("invalidVideo", function (value, element, config) {
        if (value == "")
            return true;
        else {
            var videos = value.split(", ");
            for (var element in videos)
                if (getDataId("video", videos[element], 6) == undefined)
                    return false;

            return true;
        }
    }, "Existem VÍDEOS não cadastradas.");

    var videos = localStorage.getItem("video");
    if (videos == null || videos == "") {
        $.ajax({
            type: "POST",
            url: "https://tvgaspar-server.herokuapp.com/getAllVideos",
            data: {
                token: localStorage.getItem('token')
            },
            success: function (response) {
                console.log(response);
                var videos = [];
                $(response).each(function (index) {
                    videos.push($(this)[0]);
                });
                localStorage.setItem("video", JSON.stringify(videos));
                if (listar)
                    search("video");
                else
                if (close)
                    $('.page-loader-wrapper').fadeOut();
                else
                    getAllCategorias(false, false);
            },
            error: function (error) {
                console.log(error.message);
                logout('Sessão inválida. Faça o login novamente.');
            }
        });
    } else
    if (listar)
        search("video");
    else
    if (close)
        $('.page-loader-wrapper').fadeOut();
    else
        getAllCategorias(false, false);
}

//Get todas as categorias
var getAllCategorias = async function (close, listar) {
    $.validator.addMethod("invalidCategoria", function (value, element, config) {
        if (value == "")
            return true;
        else {
            var categorias = value.split(", ");
            for (var element in categorias)
                if (getDataId("categoria", categorias[element], 2) == undefined)
                    return false;

            return true;
        }
    }, "Existem CATEGORIAS não cadastradas.");

    var categorias = localStorage.getItem("categoria");
    if (categorias == null || categorias == "") {
        $.ajax({
            type: "POST",
            url: "https://tvgaspar-server.herokuapp.com/getAllCategorias",
            data: {
                token: localStorage.getItem('token')
            },
            success: function (response) {
                console.log(response);
                var categorias = [];
                $(response).each(function (index) {
                    categorias.push($(this)[0]);
                });
                localStorage.setItem("categoria", JSON.stringify(categorias));
                if (listar)
                    search("categoria");
                else
                if (close)
                    $('.page-loader-wrapper').fadeOut();
                else
                    getAllImagens(false);
            },
            error: function (error) {
                console.log(error.message);
                logout('Sessão inválida. Faça o login novamente.');
            }
        });
    } else
    if (listar)
        search("categoria");
    else
    if (close)
        $('.page-loader-wrapper').fadeOut();
    else
        getAllImagens(false);
}

//Get data(localStorage) by param 
var getData = function (data) {
    var datas = localStorage.getItem(data);
    datas = datas.replace(/\"|\}|\]/g, "").replace(/,/g, ":").split(":");
    var arrData = []
    for (var i = 3; i < datas.length; i += 4)
        arrData.push(datas[i]);

    return arrData;
}

//Get id (para inserção) by params
var getDataId = function (data, element, diff) {
    var datas = localStorage.getItem(data);
    datas = datas.replace(/\"|\}|\]/g, "").replace(/,/g, ":").split(":");
    for (var i = 0; i < datas.length; i++)
        if (element == datas[i]) {
            return parseInt(datas[i - diff]) || undefined;
        }
}

//Abre o modal com a tabela (param)
var search = async function (params) {
    if ($('.js-basic-example.' + params).find('td').length <= 0) {
        $('.page-loader-wrapper').fadeIn();
        var list = localStorage.getItem(params).replace(/\[|\{|\"|\]/g, "").split("}");
        for (var i = 0; i < list.length; i++) {
            if (list[i][0] == ",")
                list[i] = list[i].replace(",", "");
        }
        var colunas = [];
        var coluna = {};
        var data = [];
        var imagens = []
        for (var j = 0; j < list.length; j++) {
            var row = [];

            var linha = list[j].split(",");
            for (var element in linha)
                linha[element] = linha[element].replace(":", ",");
            var newline = [];
            for (var e in linha) {
                linha[e].split(',').forEach(function (element, index, array) {
                    newline.push(element)
                });
            }
            linha = newline;
            if (j == 0) {
                for (var i = 0; i < linha.length; i += 2) {
                    coluna = {};
                    coluna["title"] = linha[i].toUpperCase();
                    colunas.push(coluna);
                }
                colunas.shift();
                if (params == "noticia" || params == "aprovacao") {
                    colunas.pop();
                    colunas.pop();
                    colunas.pop();
                } else if (params == "publicidade") {
                    colunas.pop();
                    colunas.pop();
                }
                if ($('.js-basic-example.' + params).attr("value") == "listar")
                    colunas.push({
                        title: "Ações".toUpperCase()
                    });
            }
            for (var i = 1; i < linha.length; i += 2)
                if ($('.js-basic-example.' + params).attr("value") == "listar") {
                    if (params != "imagem")
                        row.push("<input class='dataTableEdit' type='text' value='" + linha[i] + "' disabled>");
                    else
                    if (i != 5)
                        row.push("<input class='dataTableEdit' type='text' value='" + linha[i] + "' disabled>");
                    else
                        row.push(linha[i]);
                }
            else
                row.push(linha[i]);
            if (row.length > 0) {
                row.shift();
                if (params == "noticia" || params == "aprovacao") {
                    row.pop();
                    row.pop();
                    row.pop();
                } else if (params == "publicidade") {
                    row.pop();
                    row.pop();
                }
                if (params == "imagem")
                    imagens.push(row[row.length - 1]);
                if ($('.js-basic-example.' + params).attr("value") == "listar")
                    row.push(
                        '<i class="material-icons">edit</i>' +
                        '<i class="material-icons ml-20px">delete</i>'
                    );

                data.push(row);
            }
        }
        var urls = await getUrls(imagens);
        var pos = $('.js-basic-example.' + params).attr("value") == "listar" ? 2 : 1;
        for (url in urls)
            data[url][data[url].length - pos] = "<img class='img-preview' src='" + urls[url] + "'>" + data[url][data[url].length - pos];

        if (data.length > 0)
            tableFunction(data, colunas, params);

    } else {
        $('.background-table').fadeIn();
        $('.js-basic-example.' + params).parents('.table-responsive').fadeIn();
    }
}

//Get URL da imagem Firebase
var getUrls = async function (arrayDeImagens) {
    return Promise.all(arrayDeImagens.map(async nome =>
        await firebase.storage().ref().child('imagens/' + nome).getDownloadURL()
    )).then();
}

var acentuacaoTable = function (table) {
    switch (table) {
        case "aprovacao":
            return "aprovação";
            break;
        case "noticia":
            return "notícia";
            break;
        case "video":
            return "vídeo";
            break;
        default:
            return table;
            break;
    }
}

//Incializa a tabela by params
var dataTableParam; //Variável de controle para limpeza de campos em outra função fora
var dataTableArr = [];
var tableFunction = function (data, colunas, params) {
    dataTableParam = params;
    var table = $('.js-basic-example.' + params).DataTable({
        data: data,
        columns: colunas,
        responsive: true,
        bLengthChange: false,
        bDestroy: true,
        pageLength: 10,
        language: {
            zeroRecords: "Nenhum registro encontrado",
            info: "Exibindo _START_ a _END_ de _TOTAL_ registros",
            infoEmpty: "Exibindo 0 a 0 de 0 registros",
            infoFiltered: "",
            search: "",
            searchPlaceholder: "Pesquisar " + acentuacaoTable(params),
            paginate: {
                "next": "Próximo",
                "previous": "Anterior"
            },
        }
    });

    if (params != "aprovacao") {
        $('.js-basic-example.' + params).parents('.table-responsive').css('top', $(window).height() / 2 - $('.js-basic-example.' + params).parents('.table-responsive').height() / 2 - 100);
        $('.js-basic-example.' + params).parents('.table-responsive').css('left', ($(window).width() + $('#leftsidebar').width()) / 2 - $('.js-basic-example.' + params).parents('.table-responsive').width() / 2);
    } else {
        $('.table-responsive').css('top', $(window).height() / 2 - $('.table-responsive').height() / 2 - 100);
        $('.table-responsive').css('left', ($(window).width() + $('#leftsidebar').width()) / 2 - $('.table-responsive').width() / 2);
    }

    $('.js-basic-example.' + params).find("tbody").on('click', 'tr', function (e, dt, type, indexes) {
        if ($('.js-basic-example.' + params).attr('value') != "listar") {
            $(this).css('background-color', '#007fff');
            $(this).css('color', '#fff');
            switch (params) {
                case "tag":
                    //$('.bootstrap-tagsinput input').focus();
                    //$('input[data-role="tagsinput"]').tagsinput('add', table.row(this).data()[0]);
                    dataTableArr.push(table.row(this).data()[0]);
                    break;
                case "imagem":
                    //$('input[name="imagem"]').focus();
                    //var inputImagem = $('input[name="imagem"]');
                    //$(inputImagem).val($(inputImagem).val() + ($(inputImagem).val() == "" ? "" : ", ") + table.row(this).data()[1].split('>')[1]);
                    dataTableArr.push(table.row(this).data()[1].split('>')[1]);
                    break;
                case "video":
                    //$('input[name="video"]').focus();
                    //var inputVideo = $('input[name="video"]');
                    //$(inputVideo).val($(inputVideo).val() + ($(inputVideo).val() == "" ? "" : ", ") + table.row(this).data()[2]);
                    dataTableArr.push(table.row(this).data()[2]);
                    break;
                case "categoria":
                    //$('input[name="categoria"]').focus();
                    //var inputCategoria = $('input[name="categoria"]');
                    //$(inputCategoria).val($(inputCategoria).val() + ($(inputCategoria).val() == "" ? "" : ", ") + table.row(this).data()[0]);
                    dataTableArr.push(table.row(this).data()[0]);
                    break;
                case "aprovacao":
                    $('input[name="manchete"]').val(table.row(this).data()[0]);
                    $('input[name="subManchete"]').val(table.row(this).data()[1]);
                    $('textarea[name="texto"]').val(table.row(this).data()[2]);
                    $('input[name="autor"]').val(table.row(this).data()[3]);
                    $('input[name="dtCadastro"]').val(table.row(this).data()[4]);
                    $('.background-table').fadeIn();
                    $('.table-responsive').fadeIn();
                    break;
            }
        }


    });

    $('.js-basic-example.' + params).find("tbody").on('click', 'i.material-icons', function (e, dt, type, indexes) {
        switch ($(this).text()) {
            case "edit":
                $("tr input").prop('disabled', true);
                $("tr i.material-icons:contains('playlist_add')").html("edit");
                $(this).parents("tr").find('input').prop('disabled', false);
                $(this).html("playlist_add");
                break;
            case "delete":
                switch (params) {
                    case "tag":
                        $('#modalId').html(getDataId(params, $(table.row($(this).parents("tr")).data()[0]).val(), 2));
                        break;
                    case "imagem":
                        $('#modalId').html(getDataId(params, $(this).parents("tr").find('img').parent('td').text(), 4));
                        break;
                    case "video":
                        $('#modalId').html(getDataId(params, $(table.row($(this).parents("tr")).data()[2]).val(), 6));
                        break;
                    case "categoria":
                        $('#modalId').html(getDataId(params, $(table.row($(this).parents("tr")).data()[0]).val(), 2));
                        break;
                    case "noticia":
                        $('#modalId').html(getDataId(params, $(table.row($(this).parents("tr")).data()[0]).val(), 2));
                        break
                    case "publicidade":
                        $('#modalId').html(getDataId(params, $(table.row($(this).parents("tr")).data()[0]).val(), 2));
                        break
                }
                $('#defaultModal').modal('show');
                break;
            case "playlist_add":
                $(".page-loader-wrapper").fadeIn();
                var data = {};
                var url = "https://tvgaspar-server.herokuapp.com/";
                switch (params) {
                    case "tag":
                        url += "updateTag";
                        data = {
                            titulo: $($(this).parents("tr").find('input')[0]).val(),
                            id: getDataId(params, $(table.row($(this).parents("tr")).data()[0]).val(), 2),
                            token: localStorage.getItem('token')
                        }
                        break;
                    case "imagem":
                        url += "updateImagem";
                        data = {
                            titulo: $($(this).parents("tr").find('input')[0]).val(),
                            id: getDataId(params, $(this).parents("tr").find('img').parent('td').text(), 4),
                            token: localStorage.getItem('token')
                        }
                        break;
                    case "video":
                        url += "updateVideo";
                        data = {
                            titulo: $($(this).parents("tr").find('input')[0]).val(),
                            texto: $($(this).parents("tr").find('input')[1]).val(),
                            link: $($(this).parents("tr").find('input')[2]).val(),
                            id: getDataId(params, $(table.row($(this).parents("tr")).data()[2]).val(), 6),
                            token: localStorage.getItem('token')
                        }
                        break;
                    case "categoria":
                        url += "updateCategoria";
                        data = {
                            titulo: $($(this).parents("tr").find('input')[0]).val(),
                            texto: $($(this).parents("tr").find('input')[1]).val(),
                            cor: $($(this).parents("tr").find('input')[2]).val(),
                            id: getDataId(params, $(table.row($(this).parents("tr")).data()[0]).val(), 2),
                            token: localStorage.getItem('token')
                        }
                        break;
                    case "noticia":
                        url += "updateNoticia";
                        data = {
                            manchete: $($(this).parents("tr").find('input')[0]).val(),
                            subManchete: $($(this).parents("tr").find('input')[1]).val(),
                            texto: $($(this).parents("tr").find('input')[2]).val(),
                            autor: $($(this).parents("tr").find('input')[3]).val(),
                            dtCadastro: $($(this).parents("tr").find('input')[4]).val(),
                            id: getDataId(params, $(table.row($(this).parents("tr")).data()[0]).val(), 2),
                            token: localStorage.getItem('token')
                        }
                        break
                    case "publicidade":
                        url += "updatePublicidade";
                        data = {
                            titulo: $($(this).parents("tr").find('input')[0]).val(),
                            tipo: $($(this).parents("tr").find('input')[1]).val(),
                            texto: $($(this).parents("tr").find('input')[2]).val(),
                            link: $($(this).parents("tr").find('input')[3]).val(),
                            id: getDataId(params, $(table.row($(this).parents("tr")).data()[0]).val(), 2),
                            token: localStorage.getItem('token')
                        }
                        break
                }
                $.ajax({
                    type: "POST",
                    url: url,
                    data: data,
                    success: function (response) {
                        console.log(response);
                        localStorage.setItem(params, "");
                        localStorage.setItem('not', acentuacaoTable(params).toUpperCase() + " editado com sucesso!");

                        location.reload();

                    },
                    error: function (error) {
                        console.log(error.message);
                        //logout('Sessão inválida. Faça o login novamente.');
                    }
                });
                break;
        }
    });
    if (params != "aprovacao" && $('.js-basic-example.' + params).attr('value') != "listar") {
        $('.background-table').fadeIn();
        $('.js-basic-example.' + params).parents('.table-responsive').fadeIn();
    }

    if (params == "imagem")
        $('.img-preview').on('load', function () {
            $('.page-loader-wrapper').fadeOut();
        });
    else
        $('.page-loader-wrapper').fadeOut();

}

//FadeOut para minimizar tabela
$('.background-table').click(function () {
    dataTableArr = [];
    $(this).fadeOut();
    $(".table-responsive").fadeOut();
    $('tr.even').css('background-color', '#ffffff');
    $('tr.even').css('color', '#000000');
    $('tr.odd').css('color', '#000000');
    $('.table-striped > tbody > tr:nth-of-type(odd)').css('background-color', '#f9f9f9');
});

$('.table-cancel-button').click(function () {
    $('.background-table').click();
});

$('.table-confirm-button').click(function () {
    dataTableArr = dataTableArr.filter(function (value, index, self) {
        return (self.indexOf(value) == index)
    });
    if (dataTableParam == "tag") {
        for (var element in dataTableArr)
            $('input[data-role="tagsinput"]').tagsinput('add', dataTableArr[element]);

        $('.bootstrap-tagsinput input').focus();
    } else {
        var text = "";
        for (var element in dataTableArr)
            text += (text != "" ? ", " : "") + dataTableArr[element];

        $("input[name='" + dataTableParam + "']").val($("input[name='" + dataTableParam + "']").val() + ($("input[name='" + dataTableParam + "']").val() ? ", " : "") + text);
        $('input[name="' + dataTableParam + '"]').focus();
    }


    $('.background-table').click();
});

//Init Firebase
var initFirebase = function () {
    firebase.initializeApp({
        apiKey: "AIzaSyAN8z_RHWKICWDl-QQ5cAQ8b1LvIWfrvOw",
        authDomain: "tvgaspar-backend.firebaseapp.com",
        databaseURL: "https://tvgaspar-backend.firebaseio.com",
        projectId: "tvgaspar-backend",
        storageBucket: "tvgaspar-backend.appspot.com",
        messagingSenderId: "702505431041"
    });
}

//Get info usuário (menu)
var getUsuario = function () {
    var usuario = localStorage.getItem('usuario').replace(/\"|\{|\}/g, '').replace(/,/g, ':').split(":");
    if (usuario != null && usuario != "") {
        $('.name').html(findAttribute("nome", usuario));
        $('.email').html(findAttribute("email", usuario));

    } else
        logout('Sessão inválida. Faça o login novamente.');

    return usuario;
}

//Get todas as notícias
var getAllNoticias = async function (flgNoticia, aprovacao) {
    var noticias = localStorage.getItem("noticia");
    if (aprovacao || (noticias == null || noticias == ""))
        $.ajax({
            type: "POST",
            url: "https://tvgaspar-server.herokuapp.com/getAllNoticias",
            data: {
                token: localStorage.getItem('token')
            },
            success: function (response) {
                console.log(response);
                var arrNoticia = [];
                if (aprovacao) {
                    for (var element in response)
                        if (response[element].aprovacao == 0)
                            arrNoticia.push(response[element]);
                    localStorage.setItem('aprovacao', JSON.stringify(arrNoticia));
                    setAprovacoes(flgNoticia);
                    $('.page-loader-wrapper').fadeOut();
                } else {
                    localStorage.setItem('noticia', JSON.stringify(response));
                    setAprovacoes(flgNoticia);
                    search("noticia");
                }


            },
            error: function (error) {
                console.log(error.message);
                logout('Sessão inválida. Faça o login novamente.');
            }
        });
    else {
        setAprovacoes(flgNoticia);
        search("noticia");
        //$('.page-loader-wrapper').fadeOut();
    }
}

//Set badge aprovações
var setAprovacoes = function (flgNoticia) {
    var aprovacao = localStorage.getItem('aprovacao').replace(/\[|\]|\{|\"/g, "").split('}');
    aprovacao.pop();
    if (aprovacao.length > 0) {
        $('span.badge').html(aprovacao.length);
        $('span.badge').css('display', 'block');
    }

    if (flgNoticia) {
        localStorage.setItem('not', "");
        location.reload();
    }

    //$('.page-loader-wrapper').fadeOut();
}

//Get todas publicidades
var getAllPublicidades = async function () {
    var publicidades = localStorage.getItem("publicidade");
    if (publicidades == null || publicidades == "") {
        $.ajax({
            type: "POST",
            url: "https://tvgaspar-server.herokuapp.com/getAllPublicidades",
            data: {
                token: localStorage.getItem('token')
            },
            success: function (response) {
                console.log(response);
                localStorage.setItem("publicidade", JSON.stringify(response));
                search("publicidade");
                //$('.page-loader-wrapper').fadeOut();
            },
            error: function (error) {
                console.log(error.message);
                logout('Sessão inválida. Faça o login novamente.');
            }
        });
    } else
        search("publicidade");
}