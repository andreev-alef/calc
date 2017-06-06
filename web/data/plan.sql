/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  andreev_af
 * Created: 15.05.2017
 */
-- select calcid, to_char(calc_date, 'DD.MM.YYYY') as calcdate, title, tirazh, cena_knigi, cena_na_tirazh_nds from plan where date_part('year', calc_date) = date_part('year', now()) order by calcid asc;
-- select calcid, to_char(calc_date, 'DD.MM.YYYY') as calcdate, title, tirazh, cena_knigi, cena_na_tirazh_nds from plan where (date_part('year', calc_date) = date_part('year', now()) and date_part('month', calc_date) = date_part('month', now())) order by calcid asc;
-- select calcid, to_char(calc_date, 'DD.MM.YYYY') as calcdate, title, tirazh, cena_knigi, cena_na_tirazh_nds from plan where (date_part('year', calc_date) = date_part('year', now()) and date_part('month', calc_date) = date_part('month', now()) and date_part('day', calc_date) = date_part('day', now())) order by calcid asc;
-- select calcid,
--     to_char(calc_date, 'DD.MM.YYYY') as calcdate, title, tirazh, cena_knigi, cena_na_tirazh_nds 
-- from plan 
-- where (date_part('year', calc_date) = date_part('year', now()) 
--     and date_part('month', calc_date) = date_part('month', now()) 
--     and date_part('day', calc_date) = date_part('day', now())) order by calcid asc;

-- select calcid, to_char(calc_date, 'DD.MM.YYYY') as calcdate, title from plan order by title asc;

-- select calcid, to_char(calc_date, 'DD.MM.YYYY') as calcdate, title from plan;

-- select to_char(current_timestamp, 'DD.MM.YYYY  HH24:MI:SS');

-- select json_build_object('columnNames',array_to_json(array_agg(column_names))) as columnNames  from (select column_name from information_schema.columns where information_schema.columns.table_name='plan') as column_names;

-- select row_to_json(calcrow) as rowCount from (select count(calcid) from plan) as calcrow;

-- copy (select json_build_object('rows', array_to_json(array_agg(calcrow))) as j from (select calcid, calc_date, title from plan order by calcid asc) as calcrow) to 'D:\www\NetBeansProjects\calc\web\data\cal.json';

-- INSERT INTO plan (title, calc_date) VALUES ('Сергей Худиев. Диалог с атеистами: православные аргументы', now());
-- INSERT INTO plan (title, calc_date) VALUES ('JS Mythbusters, сборник советов и практик по написанию производительного JavaScript-кода', now());
-- UPDATE plan set calc_date=now() WHERE calcid=3;

-- select json_build_object('row', array_to_json(array_agg(calcrow))) as j from (select calcid, to_char(calc_date, 'DD.MM.YYYY') as calcdate, title, tirazh, cena_knigi, cena_na_tirazh_nds from plan where (date_part('year', calc_date) = date_part('year', now()) and date_part('month', calc_date) = date_part('month', now())) order by calcid asc) as calcrow;

-- select localtimestamp(1), current_timestamp(2), now();

-- select * from plan where calc_date > '2017-05-01';
