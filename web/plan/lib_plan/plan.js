/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function openCalc(e) {
    alert($(e).data('id'));
}

function printCalc(e) {
//    $(e).tooltip({title: "Распечатать", placement: "right"});
    alert('печать калькуляции №' + $(e).data('id'));
    event.stopPropagation();
}

$(document).ready(function () {
    $('#ok').click(function () {
        try {
            for (i = 0; i < 21; i++) {
                $('<tr class="calc_row" data-id="' + i + '" onclick="openCalc(this);">' +
                        '<td class="print"><img src="../lib/img/print.ico" data-id=' + i + ' alt="Распечатать" onclick="printCalc(this);" /></td>' +
                        '<td class="calcid">' + i + '</td>' +
                        '<td class="calcdate">2008-11-01</td>' +
                        '<td class="title">Интеллект будущего.Отв. ред.Смолин С.П.</td>' +
                        '</tr>').appendTo($(".rows"));
            }
        } catch (exception) {
            $('.wr-data').html('<div class="alert alert-danger" role="alert">' + exception.toString() + '</div>');
        }
    });

    $("#showRecord").click(function () {
        var record = "";
        $.post("/calc", {calcID: $("#calcID").val()}, function (data) {
            record = data;
            $("#view_rec").html(record.title);
        }, "json");

    });
});