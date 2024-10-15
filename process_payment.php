<?php

// Process the payment using Paysera's API
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $paymentMethod = $_POST['payment_method'];

    if ($paymentMethod === 'paysera') {
        // Here you would typically create a payment request to Paysera's API
        // For demonstration, we'll just redirect to a mock Paysera page
        header('Location: https://www.paysera.com/pay');
        exit;
    }
}
?>