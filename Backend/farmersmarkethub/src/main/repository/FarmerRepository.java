package repository;

import db.DBConnection;
import model.Farmer;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class FarmerRepository {

    public void addFarmer(Farmer farmer) {
        String sql = "INSERT INTO farmers (fullName, username, email, phone) VALUES (?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, farmer.getFullName());
            stmt.setString(2, farmer.getUsername());
            stmt.setString(3, farmer.getEmail());
            stmt.setString(4, farmer.getPhone());
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Farmer> getAllFarmers() {
        List<Farmer> farmers = new ArrayList<>();
        String sql = "SELECT * FROM farmers";

        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Farmer f = new Farmer();
                f.setId(rs.getLong("id"));
                f.setFullName(rs.getString("fullName"));
                f.setUsername(rs.getString("username"));
                f.setEmail(rs.getString("email"));
                f.setPhone(rs.getString("phone"));
                farmers.add(f);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return farmers;
    }

    public void updateFarmer(Farmer farmer) {
        String sql = "UPDATE farmers SET fullName=?, username=?, email=?, phone=? WHERE id=?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, farmer.getFullName());
            stmt.setString(2, farmer.getUsername());
            stmt.setString(3, farmer.getEmail());
            stmt.setString(4, farmer.getPhone());
            stmt.setLong(5, farmer.getId());
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteFarmerById(Long id) {
        String sql = "DELETE FROM farmers WHERE id=?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public Farmer getFarmerById(Long id) {
        String sql = "SELECT * FROM farmers WHERE id=?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                Farmer f = new Farmer();
                f.setId(rs.getLong("id"));
                f.setFullName(rs.getString("fullName"));
                f.setUsername(rs.getString("username"));
                f.setEmail(rs.getString("email"));
                f.setPhone(rs.getString("phone"));
                return f;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }
}

