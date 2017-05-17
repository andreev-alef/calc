/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var orderByDimensionFlag = true;
var previousColumn = '';

function comma2dot(sourceString) {
    let strComma = sourceString.toString();
    let strDot = strDot.replace('.', ',');
    return strDot;
}
function dot2comma(sourceString) {
    let strDot = sourceString.toString();
    let strComma = strDot.replace('.', ',');
    return strComma;
}

function openCalc(e) {
    alert($(e).data('id'));
//    event.stopPropagation();
//    e.stopPropagation();
}

function printCalc(element, e) {
    alert('печать калькуляции №' + $(element).data('id'));
//    event.stopPropagation();
    e.stopPropagation();
}

function showError(errorData) {
    $('.wr-data').html('<div class="alert alert-danger" role="alert">' + exception.toString() + '</div>');
}

function calcShowAll(element) {
    try {
        let url = '/calc';
        let dataType = 'html';
        let orderBy = 'calcid';
        let orderByDimension = 'asc';
        if ($(element).data('column_name') === undefined) {
            orderBy = "calcid";
        } else {
            orderBy = $(element).data('column_name');
        }
        orderByDimensionFlag = previousColumn !== orderBy;
        let POSTparam = {
            "command": "get_all",
            "orderBy": orderBy,
            "orderByDimension": orderByDimensionFlag ? 'asc' : 'desc'
        };
        let rows = {};
        let tableHeader = '<table class="table table-striped table-bordered rows" id="view_all">' +
                '<tr class="row_header">' +
                '<th class="column_header">&nbsp;</th>' +
                '<th class="column_header" data-column_name="calcid" onclick="calcShowAll(this);">&nbsp;№&nbsp;</th>' +
                '<th class="column_header" data-column_name="calc_date" onclick="calcShowAll(this);">Дата</th>' +
                '<th class="column_header" data-column_name="title" onclick="calcShowAll(this);">Наименование</th>' +
                '<th class="column_header" data-column_name="tirazh" onclick="calcShowAll(this);">Тираж</th>' +
                '<th class="column_header" data-column_name="cena_knigi" onclick="calcShowAll(this);">Стоимость книги</th>' +
                '<th class="column_header" data-column_name="cena_na_tirazh_nds" onclick="calcShowAll(this);">Стоимость тиража</th></tr>';
        let tableFooter = '</table>';

        $.post(url, POSTparam, function (data) {
            try {
                rows = JSON.parse(data);
                let i = 0;
                let N = rows.row.length;
                let tableBody = '';
                for (i = 0; i < N; i++) {
                    tableBody += '<tr class="calc_row" data-id="' + rows.row[i].calcid + '" onclick="openCalc(this);">' +
                            '<td class="print"><img class="btnPrint" src="../lib/img/print.ico" data-id=' + rows.row[i].calcid + ' alt="Распечатать" onclick="printCalc(this, event);" /></td>' + //onclick="printCalc(this);"
                            '<td class="calcid">' + rows.row[i].calcid + '</td>' +
                            '<td class="calcdate">' + rows.row[i].calcdate + '</td>' +
                            '<td class="title">' + rows.row[i].title + '</td>' +
                            '<td class="tirazh">' + rows.row[i].tirazh + '</td>' +
                            '<td class="cena_knigi">' + dot2comma(Number.parseFloat(rows.row[i].cena_knigi).toFixed(2)) + '</td>' +
                            '<td class="cena_na_tirazh_nds">' + dot2comma(Number.parseFloat(rows.row[i].cena_na_tirazh_nds).toFixed(2)) + '</td>' +
                            '</tr>';
                }
                $('.wr-data').html(tableHeader + tableBody + tableFooter);
            } catch (exception) {
                $('.wr-data').html('<div class="alert alert-danger" role="alert">' + exception.toString() + '<br />' + data + '</div>');
            }
        }, dataType);

        orderByDimensionFlag = !orderByDimensionFlag;
        previousColumn = orderBy;
    } catch (exception) {
        alert(exception.toString());
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
    calcShowAll();

    $('.btnPrint').click(function () {
        printCalc(this);
    });

    $('#y').css({'display': 'none'});

    $('#showRowCount').click(function (e) {
        calcShowRowCount();
    });

}
);