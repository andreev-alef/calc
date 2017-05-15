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

function calcShowAll() {
    try {
        var url = '/calc';
        var dataType = 'json';
        var route = {"command": "get_all"};
        var rows = {};
        var tableHeader = '<table class="table table-striped rows" id="view_all">' +
                '<tr><th>&nbsp;</th><th>№</th><th>Дата</th><th>Наименование</th></tr>';
        var tableFooter = '</table>';

        $.post(url, route, function (data) {
            rows = data;
            let i = 0;
            let N = rows.row.length;
            let tableBody = '';
            for (i = 0; i < N; i++) {
                tableBody += '<tr class="calc_row" data-id="' + rows.row[i].calcid + '" onclick="openCalc(this);">' +
                        '<td class="print"><img src="../lib/img/print.ico" data-id=' + rows.row[i].calcid + ' alt="Распечатать" onclick="printCalc(this);" /></td>' +
                        '<td class="calcid">' + rows.row[i].calcid + '</td>' +
                        '<td class="calcdate">' + rows.row[i].calcdate + '</td>' +
                        '<td class="title">' + rows.row[i].title + '</td>' +
                        '</tr>';
            }
            $('.wr-data').html(tableHeader + tableBody + tableFooter);
        }, dataType);

    } catch (exception) {
        $('.wr-data').html('<div class="alert alert-danger" role="alert">' + exception.toString() + '</div>');
    }
}
function calcShowRowCount() {
    try {
        var url = '/calc';
        var dataType = 'json';
        var route = {"command": "get_row_count"};
        $.post(url, route, function (data) {
            let N = data.count;
            $('#y').html(N);
            $('#y').fadeIn('slow');
        }, dataType);

    } catch (exception) {
        $('.wr-data').html('<div class="alert alert-danger" role="alert">' + exception.toString() + '</div>');
    }
}

$(document).ready(function () {
    $('#y').css({'display': 'none'});

    $('#showAll').click(function () {
        calcShowAll();
    });
    $('#showRowCount').click(function () {
        calcShowRowCount();
    });

}
);