import React from "react";
import "./Contacts.css";
import unsplash from "../../img/bg_register.svg";

const Contacts = () => {
  return (
    <div className="contacts">
      <div className="container">
        <div className="contact_form">
          <h1>Контакты</h1>
          <h2>Номер:</h2>
          <p><a href="tel:+996777225555">+996 (777) 22-55-55</a></p>
          <h2>Рабочее время</h2>
          <p>График работы сайта круглосуточный.</p>
          <p>График работы службы поддержки и отдела подаж с 12:00 до 18:00 в будние дни (GMT+6)</p>
          <h2>Электронная почта</h2>
          <p><a href="mailto:kgblockchain312@gmail.com">kgblockchain312@gmail.com</a> - по поводу сотрудничества</p>
        </div>
        <div>
          <img className="bg_login" src={unsplash} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
