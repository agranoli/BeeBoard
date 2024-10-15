<?php
// Save settings to a database or configuration file
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $settings = [
        'enable_integration' => isset($_POST['enable_integration']),
        'project_id' => $_POST['project_id'],
        'project_sign' => $_POST['project_sign'],
        'test_mode' => isset($_POST['test_mode']),
        'payment_title' => $_POST['payment_title'],
        'payment_description' => $_POST['payment_description'],
        'redirect_option' => $_POST['redirect_option'],
        'countries' => $_POST['countries'],
        'display_method' => $_POST['display_method'],
    ];

    // Save $settings to your database or configuration file
    // Example: file_put_contents('settings.json', json_encode($settings));

    echo "Settings saved successfully!";
}
?>