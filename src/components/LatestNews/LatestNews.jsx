import React from "react";
import "./LatestNews.css";
import search from "../../img/search 1.svg";

const LatestNews = ({ color, value, setValue }) => {
  return (
    <div id="latest__news">
      <div className="container">
        <div className="latest__news">
          <h1>
            Все
            <span style={{ color: color ? "var(--green)" : "var(--orange)" }}>
              {" "}
              новости{" "}
            </span>
            компании
          </h1>
          <form className="input_box">
            <img className="search" src={search} alt="" />
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Поиск"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
