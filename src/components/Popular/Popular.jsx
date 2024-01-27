import React, { useState, useEffect } from "react";
import "./Popular.css";
import { Line, LineChart } from "recharts";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../IU/loading/loading";
import { Alert } from "../IU/alert/alert";
import warning from "react-redux/es/utils/warning";

const chart = [
  { name: "2017", react: 32, angular: 27, vue: 60 },
  { name: "2018", react: 56, angular: 34, vue: 54 },
  { name: "2019", react: 45, angular: 41, vue: 54 },
  { name: "2020", react: 60, angular: 42, vue: 28 },
  { name: "2021", react: 51, angular: 31, vue: 27 },
  { name: "2022", react: 90, angular: 48, vue: 49 },
];
const Popular = ({ color, data, datas }) => {
  const navigate = useNavigate();
  const [dataFromLocalStorage, setDataFromLocalStorage] = useState(false);
  const [ratesArray, setRatesArray] = useState([]);

  useEffect(() => {
    const ratesArray = datas.map((el, index) => ({
      price: el.rates[index]?.price || index,
    }));
    setRatesArray(ratesArray);
  }, [datas]);

  useEffect(() => {
    const emailFromLocalStorage = localStorage.getItem("data_register");
    setDataFromLocalStorage(!!emailFromLocalStorage);
  }, []);

  const handleStartTrading = () => {
    if (!dataFromLocalStorage) {
      navigate("/register-personal");
      Alert("warning", "вы не авторизован");
    } else {
      navigate("/dashboard/buy-cryptocurrency");
    }
  };

  return (
    <div className="popular">
      <div className="container">
        <h1>Популярные криптовалюты</h1>
        <div className="wrapper">
          <div className="boxs">
            <p>Торговая пара</p>
            <p>Цена</p>
            <p>Обьем 24ч (USDT)</p>
            <p>Рынок</p>
            <p className="do">Действие</p>
          </div>
          <div className="secend">
            <p>Торговая пара</p>
            <p>Цена</p>
          </div>
          {data.map((el, i, key) => (
            <div>
              <div key={i} className="box first">
                <div className="logo_div">
                  <img src={el.logo} alt="" />
                  <p className="title">{el.name}</p>
                </div>
                <p>{el.rate}</p>
                <p
                  style={{
                    color: el.difference.includes("-") ? "red" : "#30E0A1",
                  }}
                >
                  {el.difference}
                </p>
                <LineChart
                  className="line_chart"
                  width={120}
                  height={35}
                  data={ratesArray}
                >
                  <Line
                    type="First dataset"
                    dataKey="price"
                    stroke={el.difference.includes("-") ? "red" : "#30E0A1"}
                    dot={false}
                  />
                </LineChart>
                <button
                  onClick={() =>
                    navigate(`/dashboard/buy-cryptocurrency/${el.currency}`)
                  }
                  style={{
                    color: color ? "var(--green)" : "var(--orange)",
                    border: color
                      ? "1px solid var(--green)"
                      : "1px solid var(--orange)",
                  }}
                  className="trade"
                >
                  {" "}
                  Торговля{" "}
                </button>
              </div>
              <div key={key} className="box secend">
                <div className="logo_div">
                  <img src={el.logo} alt="" />
                  <p className="title">{el.currency}</p>
                </div>
                <p>{el.rate}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleStartTrading}
          style={{ background: color ? "var(--green)" : "var(--orange)" }}
          className="start"
        >
          {" "}
          Начать торговлю{" "}
        </button>
      </div>
    </div>
  );
};

export default Popular;
