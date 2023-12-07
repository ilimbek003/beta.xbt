import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Register.css";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import bg from "../../img/bg_register.svg";
import { useDispatch } from "react-redux";
import { createPost, postResponse } from "../../store/actions/actionRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "../../components/IU/loading/loading";
import { Alert } from "../../components/IU/alert/alert";
import Terms from "../../files/pdf/Terms.pdf";

const RegisterPersonal = ({ color }) => {
  const [local, setLocal] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [password_confirm, setPassword_confirm] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const response = useSelector((state) => state.post);

  useEffect(() => {
    document.title = "Регистрация";
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLocal(token);
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 4;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsNavigating(true);
    try {
      if (!validateEmail(email)) {
        setEmailError(
          "Пожалуйста, введите действительный адрес электронной почты."
        );
        setIsNavigating(false);
      } else {
        setEmailError("");
      }
      if (!validatePassword(password)) {
        setPasswordError("Пароль должен иметь длину не менее 4 символов.");
        setIsNavigating(false);
      } else {
        setPasswordError("");
      }
      if (password !== password_confirm) {
        setPasswordConfirmError("Пароли не совпадают.");
        setIsNavigating(false);
      } else {
        setPasswordConfirmError("");
      }
      const codeData = {
        lastname,
        firstname,
        email,
        password,
        password_confirm,
      };
      await dispatch(createPost(codeData));
    } catch (error) {
      if (error.response.data.messages) {
        setIsNavigating(false);
        Alert("error", error.response.data.messages);
      }
      setIsNavigating(false);
    }
    localStorage.setItem("data_register", JSON.stringify(email));
  };

  if (response.response.response === true) {
    navigate("/account-activation");
    setIsNavigating(false);
    dispatch(postResponse(false));
  }

  return !local ? (
    <div className="register">
      <div className="container">
        <form onSubmit={handleSubmit} className="wrapper">
          <h1>Добро пожаловать!</h1>
          <p>
            Уже есть аккаунт?{" "}
            <NavLink
              style={{ color: color ? "var(--green)" : "var(--orange)" }}
              to="/login"
              className="come_in"
            >
              Войти
            </NavLink>
          </p>
          <div className="save">
            <div className="input_box">
              <label> Имя </label>
              <input
                type="text"
                placeholder="Имя"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className="input_box">
              <label> Фамилия </label>
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
                placeholder="Фамилия"
                required
              />
            </div>
          </div>
          <label> E-mail </label>
          <input
            type="text"
            placeholder="Введите Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          <div className="top"></div>
          <label> Пароль </label>
          <input
            id="password"
            type={visible ? "text" : "password"}
            placeholder="Придумайте пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="span-icon" onClick={() => setVisible(!visible)}>
            {" "}
            {visible ? <FaEye /> : <FaEyeSlash />}{" "}
          </span>
          <input
            id="password"
            className="top"
            type={visible2 ? "text" : "password"}
            placeholder="Повторите новый пароль"
            value={password_confirm}
            onChange={(e) => setPassword_confirm(e.target.value)}
            required
          />
          <span className="span-icon1" onClick={() => setVisible2(!visible2)}>
            {" "}
            {visible2 ? <FaEye /> : <FaEyeSlash />}{" "}
          </span>
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          {password_confirm && (
            <p style={{ color: "red" }}>{passwordConfirmError}</p>
          )}

          <div className="check">
            <p>
              Нажимая на кнопку «Регистрация», Вы принимаете условия{" "}
              <a
                style={{ color: color ? "var(--green)" : "var(--orange)" }}
                target="_blank"
                href={Terms}
              >
                Публичной оферты
              </a>
            </p>
          </div>
          <button
            disabled={isNavigating ? true : false}
            onSubmit={handleSubmit}
            style={{ background: color ? "var(--green)" : "var(--orange)" }}
            className="btn"
          >
            {isNavigating ? <Loading /> : "Регистрация"}
          </button>
        </form>
        <img className="bg_not" src={bg} alt="not" />
      </div>
    </div>
  ) : (
    <Navigate to="/" replace state={{ from: window.location.pathname }} />
  );
};

export default RegisterPersonal;
