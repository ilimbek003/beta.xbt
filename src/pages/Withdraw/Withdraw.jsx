import React, { useState } from "react";
import "./Withdraw.css";
import { BiSearch } from "react-icons/bi";
import Loading from "../../components/IU/loading/loading";
import { useNavigate } from "react-router-dom";

const Withdraw = ({
  datas,
  datas_personal,
  setAccount,
  account,
  setProfile,
}) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const verification = datas_personal[0]?.verification;

  return (
    <div className="withdraw">
      {datas[0] ? (
        <div className="container">
          <div className="holder">
            <h1>Вывести средства</h1>
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
          <div className="wrapper">
            {datas
              .filter((obj) => {
                const fullName = obj.currency.toLowerCase();
                return fullName.includes(value.toLowerCase());
              })
              .map((el, index) =>
                el.can_withdraw == true ? (
                  <div
                    // onClick={() =>
                    //   verification?.value == 1
                    //     ? navigate("/dashboard/settings") ||
                    //       setAccount(!account)
                    //     : null || verification?.value == 2
                    //     ? navigate(`/dashboard/translation/${el.currency}`) ||
                    //       localStorage.setItem("balance", el.balance)
                    //     : null || verification?.value == 3
                    //     ? navigate("/dashboard/settings") ||
                    //       setAccount(!account) ||
                    //       setProfile(false)
                    //     : null || verification?.value == 4
                    //     ? navigate("/dashboard/settings")
                    //     : null || setAccount(!account) || setProfile(false)
                    // }
                    onClick={() =>
                      navigate(`/dashboard/translation/${el.currency}`) ||
                      localStorage.setItem("balance", el.balance)
                    }
                    key={index}
                    className="box"
                  >
                    <img src={el.logo} alt="" />
                    <div>
                      <h1>{el.currency}</h1>
                      <p>{el.name}</p>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
          </div>
        </div>
      ) : (
        <div className="loading_div">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Withdraw;
