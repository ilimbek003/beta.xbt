import React, { useState } from "react";
import "./Head.css";
import { MdAccountBalanceWallet } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiOutlineLock } from "react-icons/ai";
import { FaWallet, FaShoppingBag } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { BsFillCreditCardFill } from "react-icons/bs";
import {
  IoNewspaperSharp,
  IoPaperPlane,
  IoSettingsSharp,
} from "react-icons/io5";
import axios from "axios";
import { url } from "../../api";
import Loading2 from "../IU/loading2/loading2";
import Xbt from "../../img/xbt-white-logo.svg";

const Head = ({
  home,
  setColor,
  color,
  datas,
  datas_personal,
  setIsAuthenticated,
}) => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const [modalBurger, setModalBurger] = useState(false);

  const handleLogout = () => {
    axios
      .post(url + "/auth/logout")
      .then((response) => {
        localStorage.removeItem("data_register");
        localStorage.removeItem("token");
        localStorage.removeItem("expires");
        window.location.replace("/login");
      })
      .catch((error) => {
        alert("Logout failed:", error);
      });
  };

  if (home) {
    handleLogout();
    setIsAuthenticated(false);
  }

  const balanceFilter = datas
    .filter((obj) => {
      return obj.currency.includes("USDT");
    })
    .map((el) => el.balance);

  return (
    <div className="head">
      <div className="container">
        <div className="wrapper_balanse">
          <div className="balanse">
            <div className="circle">
              <MdAccountBalanceWallet
                color={color ? "var(--green)" : "var(--orange)"}
                size={24}
              />
            </div>
            <div>
              <h3>Ваш баланс</h3>
              <h3>{balanceFilter ? balanceFilter : <Loading2 />}</h3>
            </div>
          </div>
          <div onClick={() => setColor(!color) || navigate("/")}>
            <img style={{ height: "25px" }} src={Xbt} alt="" />
          </div>
          <div className="user">
            <img
              src={datas_personal[0] ? datas_personal[0].avatar : ""}
              alt=""
            />
            <h1>
              {datas_personal[0] ? datas_personal[0].firstname : "загрузка"}{" "}
              {datas_personal[0] ? datas_personal[0].lastname : ""}
              <RxExit
                onClick={handleLogout}
                style={{
                  marginLeft: 10,
                  cursor: "pointer",
                  color: color ? "var(--green)" : "var(--orange)",
                }}
                size={20}
              />
            </h1>
          </div>
          <div onClick={() => setMenu(!menu)} className="hamburger none">
            <div
              style={{ background: color ? "var(--green)" : "var(--orange)" }}
            ></div>
            <div
              style={{ background: color ? "var(--green)" : "var(--orange)" }}
            ></div>
            <div
              style={{ background: color ? "var(--green)" : "var(--orange)" }}
            ></div>
          </div>
        </div>
        <div className="wrapper_menu">
          <NavLink to="home" className="menu_router">
            <AiFillHome className="icon" size={25} />
            Главная
          </NavLink>
          <NavLink to="top-up" className="menu_router">
            <FaWallet className="icon" size={25} />
            Пополнить
          </NavLink>
          <NavLink to="translation" className="menu_router">
            <GiWallet className="icon" size={25} />
            Вывести
          </NavLink>
          <NavLink to="sell-cryptocurrency" className="menu_router">
            <RiMoneyDollarCircleLine className="icon" size={25} />
            Продать
          </NavLink>
          <NavLink to="buy-cryptocurrency" className="menu_router">
            <FaShoppingBag className="icon" size={25} />
            Купить
          </NavLink>
          <button
            style={{ outline: "none", border: "none", position: "relative" }}
            disabled={true}
            className="menu_router"
          >
            <BsFillCreditCardFill className="icon" size={25} />
            Оплата услуг
            <AiOutlineLock
              style={{ color: "red", position: "absolute", right: 0, top: 0 }}
              size={20}
            />
          </button>
          <NavLink to="settings" className="menu_router">
            <IoSettingsSharp className="icon" size={25} />
            Настройки
          </NavLink>
          <div onClick={() => setMenu(!menu)} className="hamburger">
            <div
              style={{ background: color ? "var(--green)" : "var(--orange)" }}
            ></div>
            <div
              style={{ background: color ? "var(--green)" : "var(--orange)" }}
            ></div>
            <div
              style={{ background: color ? "var(--green)" : "var(--orange)" }}
            ></div>
          </div>
        </div>
        {menu && (
          <>
            <div onClick={() => setMenu(false)} className="menu_modal"></div>
            <div onClick={() => setMenu(false)} className="menu">
              <div className="user none">
                <img
                  src={datas_personal[0] ? datas_personal[0].avatar : ""}
                  alt=""
                />
                <h1>
                  {datas_personal[0] ? datas_personal[0].firstname : "загрузка"}{" "}
                  {datas_personal[0] ? datas_personal[0].lastname : ""}
                  <RxExit
                    onClick={handleLogout}
                    style={{
                      marginLeft: 20,
                      cursor: "pointer",
                      color: color ? "var(--green)" : "var(--orange)",
                    }}
                    size={20}
                  />
                </h1>
              </div>
              <NavLink to="home" className="menu_router">
                <AiFillHome className="icon" size={25} />
                Главная
              </NavLink>
              <NavLink to="top-up" className="menu_router">
                <FaWallet className="icon" size={25} />
                Пополнить
              </NavLink>
              <NavLink to="translation" className="menu_router">
                <GiWallet className="icon" size={25} />
                Вывести
              </NavLink>
              <NavLink to="sell-cryptocurrency" className="menu_router">
                <RiMoneyDollarCircleLine className="icon" size={25} />
                Продать
              </NavLink>
              <NavLink to="buy-cryptocurrency" className="menu_router">
                <FaShoppingBag className="icon" size={25} />
                Купить
              </NavLink>
              <button
                style={{
                  outline: "none",
                  border: "none",
                  position: "relative",
                }}
                disabled={true}
                className="menu_router"
              >
                {/* <NavLink to="payment-for-services" className="menu_router"> */}
                <BsFillCreditCardFill className="icon" size={25} />
                Оплата услуг
                <AiOutlineLock
                  style={{
                    color: "red",
                    position: "absolute",
                    right: 0,
                    top: 0,
                  }}
                  size={20}
                />
                {/* </NavLink> */}
              </button>
              <NavLink to="settings" className="menu_router">
                <IoSettingsSharp className="icon" size={25} />
                Настройки
              </NavLink>
              <NavLink to="operations" className="menu_router">
                <IoNewspaperSharp className="icon" size={25} />
                Операции
              </NavLink>
              {/* <NavLink to="send-funds" className="menu_router">
                <IoPaperPlane className="icon" size={25} />
                Отправка
              </NavLink> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Head;
