<?php
// Sumber koneksi database php yang digunakan
    header('Access-Control-Allow-Origin: *');
    
    $servername = "Localhost";
    $username = "ravell";
    $password = "Password1!";
    $dbname = "db_cek_khodam";

    // Membuat koneksi
    $conn = new mysqli($servername, $username, $password, $dbname); 

    // Memeriksa koneksi
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>