import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import Rules from "../../files/pdf/Rules.pdf";
import Terms from "../../files/pdf/Terms.pdf";
import Xbt from "../../img/xbt-white-logo.svg";

const Footer = ({ color }) => {
  return (
    <div id="footer">
      <div className="container">
        <div className="footer_flex">
          <div className="footer_flex_block">
            <div className="logo">
              <img
                style={{ width: "110px", margin: "8px 0 0 5px" }}
                src={Xbt}
                alt=""
              />
            </div>
            <h5>Напишите нам:</h5>
            <h4>
              <a href="mailto:business@xbt.kg">business@xbt.kg</a>
            </h4>
          </div>
          <div className="footer_new_all">
            <h6>
              {" "}
              <NavLink to="/" className="page_home">
                {" "}
                Главная{" "}
              </NavLink>
            </h6>
            <h4>
              {" "}
              <NavLink to="/About" className="page">
                {" "}
                О компании{" "}
              </NavLink>
            </h4>
            <h4>
              {" "}
              <NavLink to="/News" className="page">
                {" "}
                Новости{" "}
              </NavLink>
            </h4>
            <h4>
              {" "}
              <NavLink to="contacts" className="page">
                {" "}
                Контакты{" "}
              </NavLink>
            </h4>
          </div>
          <div className="footer_new_all">
            <h6>Основное</h6>
            <h4>
              {" "}
              <NavLink to="/FAQ" className="page">
                {" "}
                FAQ{" "}
              </NavLink>
            </h4>
            <h4>
              {" "}
              <NavLink to="/Feedback" className="page">
                {" "}
                Отзывы{" "}
              </NavLink>
            </h4>
          </div>
          <div className="footer_new_all_blocks">
            <h6>Политика</h6>
            <h4>
              <NavLink to="/privacy-policy" target="_blank1">
                Политика конфиденциальности
              </NavLink>
            </h4>
            <h4>
              <NavLink to="/terms" target="_blank2">
                Условия использования
              </NavLink>
            </h4>
          </div>
        </div>
        <div className="foot">
          <p>Все права защищены 2023 &copy; XBT LLC</p>
          {/* <div className="icons">
            <img src={Instagram} />
            <img src={Facebook} />
            <img src={Twitter} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
