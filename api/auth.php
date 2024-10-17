<?php
require 'db_connection.php'; // Use a new file for MySQLi connection

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = isset($_POST['action']) ? $_POST['action'] : null;
    $username = isset($_POST['username']) ? $_POST['username'] : null;
    $password = isset($_POST['password']) ? $_POST['password'] : null;

    if ($action && $username && $password) {
        if ($action === 'register') {
            $passwordHash = password_hash($password, PASSWORD_BCRYPT);
            $stmt = $mysqli->prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)");
            $stmt->bind_param("ss", $username, $passwordHash);
            if ($stmt->execute()) {
                echo json_encode(['message' => 'User registered successfully']);
            } else {
                echo json_encode(['error' => 'Registration failed']);
            }
            $stmt->close();
        } elseif ($action === 'login') {
            $stmt = $mysqli->prepare("SELECT * FROM users WHERE username = ?");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();

            if ($user && password_verify($password, $user['password_hash'])) {
                $token = generateToken();
                $stmt = $mysqli->prepare("UPDATE users SET token = ? WHERE id = ?");
                $stmt->bind_param("si", $token, $user['id']);
                $stmt->execute();
                echo json_encode(['message' => 'Login successful', 'token' => $token]);
            } else {
                echo json_encode(['error' => 'Invalid username or password']);
            }
            $stmt->close();
        }
    } else {
        echo json_encode(['error' => 'Missing action, username, or password']);
    }
}
?>