import React, { useEffect, useState } from "react";
import Home from "../../components/Home/Home";
import Popular from "../../components/Popular/Popular";
import BuyCurrency from "../../components/BuyCurrency/BuyCurrency";
import Amazing from "../../components/Amazing/Amazing";
import Stay from "../../components/Stay/Stay";
import TheySay from "../../components/TheySay/TheySay";
import Advantages from "../../components/Advantages/Advantages";
import Questions from "../../components/Questions/Questions";
import axios from "axios";
import { url } from "../../api";

const Main = ({ color, reviewData }) => {
  const [popular, setPopular] = useState([]);
  const data = Object.values(popular).map((data) => data);
  const [count, setCount] = useState([]);
  const datas = Object.values(count).map((data) => data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + "/index");
        setPopular(response.data.currencies);
      } catch (error) {
        console.log("Ошибка:", error);
      }
    };

    

    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get(url + "/currencies")
      .then((response) => {
        setCount(response.data.currencies);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    document.title = "XBT - Покупка. Продажа. Обмен криптовалюты";
  }, []);

  return (
    <div className="main">
      <Home data={data} color={color} datas={datas} />
      <Popular data={data} color={color} datas={datas} />
      {/* <Amazing color={color} />  */}
      <Stay color={color} />
      <Advantages color={color} />
      {/* <BuyCurrency color={color} /> */}
      <TheySay color={color} reviewData={reviewData} />
      <Questions color={color} />
    </div>
  );
};

export default Main;
