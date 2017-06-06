/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

let orderBy = 'calcid';
let orderByDimension = '';
let orderByDimensionFlag = true;
let previousColumn = '';
//let POSTparam = {};
let url = '/calc';
let dataType = 'html';

//if (window.addEventListener) {
//    window.addEventListener("storage", strg, false);
//} else {
//    window.attachEvent("onstorage", strg);
//}

function strg() {
    alert(localStorage['test']);
}

function info(info) {
    $("#info").html(info);
}

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

//function trunc(longString) {
//    let maxStrLenth = 78;
//    if (longString.length > maxStrLenth) {
//        return longString.slice(0, 78).replace(/ $/, "").replace(/\.$/, "") + "…";
//    } else {
//        return longString;
//    }
//}

function JSON_2_Table(jsonRows = {}) {
    let rows = jsonRows;
    let i = 0;
    let N = rows.row.length;
    let tableBody = '';
    for (i = 0; i < N; i++) {
        tableBody += '<tr class="calc_row" data-id="' + rows.row[i].calcid + '" onclick="openCalc(this);">' +
                '<td class="print"><img class="btnPrint" src="../lib/img/print.ico" data-id=' + rows.row[i].calcid + ' alt="Распечатать" onclick="printCalc(this, event);" /></td>' + //onclick="printCalc(this);"
                '<td class="calcid">' + rows.row[i].calcid + '</td>' +
                '<td class="calcdate">' + rows.row[i].calcdate + '</td>' +
                '<td class="title">' + ((rows.row[i].title === null) ? "" : rows.row[i].title) + '</td>' +
                '<td class="tirazh">' + rows.row[i].tirazh + '</td>' +
                '<td class="cena_knigi">' + dot2comma(Number.parseFloat(rows.row[i].cena_knigi).toFixed(2)) + '</td>' +
                '<td class="cena_na_tirazh_nds">' + dot2comma(Number.parseFloat(rows.row[i].cena_na_tirazh_nds).toFixed(2)) + '</td>' +
                '</tr>';
    }
    $('tbody').html(tableBody);

}

function getOrderBy(element) {
    try {
        if ($(element).data('column_name') === undefined) {
            orderBy = "calcid";
        } else {
            orderBy = $(element).data('column_name');
        }
        orderByDimension = orderByDimension === 'asc' ? 'desc' : 'asc';
        if (previousColumn !== orderBy) {
            orderByDimension = 'asc';
        }
        previousColumn = orderBy;
        return {'colName': orderBy, 'dimension': orderByDimension};
    } catch (e) {
        alert(e.toString());
    }
}

function openCalc(e) {
    alert($(e).data('id'));
// event.stopPropagation();
// e.stopPropagation();
}

function printCalc(element, e) {
    alert('печать калькуляции №' + $(element).data('id'));
// event.stopPropagation();
    e.stopPropagation();
}

function getData(POSTparam = {}) {
//    if ($(element).data('fast_filter') === undefined) {
//        if ($(element).data('column_name') === undefined) {
//            orderBy = "calcid";
//        } else {
//            orderBy = $(element).data('column_name');
//        }
//        POSTparam.command = "get_all";
//    } else {
//        if ($(element).data('column_name') === undefined) {
//            orderBy = "calcid";
//        } else {
//            orderBy = $(element).data('column_name');
//        }
//        POSTparam.command = $(element).data('fast_filter');
//    }
//
//    orderByDimension = orderByDimension === 'asc' ? 'desc' : 'asc';
//    if (previousColumn !== orderBy) {
//        orderByDimension = 'asc';
//    }
//    previousColumn = orderBy;
//    POSTparam = {
//        "orderBy": orderBy,
//        "orderByDimension": orderByDimension
//    };
//    POSTparam.orderBy = getOrderBy(element).colName;
//    POSTparam.orderByDimension = getOrderBy(element).dimension;

    $.post(url, POSTparam, function (data) {
        JSON_2_Table(JSON.parse(data));
    }, dataType);
    info(POSTparam.command);
}

function calcShowRowCount() {
    try {
        var url = '/calc';
        var dataType = 'json';
        POSTparam = {"command": "get_row_count"};
        $.post(url, POSTparam, function (data) {
            let N = data.count;
            $('#info').html('Всего записей:&nbsp;' + N);
        }, dataType);

    } catch (exception) {
        $('.wr-data').html('<div class="alert alert-danger" role="alert">' + exception.toString() + '</div>');
    }
}

$(document).ready(function () {
    getData();
//    calcShowRowCount();

    $('.column_header').click(function () {
        let s = getOrderBy(this);
        info('Сортировать по полю: <b>'
                + s.colName + '</b>'
                + '<br />Направление сортировки: <b>'
                + s.dimension + '</b><br />');
    });
});
