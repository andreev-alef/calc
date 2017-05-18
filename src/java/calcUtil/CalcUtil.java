/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package calcUtil;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 *
 * @author andreev_af
 */
public class CalcUtil {

    public static String getRowCount() throws ClassNotFoundException, SQLException {
        try {
            Class.forName("org.postgresql.Driver");
            String db_url = "jdbc:postgresql://localhost:5432/rio";
            String db_login = "rio";
            String db_pass = "---===";
            String queryString = "select row_to_json(calcrow) as row_count from (select count(calcid) from plan) as calcrow;";
            Connection calc_conn = DriverManager.getConnection(db_url, db_login, db_pass);
            Statement calc_statement = calc_conn.createStatement();
            ResultSet rs_rowCount = calc_statement.executeQuery(queryString);
            rs_rowCount.next();
            String rowCount = rs_rowCount.getString("row_count");
            rs_rowCount.close();
            calc_statement.close();
            calc_conn.close();
            return rowCount;
        } catch (Exception e) {
            return e.toString();
        }
    }

    public static String getColumnNames() throws ClassNotFoundException, SQLException {
        try {
            Class.forName("org.postgresql.Driver");
            String db_url = "jdbc:postgresql://localhost:5432/rio";
            String db_login = "rio";
            String db_pass = "---===";
            String queryString = "select json_build_object('columnNames',array_to_json(array_agg(column_names))) from (select column_name from information_schema.columns where information_schema.columns.table_name='plan') as column_names;";
            Connection calc_conn = DriverManager.getConnection(db_url, db_login, db_pass);
            Statement calc_statement = calc_conn.createStatement();
            ResultSet rs_columns = calc_statement.executeQuery(queryString);
            rs_columns.next();
            String columnNames = rs_columns.getString("columnnames");
            rs_columns.close();
            calc_statement.close();
            calc_conn.close();
            return columnNames;
        } catch (Exception e) {
            return e.toString();
        }
    }

    public static String getAll(String orderBy, String orderByDimension) throws ClassNotFoundException, SQLException {

        Class.forName("org.postgresql.Driver");
        String db_url = "jdbc:postgresql://localhost:5432/rio";
        String db_login = "rio";
        String db_pass = "---===";
        String queryString = String.format("select json_build_object('row', array_to_json(array_agg(calcrow))) as j from (select calcid, to_char(calc_date, 'DD.MM.YYYY') as calcdate, title, tirazh, cena_knigi, cena_na_tirazh_nds from plan order by %s %s) as calcrow;", orderBy, orderByDimension);
        Connection calc_conn = DriverManager.getConnection(db_url, db_login, db_pass);
        Statement calc_statement = calc_conn.createStatement();
        ResultSet rsAll = calc_statement.executeQuery(queryString);
        rsAll.next();
        return rsAll.getString("j");
    }

    public static String getRecord(Integer calcID) throws ClassNotFoundException, SQLException {
        Class.forName("org.postgresql.Driver");
        String db_url = "jdbc:postgresql://localhost:5432/rio";
        String db_login = "rio";
        String db_pass = "---===";
        String queryString = String.format("select calcid, title, calc_date from plan where calcid=%d;", calcID);
        Integer calcId = new Integer(0);
        String calcTitle = "";
        Connection calc_conn = DriverManager.getConnection(db_url, db_login, db_pass);
        Statement calc_statement = calc_conn.createStatement();
        ResultSet rs = calc_statement.executeQuery(queryString);
        rs.next();
        return "OK";
    }
}
