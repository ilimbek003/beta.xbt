import React from "react";
import "./Home.css";
import Blocks from "../Blocks/Blocks";
import { NavLink } from "react-router-dom";

const Home = ({ color, data, datas }) => {
  return (
    <div className="home">
      <div className="container">
        <div className="wrapper">
          <h1>
            <span style={{ color: color ? "var(--green)" : "var(--orange)", paddingRight: '8px' }} className="first">XBT.KG</span>
            - идеальный способ купить или продать криптовалюту не выходя из дома
          </h1>
          <p>
            Прозрачные комиссии, наличие лицензии, большие резервы и отличная
            репутация гарантируют успех ваших обменных операций!
          </p>
          <div className="home-button-wrap">
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
            <NavLink to="/login" className="button outline home-login-button">Войти в личный кабинет</NavLink>
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
