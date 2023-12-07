import React from "react";
import "./Contacts.css";
import unsplash from "../../img/bg_register.svg";

const Contacts = () => {
  return (
    <div className="contacts">
      <div className="container">
        <div className="contact_form">
          <h1>Контакты</h1>
          <h2>Наш адрес:</h2>
          <p className="adres">
            Кыргызская Республика г. Бишкек ул. Манаса 64/1
          </p>
          <h2>Номер:</h2>
          <p>+996 (700)-10-02-00 </p>
          <p>+996 (550)-10-02-00 </p>
          <h2>Рабочее время</h2>
          <p>Пн-Пт 10:00-19:00</p>
          <h2>Пн-Пт 10:00-19:00</h2>
          <p>- по поводу сотрудничества</p>
          <p>- для получения помощи</p>
        </div>
        <div>
          <img className="bg_login" src={unsplash} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
