<!-- Script php ini untuk flush data dari database mysql -->

<?php
// flush_data.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include 'koneksi.php';


// Cek koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Mengambil daftar tabel
$result = $conn->query("SHOW TABLES");
if ($result) {
    while ($row = $result->fetch_array()) {
        $table = $row[0];
        // Menghapus data dari setiap tabel
        $conn->query("DELETE FROM `$table`");
    }
    echo json_encode(["status" => "success", "message" => "All data flushed."]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to retrieve tables."]);
}

// Menutup koneksi
$conn->close();
?>