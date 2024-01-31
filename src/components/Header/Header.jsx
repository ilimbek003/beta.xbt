import React, {useState, useEffect} from "react";
import "./Header.css";
import {NavLink, useNavigate} from "react-router-dom";
import Xbt from "../../img/xbt-white-logo.svg"
const Header = ({setColor, color, isAuthenticated}) => {
    const [local, setLocal] = useState("");
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLocal(token);
        }
    }, []);

    return (
        <div className="header">
            <div className="container">
                <div
                    className="color"
                    onClick={() => setColor(!color) || navigate("/") || setMenu(false)}
                >
                    <img src={Xbt} alt="XBT LLC" className="logo-header"/>
                </div>
                <input
                    checked={menu}
                    onChange={() => setMenu(!menu)}
                    id="toggle"
                    type="checkbox"
                ></input>
                <label htmlFor="toggle" className="hamburger">
                    <div
                        className="top-bun"
                    ></div>
                    <div
                        className="meat"
                    ></div>
                    <div
                        className="bottom-bun"
                    ></div>
                </label>
                <div className="pages">
                    <NavLink to="/" className="page">
                        {" "}
                        Главная{" "}
                    </NavLink>
                    <NavLink to="/about" className="page">
                        {" "}
                        О компании{" "}
                    </NavLink>
                    <NavLink to="/news" className="page">
                        {" "}
                        Новости{" "}
                    </NavLink>
                    <NavLink to="/feedback" className="page">
                        {" "}
                        Отзывы{" "}
                    </NavLink>
                    <NavLink to="/faq" className="page">
                        {" "}
                        FAQ{" "}
                    </NavLink>
                    <NavLink to="contacts" className="page">
                        Контакты{" "}
                    </NavLink>
                </div>
                <div className="battons">
                    <h1 style={{display: isAuthenticated ? "block" : "none"}}></h1>
                    <NavLink
                        style={{display: isAuthenticated ? "none" : "block"}}
                        to="/login"
                        className="login"
                    >
                        {" "}
                        Войти{" "}
                    </NavLink>
                    {isAuthenticated ? (
                        <NavLink
                            style={{background: color ? "var(--green)" : "var(--orange)"}}
                            className="btn dashboard"
                            to="/dashboard/home"
                        >
                            Личный кабинет
                        </NavLink>
                    ) : (
                        <NavLink
                            style={{background: color ? "var(--green)" : "var(--orange)"}}
                            to="/register-personal"
                            className="btn"
                        >
                            Регистрация
                        </NavLink>
                    )}
                </div>
            </div>
            {menu && (
                <div onClick={() => setMenu(false)} className="nav">
                    <div className="nav_wrapper">
                        <NavLink to="/" className="page">
                            {" "}
                            Главная
                        </NavLink>
                        <NavLink to="/about" className="page">
                            {" "}
                            О компании{" "}
                        </NavLink>
                        <NavLink to="/news" className="page">
                            {" "}
                            Новости{" "}
                        </NavLink>
                        <NavLink to="contacts" className="page">
                            Контакты{" "}
                        </NavLink>
                        <NavLink to="/faq" className="page">
                            {" "}
                            FAQ{" "}
                        </NavLink>
                        <NavLink to="/feedback" className="page">
                            {" "}
                            Отзывы{" "}
                        </NavLink>
                        <NavLink
                            style={{display: isAuthenticated ? "none" : "block"}}
                            to="/login"
                            className="login"
                        >
                            {" "}
                            Войти{" "}
                        </NavLink>
                        {isAuthenticated ? (
                            <NavLink
                                style={{background: color ? "var(--green)" : "var(--orange)"}}
                                className="btn dashboard"
                                to="/dashboard/home"
                            >
                                Личный кабинет
                            </NavLink>
                        ) : (
                            <NavLink
                                style={{background: color ? "var(--green)" : "var(--orange)"}}
                                to="/register-personal"
                                className="btn"
                            >
                                Регистрация
                            </NavLink>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
