import React, { useState } from "react";
import "./ForgotPassword.css";
import unsplash from "../../img/bg_register.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgot, postResponse } from "../../store/actions/forgotAction";
import Loading from "../../components/IU/loading/loading";
import { Alert } from "../../components/IU/alert/alert";

const ForgotPassword = ({ color }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const responseForgot = useSelector((state) => state.forgot);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsNavigating(true);
    try {
      const codeData = {
        email,
      };
      await dispatch(forgot(codeData));
    } catch (error) {
      if (error.response.data.messages) {
        setIsNavigating(false);
        Alert("error", error.response.data.messages);
      }
      setIsNavigating(false);
    }
    localStorage.setItem("data_register", email);
  };

  if (
    responseForgot &&
    responseForgot.responseForgot &&
    responseForgot.responseForgot.response === true
  ) {
    navigate("/login");
    setIsNavigating(false);
    Alert("success", responseForgot.responseForgot.messages);
    dispatch(postResponse(false));
  }

  return (
    <div className="forgot_password">
      <div className="container">
        <div className="wrapper">
          <div className="wrapper_login">
            <h1>Сбросить пароль</h1>
            <p> Укажите ваш Email, который использовался при регистрации</p>
            <form onSubmit={handleSubmit}>
              <label>E-mail</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                value={email}
                placeholder="E-mail"
              />
              <button
                disabled={isNavigating ? true : false}
                onSubmit={handleSubmit}
                style={{ background: color ? "var(--green)" : "var(--orange)" }}
                className="btn"
              >
                {isNavigating ? <Loading /> : "Отправить"}
              </button>
            </form>
          </div>
          <img className="bg_login" src={unsplash} alt="" />
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
