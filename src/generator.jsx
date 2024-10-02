import "./generator.css";
import React, { useState } from "react";
import axios from "axios";

const Generator = () => {
  // Untuk input nama orangnya
  const [nama, setNama] = useState("");
  // Untuk ganti dari button Cek Khodam ke Cek Khodam Nama Yang Lain
  const [isSwitcher, setIsSwitcher] = useState(false);
  // Bikin kolom input jadi gabisa diisi biar kalau mau isi lagi harus pencet tombol Cek Khodam Nama Yang Lain
  const [isDisabled, setIsDisabled] = useState(false);
  // Untuk mengambil data khodam dari database yang dikirimkan dari phpmyadmin melewati proses query dari php lalu di parsing ke reactjs
  const [data, setData] = useState(null);
  // Untuk simpan data hasil randomizer khodam
  const [khodam, setKhodam] = useState(null);

  // Untuk ganti value nama dari kosong ("") ke nama orangnya
  const handleNama = (event) => {
    setNama(event.target.value);
  };

  // Tombol Cek Khodam yang multifungsi
  const handleClick = (el) => {
    if (nama == "evan" || nama == "Evan") {
      let hasilKhodam = "Dina My Lop";
      // document.getElementById("display").innerHTML = hasilKhodam;

      // axios untuk nyambungin ke database pake php
      const url = "https://khodam.ravell.online/db_khodam/koneksi.php";
      let fData = new FormData();
      // kayaknya append ini gunanya untuk passing data ke php, valuenya bebas yang penting yang di dalam petik "blabla" itu sama kayak di php bagian $nama = $_POST[' blabla'];
      fData.append("nama", nama);
      fData.append("khodam", hasilKhodam);
      axios
        .post(url, fData)
        .then((response) => setData(response.data))
        .catch((error) => alert(error));

      setIsSwitcher(!isSwitcher);
      setIsDisabled(!isDisabled);
      setKhodam(hasilKhodam);
    } else if (nama == "") {
      // validasi input biar ngga kosong
      alert("Masukkan Nama Terlebih Dahulu");
    } else {
      // Randomizer untuk randomize kata yang terdiri dari kata depan + kata belakang yang diacak sehingga jadi hasilKhodam
      let depan = [
        "Babi",
        "Unta",
        "Katak",
        "Kerbau",
        "Singkong",
        "Janda",
        "Tupai",
        "Belalang",
        "Cencorang",
        "Nenek",
      ];
      let belakang = [
        "Rabun",
        "Breakdance",
        "Sipit",
        "Seksi",
        "Gondrong",
        "Workaholic",
        "Belanda",
        "Jaipong",
        "Dirajam",
        "Pembuli",
        "Kayang",
      ];

      let kataDepan = Math.floor(Math.random() * depan.length);
      let kataBelakang = Math.floor(Math.random() * belakang.length);
      let hasilKhodam = depan[kataDepan].concat(" ", belakang[kataBelakang]);
      // document.getElementById("display").innerHTML = hasilKhodam;

      // Block code axios untuk menyambungkan dan passing data ke koneksi.php biar bisa dipakai disana
      const url = "https://khodam.ravell.online/db_khodam/validation.php";
      let fData = new FormData();
      // "nama" disini bukan diambil dari id atau classname seperti metode koneksi ke php vanilla, tapi sebagai inisial yang dapat dipanggil di koneksi.php.
      // Karena hal diataslah sebenarnya ngga perlu nyamain id/classname nya kayak metode POST biasa di php, jadi value yang kanan itu bisa ngambil dari variabel apa aja (bisa useState atau variabel langsung dari blok kode logika/matematika. cth randomizer yang ada diatas.)
      fData.append("nama", nama);
      // hasilKhodam disini diambil dari pure hasil randomizer dan ngga pake useState. 3 hari nyari errornya, ternyata solusinya semudah ngga usah pake useState karena ngga harus ngambil value dari input yang bergantung pada id/classname nya untuk metode POST :')
      fData.append("khodam", hasilKhodam);
      axios
        .post(url, fData)
        .then((response) => setData(response.data))
        .catch((error) => alert(error));

      setKhodam(hasilKhodam);
      setIsSwitcher(!isSwitcher);
      setIsDisabled(!isDisabled);
    }
    // Bikin tombolnya ngga langsung reset karena bentuk tombolnya input bukan button yang punya default nge-refresh page
    el.preventDefault();
  };

  // Fungsi untuk refresh page biar bisa ulang dari awal isi nama orangnya
  const refreshButton = () => {
    window.location.reload(false);
  };

  // const handleFlushData = async () => {
  //   try {
  //     const response = await fetch("https://khodam.ravell.online/db_khodam/cleanup.php", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const result = await response.json();

  //     if (result.status === "success") {
  //       alert(result.message);
  //     } else {
  //       alert(result.message);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Failed to flush data.");
  //   }
  // };

  return (
    <div className="bg">
      <div className="body">
        <div className="flex">
          <h1 className="title">Cek Khodam</h1>
          <form>
            <input
              id="nama"
              className="nama"
              type="text"
              placeholder="Masukkan Nama"
              onChange={handleNama}
              value={nama}
              // disabled isinya true or false untuk aktif dan non-aktifin fitur disablednya
              disabled={isDisabled}
            />
            <div className="show" id="display">
              {isSwitcher ? data : khodam}
            </div>
            <div className="flex-btn">
              {isSwitcher ? (
                <input
                  type="submit"
                  value="Cek Khodam Nama Yang Lain"
                  id="ref"
                  className="btn"
                  onClick={refreshButton}
                />
              ) : (
                <input
                  type="submit"
                  value="Cek Khodam Kamu"
                  id="btn"
                  className="btn"
                  onClick={handleClick}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Generator;
