/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    $('#ok').click(function () {
        $.post("/calc", function (data) {
            $("#view_all").html(data.rowCount/3);
        }, "json");

    });
});