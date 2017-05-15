/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  andreev_af
 * Created: 15.05.2017
 */

select calcid, to_char(calc_date, 'DD.MM.YYYY') as calcdate, title from plan order by title asc;

-- select calcid, to_char(calc_date, 'DD.MM.YYYY') as calcdate, title from plan;

-- select to_char(current_timestamp, 'DD.MM.YYYY  HH24:MI:SS');

-- select json_build_object('columnNames',array_to_json(array_agg(column_names))) as columnNames  from (select column_name from information_schema.columns where information_schema.columns.table_name='plan') as column_names;

-- select row_to_json(calcrow) as rowCount from (select count(calcid) from plan) as calcrow;

-- copy (select json_build_object('rows', array_to_json(array_agg(calcrow))) as j from (select calcid, calc_date, title from plan order by calcid asc) as calcrow) to 'D:\www\NetBeansProjects\calc\web\data\cal.json';