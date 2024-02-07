import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./Stay.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../api";

const Stay = ({ color }) => {
  const navigate = useNavigate();
  const [stay, setStay] = useState([]);
  const stayData = stay ? stay : [];
  const stays = Object.values(stayData).map((data) => data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + "/index");
        setStay(response.data.news);
      } catch (error) {
        // console.log("Ошибка:", error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1284,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div id="stay">
      <div className="container">
        <h1 className="skey_h1">Оставайтесь в курсе последних новостей</h1>
        {stay ? (
          <Slider {...settings}>
            {stays.map((el, id) => (
              <div key={id} className="width" onClick={() => navigate('/news/' + el.id)}>
                <div key={id} className="skey_block">
                  <div className="news-photo">
                    <img className="photo" src={el.photo} alt="" />
                  </div>
                  <h2>{el.name} </h2>
                  <p className="body">{el.body}</p>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="not_data">
            <h1 style={{ color: color ? "var(--green)" : "var(--orange)" }}>
              Новостей нет
            </h1>
          </div>
        )}

        <div className="skey_btn_block">
          <button
            onClick={() => navigate("/News")}
            style={{ background: color ? "var(--green)" : "var(--orange)" }}
            className="skey_btn"
          >
            Смотреть все
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stay;
