import React, { useState, useEffect } from "react";
import "./Home.css";
import bitcoin from "../../img/bitcoin.svg";
import Blocks from "../Blocks/Blocks";
import bg2 from "../../img/BG_home2.svg";
import { NavLink } from "react-router-dom";

const Home = ({ color, data, datas }) => {
  return (
    <div
      style={{
        background: `url(${bg2}) no-repeat center / cover`,
      }}
      className="home"
    >
      <div className="container">
        <div className="wrapper">
          <h1>
            <span
              style={{ color: color ? "var(--green)" : "var(--orange)" }}
              className="first"
            >
              XBT.KG
            </span>
          </h1>
          <p>
            (голубым) — (дальше белым) идеальный способ купить или продать
            криптовалюту не выходя из дома. Прозрачные комиссии, наличие
            лицензии, большие резервы и отличная репутация гарантируют успех
            ваших обменных операций!
          </p>
        </div>
        <div className="wrapper2"></div>
      </div>
      <div className="container_block">
        <Blocks data={data} datas={datas} />
      </div>
    </div>
  );
};

export default Home;
