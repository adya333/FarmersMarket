package repository;

import db.DBConnection;
import model.Admin;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AdminRepository {

    public void addAdmin(Admin admin) {
        String sql = "INSERT INTO admins (fullName, username, email, phone) VALUES (?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, admin.getFullName());
            stmt.setString(2, admin.getUsername());
            stmt.setString(3, admin.getEmail());
            stmt.setString(4, admin.getPhone());
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Admin> getAllAdmins() {
        List<Admin> admins = new ArrayList<>();
        String sql = "SELECT * FROM admins";

        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Admin admin = new Admin();
                admin.setId(rs.getLong("id"));
                admin.setFullName(rs.getString("fullName"));
                admin.setUsername(rs.getString("username"));
                admin.setEmail(rs.getString("email"));
                admin.setPhone(rs.getString("phone"));
                admins.add(admin);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return admins;
    }

    public void updateAdmin(Admin admin) {
        String sql = "UPDATE admins SET fullName=?, username=?, email=?, phone=? WHERE id=?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, admin.getFullName());
            stmt.setString(2, admin.getUsername());
            stmt.setString(3, admin.getEmail());
            stmt.setString(4, admin.getPhone());
            stmt.setLong(5, admin.getId());
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteAdminById(Long id) {
        String sql = "DELETE FROM admins WHERE id=?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

