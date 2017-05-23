/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

let orderBy = 'calcid';
let orderByDimension = '';
let orderByDimensionFlag = true;
let previousColumn = '';
let POSTparam = {};
let url = '/calc';
let dataType = 'html';

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

function writeTable(jsonRows = {}) {
//    let tableHeader = '<table class="table table-striped table-bordered rows" id="view_all">' +
//            '<tr class="row_header">' +
//            '<th class="column_header">&nbsp;</th>' +
//            '<th class="column_header" data-column_name="calcid" onclick="calcShowAll(this);">&nbsp;№&nbsp;</th>' +
//            '<th class="column_header" data-column_name="calc_date" onclick="calcShowAll(this);">Дата</th>' +
//            '<th class="column_header" data-column_name="title" onclick="calcShowAll(this);">Наименование</th>' +
//            '<th class="column_header" data-column_name="tirazh" onclick="calcShowAll(this);">Тираж</th>' +
//            '<th class="column_header" data-column_name="cena_knigi" onclick="calcShowAll(this);">Стоимость книги</th>' +
//            '<th class="column_header" data-column_name="cena_na_tirazh_nds" onclick="calcShowAll(this);">Стоимость тиража</th></tr>';
//    let tableFooter = '</table>';
    let rows = jsonRows;
    let i = 0;
    let N = rows.row.length;
    let tableBody = '';
    for (i = 0; i < N; i++) {
        tableBody += '<tr class="calc_row" data-id="' + rows.row[i].calcid + '" onclick="openCalc(this);">' +
                '<td class="print"><img class="btnPrint" src="../lib/img/print.ico" data-id=' + rows.row[i].calcid + ' alt="Распечатать" onclick="printCalc(this, event);" /></td>' + //onclick="printCalc(this);"
                '<td class="calcid">' + rows.row[i].calcid + '</td>' +
                '<td class="calcdate">' + rows.row[i].calcdate + '</td>' +
                '<td class="title"><div class="">' + ((rows.row[i].title === null) ? "" : rows.row[i].title) + '</td>' +
                '<td class="tirazh">' + rows.row[i].tirazh + '</td>' +
                '<td class="cena_knigi">' + dot2comma(Number.parseFloat(rows.row[i].cena_knigi).toFixed(2)) + '</td>' +
                '<td class="cena_na_tirazh_nds">' + dot2comma(Number.parseFloat(rows.row[i].cena_na_tirazh_nds).toFixed(2)) + '</td>' +
                '</tr>';
    }
//    $('.wr-data').html(tableHeader + tableBody + tableFooter);
    $('tbody').html(tableBody);

}

function getOrderBy(element) {
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

function calcShowAll(element) {
    if ($(element).data('fast_filter') === undefined) {
        if ($(element).data('column_name') === undefined) {
            orderBy = "calcid";
        } else {
            orderBy = $(element).data('column_name');
        }
        POSTparam.command = "get_all";
    } else {
        if ($(element).data('column_name') === undefined) {
            orderBy = "calcid";
        } else {
            orderBy = $(element).data('column_name');
        }
        POSTparam.command = $(element).data('fast_filter');
    }

    orderByDimension = orderByDimension === 'asc' ? 'desc' : 'asc';
    if (previousColumn !== orderBy) {
        orderByDimension = 'asc';
    }
    previousColumn = orderBy;
//    POSTparam = {
//        "orderBy": orderBy,
//        "orderByDimension": orderByDimension
//    };
    POSTparam.orderBy = orderBy;
    POSTparam.orderByDimension = orderByDimension;

    $.post(url, POSTparam, function (data) {
        writeTable(JSON.parse(data));
    }, dataType);
    info(POSTparam.command);
}

function calcShowForCurrentYear(element) {
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
        POSTparam = {
            "command": "get_all_for_current_year",
            "orderBy": orderBy,
            "orderByDimension": orderByDimension
        };

        $.post(url, POSTparam, function (data) {
            writeTable(JSON.parse(data));
        }, dataType);
    } catch (e) {
        alert(e.toString());
    }
}
function calcShowForCurrentMonth(element) {
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
        POSTparam = {
            "command": "get_all_for_current_month",
            "orderBy": orderBy,
            "orderByDimension": orderByDimension
        };

        $.post(url, POSTparam, function (data) {
            writeTable(JSON.parse(data));
        }, dataType);
    } catch (e) {
        alert(e.toString());
    }
}
function calcShowForCurrentDay(element) {
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
        POSTparam = {
            "command": "get_all_for_current_day",
            "orderBy": orderBy,
            "orderByDimension": orderByDimension
        };

        $.post(url, POSTparam, function (data) {
            writeTable(JSON.parse(data));
        }, dataType);
    } catch (e) {
        alert(e.toString());
    }
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
    calcShowAll();
//    calcShowRowCount();

    $('.column_header').click();
    $('.fast_filter').click(function () {
        calcShowAll(this);
    });
}
);