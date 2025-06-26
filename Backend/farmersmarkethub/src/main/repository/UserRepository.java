package repository;

import db.DBConnection;
import model.User;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserRepository {

    public void createUser(User user) {
        String sql = "INSERT INTO users (fullName, username, email, phone) VALUES (?, ?, ?, ?)";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, user.getFullName());
            stmt.setString(2, user.getUsername());
            stmt.setString(3, user.getEmail());
            stmt.setString(4, user.getPhone());
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        String sql = "SELECT * FROM users";

        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                User u = new User();
                u.setId(rs.getLong("id"));
                u.setFullName(rs.getString("fullName"));
                u.setUsername(rs.getString("username"));
                u.setEmail(rs.getString("email"));
                u.setPhone(rs.getString("phone"));
                users.add(u);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return users;
    }

    public void updateUser(User user) {
        String sql = "UPDATE users SET fullName=?, username=?, email=?, phone=? WHERE id=?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, user.getFullName());
            stmt.setString(2, user.getUsername());
            stmt.setString(3, user.getEmail());
            stmt.setString(4, user.getPhone());
            stmt.setLong(5, user.getId());
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteUserById(Long id) {
        String sql = "DELETE FROM users WHERE id=?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

