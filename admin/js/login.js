$(function ($) {
    'use strict';


});

function login() {
    var data = {
        nome: $('#name').val(),
        senha: $('#password').val(),
        //token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTE3MDEwNTk0LCJleHAiOjE1MTcwOTY5OTR9.dE1VfFKA0ME72xSx-U_COH-DIyf7vX56u7sh47huQnc"
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