<?php
$host = 'localhost';
$db = 'u868493737_BeeBrand';
$user = 'u868493737_BeeBrand';
$pass = 'Sarkans7nieks.';

// Establish a connection using mysqli_connect
$mysqli = mysqli_connect($host, $user, $pass, $db);

// Check connection
if (!$mysqli) {
    die('Connection failed: ' . mysqli_connect_error());
} else {
    echo 'Connection successful';
}
?>