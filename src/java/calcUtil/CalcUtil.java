/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package calcUtil;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.DriverManager;

/**
 *
 * @author andreev_af
 */
public class CalcUtil {

    public static String getAppTitle() {
        return "Калькуляция расходов на издание";
    }

    public static void Con() throws ClassNotFoundException, SQLException {
        Class.forName("org.sqlite.JDBC");
        Connection conn = DriverManager.getConnection("jdbc:sqlite:./ZZZZZZZZZZZZZZZA.s3db");
        conn.close();
    }
}
