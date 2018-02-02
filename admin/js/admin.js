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
            $(this).parent().addClass('focused');
        });

        //On focusout event
        $('.form-control').focusout(function () {
            var $this = $(this);
            if ($this.parents('.form-group').hasClass('form-float')) {
                if ($this.val() == '') {
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


var logout = function (msgError) {
    console.log(msgError);
    localStorage.setItem('token', "");
    localStorage.setItem('usuario', "");
    localStorage.setItem('tag', "");
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

//Logout
$('#logout').click(logout);

//Preencher com as informações do usuário
var findAttribute = function (attribute, data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i] == attribute)
            return data[i + 1];
    }

    return -1;
}

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

var registerMessage = function (response, form, text) {
    if (response.sqlMessage && response.sqlMessage.indexOf("Duplicate") >= 0) {
        var entry = response.sqlMessage.split('\'')[1].replace('\'', '');
        var name;
        $('.form-control').each(function (index) {
            if ($(this).val() == entry) {
                name = $(this).attr("name");
                return;
            }
        });
        var error = {};
        error[name] = name.toUpperCase() + " já cadastrada.";
        $(form).validate().showErrors(error);
        $('.page-loader-wrapper').fadeOut();
    } else {
        $('.form-control').each(function (index) {
            $(this).val("");
            $(this).parents('.form-line').removeClass("focused");
            $(this).parents('.bootstrap-tagsinput').find('span').each(function (index) {
                $(this).find('span[data-role="remove"]').click();
            });
        });
        $('.page-loader-wrapper').fadeOut();
        showNotification(text + " cadastrada com sucesso!", "success");
    }
}

var getAllTags = function () {
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
                $('.page-loader-wrapper').fadeOut();
            },
            error: function (error) {
                console.log(error.message);
                logout('Sessão inválida. Faça o login novamente.');
            }
        });
    } else {
        //var tags = getTags();
        //console.log(getTagId(tags[0]));
        $('.page-loader-wrapper').fadeOut();
    }
}

var getTags = function () {
    var tags = localStorage.getItem('tag');
    tags = tags.replace(/\"|\}|\]/g, "").replace(/,/g, ":").split(":");
    var arrTag = []
    for (var i = 3; i < tags.length; i += 4)
        arrTag.push(tags[i]);

    return arrTag;
}

var getTagId = function (tag) {
    var tags = localStorage.getItem('tag');
    tags = tags.replace(/\"|\}|\]/g, "").replace(/,/g, ":").split(":");
    for (var i = 0; i < tags.length; i++)
        if (tag == tags[i])
            return parseInt(tags[i - 2]);
}

var search = function (params) {
    var list = localStorage.getItem(params).replace(/\[|\{|\"|\]/g, "").split("}");
    for (var i = 0; i < list.length; i++) {
        if (list[i][0] == ",")
            list[i] = list[i].replace(",", "");
    }
    var colunas = [];
    var coluna = {}; 
    var data = [];
    for (var j = 0; j < list.length; j++) {
        var row = [];
        var linha = list[j].replace(/\,/g, ":").split(":");
        if (j == 0)
            for (var i = 0; i < linha.length; i += 2){
                coluna = {}; 
                coluna["title"] = linha[i];
                colunas.push(coluna);
            }
        for (var i = 1; i < linha.length; i+=2)
            row.push(linha[i]);
        if (row.length > 0)
            data.push(row);
    }
    console.log(data);
    $('.js-basic-example').DataTable({
        data: data,
        columns: colunas,
        responsive: true,
        bLengthChange: false,
        pageLength: 10,
        language: {
            zeroRecords: "Nenhum registro encontrado",
            info: "Exibindo _START_ a _END_ de _TOTAL_ registros",
            infoEmpty: "Exibindo 0 a 0 de 0 registros",
            infoFiltered: "",
            search: "Pesquisar:",
            paginate: {
                "next": "Próximo",
                "previous": "Anterior"
            },
        }
    });

    $('.background-table').css('display', 'block');
    $('.table-responsive').css('display', 'block');

}