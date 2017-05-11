/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    $('#ok').click(function () {
        $.post("/calc", function (data) {
            $("#view_all").html(data.rows[10].title);
        }, "json");
//        r = {"rows": [{"calcid": 801, "calc_date": "2015-02-03", "title": "Нормативно-правовое обеспечение дошкольного образования"}, {"calcid": 802, "calc_date": "2015-02-03", "title": "Формирование социального опыта школьников средствами экологического образования."}, {"calcid": 803, "calc_date": "2015-02-12", "title": "Работа Тресвятский"}]};
//        $("#view_all").html(r["rows"][0].calcid);

//        $.post("/calc", function (data) {
//            $("#view_all").html(data);
//        }, "html");


    });
    $("#showRecord").click(function () {
        var record = "";
        $.post("/calc", {calcID: $("#calcID").val()}, function (data) {
            record = data;
            $("#view_rec").html(record.title);
        }, "json");

    });
});