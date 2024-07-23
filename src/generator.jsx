import "./generator.css";
import React, { useState } from "react";

const Generator = () => {
  const [inputValue, setInputValue] = useState("");
  const [isButtonSwitcher, setIsButtonSwitcher] = useState(true);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = (el) => {
    if (inputValue == "evan" || inputValue == "Evan") {
      document.getElementById("display").innerHTML = "CIEE DINAAAA";
      setIsButtonSwitcher(!isButtonSwitcher);
    } else if (inputValue == "") {
      alert("Masukkan Nama Terlebih Dahulu");
    } else {
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

      let modDepan = Math.floor(Math.random() * depan.length);
      let modBelakang = Math.floor(Math.random() * belakang.length);
      document.getElementById("display").innerHTML = depan[modDepan].concat(
        " ",
        belakang[modBelakang]
      );
      console.log(depan[modDepan], belakang[modBelakang]);
      setIsButtonSwitcher(!isButtonSwitcher);
    }
    el.preventDefault();
  };

  const refreshButton = () => {
    window.location.reload(false);
  };

  return (
    <div className="bg">
      <div className="body">
        <div className="flex">
          <h1 className="title">Cek Khodam</h1>
          <form action="">
            <input
              id="nama"
              className="nama"
              type="text"
              placeholder="Masukkan Nama"
              onChange={handleInputChange}
              value={inputValue}
            />
            <div className="show" id="display">
              -
            </div>
            <div className="flex-btn">
              {isButtonSwitcher ? (
                <input
                  type="submit"
                  value="Cek Khodam Kamu"
                  id="btn"
                  className="btn"
                  onClick={handleClick}
                />
              ) : (
                <input
                  type="submit"
                  value="Cek Khodam Nama Yang Lain"
                  id="ref"
                  className="btn"
                  onClick={refreshButton}
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
