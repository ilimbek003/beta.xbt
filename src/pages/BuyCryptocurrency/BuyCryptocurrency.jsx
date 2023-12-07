import React, { useEffect, useState, useMemo } from "react";
import "./BuyCryptocurrency.css";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { LineChart, Line } from "recharts";

const BuyCryptocurrency = ({ datas }) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [ratesArray, setRatesArray] = useState([]);

  useEffect(() => {
    const ratesArray = datas.map((el) => ({
      price: el.rates[0]?.price || 0,
    }));
    setRatesArray(ratesArray);
  }, [datas]);

  const filteredDatas = useMemo(() => {
    return datas.filter((obj) => {
      const fullName = obj.currency.toLowerCase();
      return fullName.includes(value.toLowerCase());
    });
  }, [datas, value]);

  return (
    <div id="buy_cryptocurrency">
      <div className="container">
        <div className="holder">
          <h1>Купить Криптовалюту</h1>
          <div className="width">
            <BiSearch className="search_i" />
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Поиск"
            />
          </div>
        </div>
        <div className="мarket">
          <h3>Название</h3>
          <h3 className="none_stroke">Цена</h3>
          <h3 className="none_stroke">Рынок</h3>
          <h3>Действие</h3>
        </div>
        {filteredDatas.map((el, id) => (
          <div key={id}>
            {el.can_buy === true ? (
              <div className="buy_cryp" id={id}>
                <div className="big">
                  <img src={el.logo} alt="" />
                  <div>
                    <h3>{el.currency}</h3>
                    <h6>{el.pro}</h6>
                  </div>
                </div>
                <h3 className="num">{el.rate}</h3>
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
                >
                  Купить
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCryptocurrency;
