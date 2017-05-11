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
import java.util.HashMap;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 *
 * @author andreev_af
 */
public class CalcUtil {

    public static int getRowCount() throws ClassNotFoundException, SQLException {
        int n = 0;
        try {
            Class.forName("org.postgresql.Driver");
            String db_url = "jdbc:postgresql://localhost:5432/rio";
            String db_login = "rio";
            String db_pass = "---===";
            Connection calc_conn = DriverManager.getConnection(db_url, db_login, db_pass);
            Statement calc_statement = calc_conn.createStatement();
            ResultSet rs_rowCount = calc_statement.executeQuery("SELECT COUNT(calcid) as N FROM plan;");
            rs_rowCount.next();
            n = rs_rowCount.getInt("N");
            rs_rowCount.close();
            calc_statement.close();
            calc_conn.close();
        } catch (Exception e) {

        }
        return n;
    }

    public static int getColumnCount() throws ClassNotFoundException, SQLException {
        int n = 0;
        try {
            Class.forName("org.postgresql.Driver");
            String db_url = "jdbc:postgresql://localhost:5432/rio";
            String db_login = "rio";
            String db_pass = "---===";
            Connection calc_conn = DriverManager.getConnection(db_url, db_login, db_pass);
            Statement calc_statement = calc_conn.createStatement();
            ResultSet rs_columnCount = calc_statement.executeQuery("select count(column_name) as columnCount from information_schema.columns where information_schema.columns.table_name='plan';");
            rs_columnCount.next();
            n = rs_columnCount.getInt("columnCount");
            rs_columnCount.close();
            calc_statement.close();
            calc_conn.close();
        } catch (Exception e) {

        }
        return n;
    }

    public static String[] getColumnNames() throws ClassNotFoundException, SQLException {
        String[] columnNames = new String[getColumnCount()];
        try {
            Class.forName("org.postgresql.Driver");
            String db_url = "jdbc:postgresql://localhost:5432/rio";
            String db_login = "rio";
            String db_pass = "---===";
            Connection calc_conn = DriverManager.getConnection(db_url, db_login, db_pass);
            Statement calc_statement = calc_conn.createStatement();
            ResultSet rs_columns = calc_statement.executeQuery("select column_name from information_schema.columns where information_schema.columns.table_name='plan';");
            int N = getRowCount();
            for (int i = 0; i < N; i++) {
                rs_columns.next();
                columnNames[i] = rs_columns.getString("column_name");
            }

            rs_columns.close();
            calc_statement.close();
            calc_conn.close();
        } catch (Exception e) {

        }
        return columnNames;
    }

    public static String getAll() throws ClassNotFoundException, SQLException {
        Class.forName("org.postgresql.Driver");
        String db_url = "jdbc:postgresql://localhost:5432/rio";
        String db_login = "rio";
        String db_pass = "---===";
        Connection calc_conn = DriverManager.getConnection(db_url, db_login, db_pass);
        Statement calc_statement = calc_conn.createStatement();
        ResultSet rsAll = calc_statement.executeQuery("select json_build_object('rows', array_to_json(array_agg(calcrow))) as j from (select calcid, calc_date, title from plan where calcid > 800) as calcrow;");
//        ResultSet rsAll = calc_statement.executeQuery("select calcid, title, calc_date from plan where calid=645;");
        rsAll.next();

        return rsAll.getString("j");
    }

    public static String getRecord(Integer calcID) throws ClassNotFoundException, SQLException {
        Class.forName("org.postgresql.Driver");
        String db_url = "jdbc:postgresql://localhost:5432/rio";
        String db_login = "rio";
        String db_pass = "---===";
        String queryString = String.format("select calcid, title, calc_date from plan where calcid=%d;", calcID);
        JSONObject record = new JSONObject();
        Integer calcId = new Integer(0);
        String calcTitle = "";
        Connection calc_conn = DriverManager.getConnection(db_url, db_login, db_pass);
        Statement calc_statement = calc_conn.createStatement();
        ResultSet rs = calc_statement.executeQuery(queryString);
        rs.next();

        record.put("calcid", rs.getInt("calcid"));
        record.put("title", rs.getString("title"));
        record.put("calcDate", rs.getDate("calc_date").toString());

//            s += String.format("row_%d — %s — %td.%tm.%tY<br />", rsAll.getInt("calcid"), rsAll.getString("title"), rsAll.getDate("calc_date"), rsAll.getDate("calc_date"), rsAll.getDate("calc_date"));
//        return s;
        return record.toJSONString();
    }
}
