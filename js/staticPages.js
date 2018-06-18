$(function ($) {
    $.ajax({
        type: "GET",
        url: serverUrl + "getAllCategorias",
        success: function (response) {
            console.log(response);
            var aux = async () => {
                await showCategoriasFooter(response);
                disabledLoader();
            };
            aux();
        },
        error: function (error) {
            console.log(error);
            disabledLoader();
        }
    });
});