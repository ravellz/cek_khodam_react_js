<!-- Sumber koneksi database php yang digunakan -->

<?php
    header('Access-Control-Allow-Origin: *');
    
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "db_cek_khodam";

    // Membuat koneksi
    $conn = new mysqli($servername, $username, $password, $dbname); 

    // Memeriksa koneksi
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>