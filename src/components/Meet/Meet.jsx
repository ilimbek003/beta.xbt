import React from "react";
import "./Meet.css";
import coin from "../../img/crypto_atm.png";

const Meet = ({ color }) => {
  return (
    <div className="meet">
      <div className="container">
        <div className="save1">
          <div className="wrapper">
            <h1>
              Искали надежный сервис для обмена крипты?
              <span
                className="meet_green"
                style={{ color: color ? "#4ac49e" : "#ff5c00" }}
              >
                {" "}Вы его нашли!
              </span>
            </h1>
          </div>
          <div className="about-image-block">
            <img className="image" src={coin} alt="XBT LLC - About image" width="350px" />
          </div>
        </div>
        <div className="save2">
          <h1>О компании</h1>
          <p>
            XBT.kg — это сервис отвечающий даже самым серьезным запросам! XBT не просто обменка, а самое главное дело в нашей жизни, нам действительно важен каждый наш клиент. Вы сможете пополнить баланс вашего аккаунта из любого, даже самого отдаленного места в Кыргызстане, а с помощью банковского перевода вы сможете пополнить свой аккаунт или вывести деньги в любую страну мира. Прозрачные комиссии, наличие лицензии, большие резервы и отличная репутация гарантируют успех ваших обменных операций!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Meet;
