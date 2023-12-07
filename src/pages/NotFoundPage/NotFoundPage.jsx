import React from "react";
import "./NotFoundPage.css";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not_found_page">
      <h1>ОШИБКА 404</h1>
      <p>
        СТРАНИЦА, КОТОРУЮ ВЫ ИЩЕТЕ, БЫЛА ПЕРЕМЕЩЕНА, УДАЛЕНА, ПЕРЕИМЕНОВАНА ИЛИ
        МОЖЕТ НИКОГДА НЕ СУЩЕСТВОВАЛА. ВЫ МОЖЕТЕ ПЕРЕЙТИ НА{" "}
        <NavLink to="/" style={{ color: "#FCE34D" }}>
          ГЛАВНУЮ СТРАНИЦУ
        </NavLink>
        , ЧТОБЫ НАЙТИ НУЖНУЮ ВАМ ИНФОРМАЦИЮ
      </p>
    </div>
  );
};

export default NotFoundPage;
