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
            {" "}
            <span
              style={{ color: color ? "var(--green)" : "var(--orange)" }}
              className="first"
            >
              {" "}
              Лови момент{" "}
            </span>{" "}
            лидер в продаже и обмене криптовалюты
          </h1>
          <p>
            Откройте двери к финансовой свободе с нашей интуитивно понятной
            платформой для продажи, обмена и покупки криптовалюты
          </p>
          <NavLink to="/register-personal">
            <button
              style={{
                background: color ? "var(--green)" : "var(--orange)",
              }}
              className="btn"
            >
              Присоединиться к XBT
            </button>
          </NavLink>
        </div>
        <div className="wrapper2">
          <p>
            Погрузитесь в мир криптовалютных возможностей и начните финансовое
            путешествие прямо сейчас!
          </p>
          <div className="save">
            <img src={bitcoin} />
            <div className="box">
              <p className="bold"> 5000 + </p>
              <p>пользователей Кыргызстана</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container_block">
        <Blocks data={data} datas={datas} />
      </div>
    </div>
  );
};

export default Home;
