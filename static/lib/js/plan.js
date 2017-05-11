/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    $('#ok').click(function () {
//        $.post("/calc", function (data) {
//            $("#view_all").html(data.rowCount);
//        }, "json");
        $.post("/calc",{name: $("#calcID").val()}, function (data) {
            $("#view_all").html(data);
        }, "html");


    });
    $("#showRecord").click(function () {
        var record = "";
        $.post("/calc", {calcID: $("#calcID").val()}, function (data) {
            record = data;
            $("#view_rec").html(record.title);
        }, "json");

    });
});