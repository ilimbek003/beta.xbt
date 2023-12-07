import React, { useEffect, useState } from "react";
import "./Navigetion.css";
import { codeAction } from "../../store/actions/actionCode";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/IU/loading/loading";
import unsplash from "../../img/bg_register.svg";
import { postResponse } from "../../store/actions/actionRegister";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../components/IU/alert/alert";

const Navigetion = ({ color, setIsAuthenticated }) => {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const [isNavigating, setIsNavigating] = useState(false);
  const response = useSelector((state) => state.coding);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length >= 6) {
      setIsNavigating(true);
      const emailFromLocalStorage = localStorage.getItem("data_register");
      const parsedData = JSON.parse(emailFromLocalStorage);
      const codeData = {
        code,
        email: parsedData,
      };
      dispatch(codeAction(codeData));
    } else {
      Alert("error", "введите шести значный код!");
    }
  };

  useEffect(() => {
    if (
      response &&
      response.response &&
      response.response.response &&
      response.response.response.data &&
      response.response.response.data.messages
    ) {
      Alert("error", response.response.response.data.messages);
      setIsNavigating(false);
    }
  }, [response]);

  useEffect(() => {
    if (response.response.response === true) {
      setIsNavigating(false);
      dispatch(postResponse(false));
      navigate("/dashboard/home");
      setIsAuthenticated(true);
      localStorage.setItem("token", response.response.token);
      localStorage.setItem(
        "expires",
        JSON.stringify(response.response.expires)
      );
    }
  }, [response.response.response]);

  const submitCode = code === "";
  return (
    <div className="navigetion">
      <div className="container">
        <div className="wrapper">
          <div className="wrapper_navigetion">
            <h1> Подтверждение почты </h1>
            <p>
              Мы отправили вам на почту код подтверждения. Пожалуйста, введите
              его в поле ниже
            </p>
            <form onSubmit={handleSubmit}>
              <label>Код подтверждения</label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="number"
                placeholder="Код подтверждения"
              />
              <button
                style={{ background: color ? "var(--green)" : "var(--orange)" }}
                disabled={submitCode || isNavigating ? true : false}
                onSubmit={handleSubmit}
              >
                {isNavigating ? <Loading /> : "Продолжить"}
              </button>
            </form>
          </div>
          <img className="bg_login" src={unsplash} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navigetion;
