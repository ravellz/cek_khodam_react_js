<?php
// Script php untuk validasi untuk fitur anti-double input ke database
// Jadi setiap nama akan dapat 1 khodam yang sama untuk 1 hari tersebut, direset setiap harinya untuk dapat khodam yang lain 

    header('Access-Control-Allow-Origin: *');
    include 'koneksi.php';

    
    if(mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    } else {
        echo json_encode(['message' => 'PHP API connected']);
        $nama = $_POST['nama'];
        $khodam = $_POST['khodam'];

        // Sanitasi input
        $nama = $conn->real_escape_string($nama);
        $khodam = $conn->real_escape_string($khodam);

        // Query untuk memeriksa keberadaan nama
        $queryShowNama = "SELECT * FROM tb_khodam WHERE nama = '$nama'";
        $sqlShowNama = mysqli_query($conn, $queryShowNama);

        // Periksa apakah query berhasil dan ada hasil
        if ($sqlShowNama && mysqli_num_rows($sqlShowNama) > 0) {
            $result = mysqli_fetch_assoc($sqlShowNama);
            $showKhodam = $result['khodam'];

            // Periksa apakah nama sudah ada
            if (strcasecmp($_POST['nama'], $result['nama']) == 0) {
                echo json_encode($showKhodam);
            }
        } else {
            // Jika nama tidak ada dalam database, lakukan insert
            $sql = "INSERT INTO tb_khodam(nama, khodam) VALUES('$nama', '$khodam')";
            $res = mysqli_query($conn, $sql);

            if ($res) {
                echo $khodam;
            } else {
                echo "Error: " . mysqli_error($conn); // Tambahkan detail error untuk debugging
            }
        }
    }

    // Tutup koneksi
    $conn->close();
?>