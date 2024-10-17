<?php
require 'vendor/autoload.php';

\Stripe\Stripe::setApiKey('your-secret-key-here');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $amount = $input['amount']; // Amount in cents

    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => $amount,
        'currency' => 'eur',
    ]);

    echo json_encode(['clientSecret' => $paymentIntent->client_secret]);
}
?>