$(function ($) {
    'use strict';


});

function login() {
    var data = {
        nome: $('#name').val(),
        senha: $('#password').val()
    };
    $.ajax({
        type: "POST",
        url: "https://tvgaspar-server.herokuapp.com/login",
        data: data,
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.log(error);
        }
    })
}