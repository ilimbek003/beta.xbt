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
        {filteredDatas.map((el, id) => (
          <div key={id}>
            {el.can_buy === true ? (
              <div className="buy_cryp" id={id}>
                <div className="with_bys" style={{ margin: "0 0 0 5px" }}>
                  <div className="big">
                    {/* <img src={el.logo} alt="" /> */}
                    <div>
                      <h3>{el.currency}</h3>
                      <h6>{el.pro}</h6>
                    </div>
                  </div>
                  <h3 className="мarket_h3">Название</h3>
                </div>
                <div className="with_bys">
                  <h3>${el.rate}</h3>
                  <h3 className="мarket_h3">Цена</h3>
                </div>
                <div className="with_bys">
                  <h3>{el.balance}</h3>
                  <h2
                    style={{
                      color: el.converted_balance > 0 ? "#0F8F67" : "red",
                    }}
                    className="мarket_h2"
                  >
                    {"$" + el.converted_balance}
                  </h2>
                </div>
                <div className="with_bys">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/buy-cryptocurrency/${el.currency}`)
                    }
                  >
                    Купить
                  </button>
                </div>
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
