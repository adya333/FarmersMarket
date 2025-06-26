package repository;

import db.DBConnection;
import model.Order;
import model.OrderState;
import model.User;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class OrderRepository {

    public void addOrder(Order order) {
        String insertOrderSQL = "INSERT INTO orders (user_id, net_price, date_of_transaction, state) VALUES (?, ?, ?, ?)";
        String insertOrderProductSQL = "INSERT INTO order_products (order_id, product_id, quantity) VALUES (?, ?, ?)";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement orderStmt = conn.prepareStatement(insertOrderSQL, Statement.RETURN_GENERATED_KEYS);
             PreparedStatement productStmt = conn.prepareStatement(insertOrderProductSQL)) {

            conn.setAutoCommit(false); 

            orderStmt.setLong(1, order.getUser().getId());
            orderStmt.setDouble(2, order.getNetPrice());
            orderStmt.setTimestamp(3, Timestamp.valueOf(order.getDateOfTransaction()));
            orderStmt.setString(4, order.getState().name());
            orderStmt.executeUpdate();

            ResultSet generatedKeys = orderStmt.getGeneratedKeys();
            Long orderId = null;
            if (generatedKeys.next()) {
                orderId = generatedKeys.getLong(1);
            }

         
            for (int i = 0; i < order.getProducts().size(); i++) {
                productStmt.setLong(1, orderId);
                productStmt.setLong(2, order.getProducts().get(i).getId());
                productStmt.setInt(3, order.getQuantities().get(i));
                productStmt.addBatch();
            }
            productStmt.executeBatch();

            conn.commit();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Order> getAllOrders() {
        List<Order> orders = new ArrayList<>();
        String sql = "SELECT * FROM orders";

        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Order order = new Order();
                order.setId(rs.getLong("id"));

                User user = new User();
                user.setId(rs.getLong("user_id")); 
                order.setUser(user);

                order.setNetPrice(rs.getDouble("net_price"));
                order.setDateOfTransaction(rs.getTimestamp("date_of_transaction").toLocalDateTime());
                order.setState(OrderState.valueOf(rs.getString("state")));

                orders.add(order);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return orders;
    }

    public void deleteOrderById(Long id) {
        String sql1 = "DELETE FROM order_products WHERE order_id=?";
        String sql2 = "DELETE FROM orders WHERE id=?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt1 = conn.prepareStatement(sql1);
             PreparedStatement stmt2 = conn.prepareStatement(sql2)) {

            stmt1.setLong(1, id);
            stmt1.executeUpdate();

            stmt2.setLong(1, id);
            stmt2.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

