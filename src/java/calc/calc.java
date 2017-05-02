/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package calc;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.Formatter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author andreev_af
 */
@WebServlet(name = "calc", urlPatterns = {"/calc"})
public class calc extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        PrintWriter out = response.getWriter();
        try {
            /* TODO output your page here. You may use following sample code. */

            calcUtil.CalcUtil.Con();

            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet calc</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet calc at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        } catch (Exception e) {
            out.println(e.toString());
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter pw = response.getWriter();
        try {
            response.setCharacterEncoding("utf-8");
            request.setCharacterEncoding("utf-8");
            pw.println("Отработан GET–запрос");
            pw.println(3 / 10);
        } catch (Exception e) {
            pw.println(e.toString());

        }
//        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

//        response.setContentType("application/json;charset=UTF-8");
        response.setContentType("text/plain;charset=UTF-8");
        response.setCharacterEncoding("utf-8");
        PrintWriter pw = response.getWriter();
        Formatter jsonFormat = new Formatter();
        try {
            Class.forName("org.h2.Driver");
            String db_url = "jdbc:h2:~/calculation/calc";
            String db_login = "rio";
            String db_pass = "---===";
            Connection calc_conn = DriverManager.getConnection(db_url, db_login, db_pass);
            Statement calc_statement = calc_conn.createStatement();
            ResultSet rs = calc_statement.executeQuery("SELECT * FROM \"PUBLIC\".CALC_TEST WHERE CALCID=654;");
            ResultSet rs_rowCount = calc_statement.executeQuery("SELECT COUNT(*) FROM \"PUBLIC\".CALC_TEST;");
            jsonFormat.format("{\"rowCount\":\"%g\"}", rs_rowCount.getRow());
            int columnCount = rs.getMetaData().getColumnCount();
//            for (int i = 1; i <= columnCount; i++) {
//                pw.print(rs.getMetaData().getColumnName(i).toString()+"<br />");
//            }
            pw.print(jsonFormat.toString());
            calc_conn.close();
        } catch (Exception e) {
            pw.println(e.toString());

        }
//        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
