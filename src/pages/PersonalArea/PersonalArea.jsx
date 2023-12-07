import React, { useEffect, useState } from "react";
import "./PersonalArea.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Head from "../../components/Head/Head";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import TopUp from "../TopUp/TopUp";
import Settings from "../Settings/Settings";
import SendFunds from "../Sendfunds/SendFunds";
import Operations from "../Operations/Operations";
import axios from "axios";
import { url } from "../../api";
import PaymentFor from "../PaymentFor/PaymentFor";
import Withdraw from "../Withdraw/Withdraw";
import Translation from "../Translation/Translation";
import BuyCryptocurrency from "../BuyCryptocurrency/BuyCryptocurrency";
import ProtocolBuy from "../ProtocolBuy/ProtocolBuy";
import SellCryptocurrency from "../SellCryptocurrency/SellCryptocurrency";
import Protocol from "../Protocol/Protocol";
import Cabinet from "../Cabinet/Cabinet";

const  PersonalArea = ({ color, setColor, setIsAuthenticated }) => {
  const [home, setHome] = useState(false);
  const navigate = useNavigate();
  const [local, setLocal] = useState("");
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState([]);
  const [log, setLog] = useState([]);
  const [personal, setPersonal] = useState([]);
  const datas = Object.values(count).map((data) => data);
  const datas_log = Object.values(log).map((data) => data);
  const datas_personal = Object.values(personal).map((data) => data);
  const is2faEnabled = personal && personal.profile && personal.profile.security['2fa']

  useEffect(() => {
    document.title = "XBT - Покупка. Продажа. Обмен криптовалюты";
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLocal(token);
    }
  }, []);

  const headers = {
    Authorization: `Bearer ${local}`,
  };

  useEffect(() => {
    if (local) {
      axios
        .get(url + "/currencies", { headers })
        .then((response) => {
          setCount(response.data.currencies);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [local]);

  function balanceTether() {
    if (local) {
      axios
        .get(url + "/currencies", { headers })
        .then((response) => {
          setCount(response.data.currencies);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  useEffect(() => {
    if (local) {
      axios
        .get(url + "/profile/action-log", { headers })
        .then((response) => {
          console.log(response.data)
          setLog(response.data.action);
        })
        .catch((error) => {
          console.error("Error:", error);
          setHome(true);
        });
    }
  }, [local]);

  useEffect(() => {
    if (local) {
      axios
        .get(url + "/profile/personal", { headers })
        .then((response) => {
          setPersonal(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [local]);

  function personalChange() {
    if (local) {
      axios
        .get(url + "/profile/personal", { headers })
        .then((response) => {
          setPersonal(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  useEffect(() => {
    if (local) {
      axios
        .get(url + "/profile/action-log", { headers })
        .then((response) => {
          setLog(response.data.list.query);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [local]);
  return (
    <div className="personal_area">
      <Head
        home={home}
        color={color}
        setColor={setColor}
        datas={datas}
        datas_personal={datas_personal}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        <Route path="top-up" element={<TopUp color={color} />} />
        <Route
          path="top-up/:nikcurrancy"
          element={<TopUp color={color} currencies={datas} />}
        />
        <Route
          path="home"
          element={
            <Cabinet
              color={color}
              datas={datas}
              datas_personal={datas_personal}
              datas_log={datas_log}
              loading={loading}
            />
          }
        />
        <Route
          path="settings"
          element={
            <Settings
                is2faEnabled={is2faEnabled}
              color={color}
              datas_personal={datas_personal}
              personalChange={personalChange}
              personal={personal}
              setPersonal={setPersonal}
            />
          }
        />
        <Route path="translation" element={<Withdraw datas={datas} />} />
        <Route
          path="translation/:currancy"d
          element={
            <Translation
              datas_tran={datas}
              color={color}
              balanceTether={balanceTether}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="operations" element={<Operations />} />
        <Route path="send-funds" element={<SendFunds />} />
        <Route path="payment-for-services" element={<PaymentFor />} />
        <Route
          path="buy-cryptocurrency"
          element={<BuyCryptocurrency datas={datas} />}
        />
        <Route
          path="buy-cryptocurrency/:id"
          element={
            <ProtocolBuy balanceTether={balanceTether} currencies={datas} />
          }
        />
        <Route
          path="sell-cryptocurrency"
          element={<SellCryptocurrency datas={datas} />}
        />
        <Route
          path="sell-cryptocurrency/:name"
          element={
            <Protocol balanceTether={balanceTether} currencies={datas} />
          }
        />
      </Routes>
    </div>
  );
};

export default PersonalArea;
