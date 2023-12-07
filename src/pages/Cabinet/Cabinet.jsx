import React from "react";
import "./Cabinet.css";
import Slider from "react-slick";
import { MdEmail, MdOutlineDateRange } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import Loading from "../../components/IU/loading/loading";
import { NavLink, useNavigate } from "react-router-dom";

const Cabinet = ({ color, datas, loading, datas_personal, datas_log }) => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="cabinet">
      {loading ? (
        <div className="loading_div">
          <Loading />
        </div>
      ) : (
        <div className="container">
          <h1 className="h1">Ваши кошельки</h1>
          <div className="wrapper">
            <Slider {...settings}>
              {datas ? (
                datas.map((el) => (
                  <div key={el.id}>
                    <div className="box">
                      <div className="save">
                        <img src={el.logo} alt="" />
                        <div className="content">
                          <div className="h1">
                            <h1>{el.currency}</h1> <h1>{el.balance}</h1>
                          </div>
                          <p>{el.name}</p>
                        </div>
                      </div>
                      <div className="btns">
                        <button
                          disabled={el.can_deposit ? false : true}
                          onClick={() =>
                            navigate(`/dashboard/top-up/${el.currency}`)
                          }
                          style={{
                            background: el.can_deposit
                              ? color
                                ? "var(--green)"
                                : "var(--orange)"
                              : "#262a32",
                            border: el.can_deposit
                              ? "none"
                              : "1px solid #cdcdcd",
                            color: el.can_deposit ? "#FFF" : "#cdcdcd",
                            cursor: el.can_deposit ? "pointer" : "not-allowed",
                          }}
                          className="commiss"
                        >
                          Ввод
                        </button>
                        <button
                          disabled={el.can_withdraw ? false : true}
                          onClick={() =>
                            navigate(`/dashboard/translation/${el.currency}`)
                          }
                          style={{
                            background: el.can_withdraw ? "#434343" : "#262a32",
                            border: el.can_withdraw
                              ? "none"
                              : "1px solid #cdcdcd",
                            color: el.can_withdraw ? "#FFF" : "#cdcdcd",
                            cursor: el.can_withdraw ? "pointer" : "not-allowed",
                          }}
                          className="conclusion"
                        >
                          Вывод
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1>данных нет</h1>
              )}
            </Slider>
          </div>
          <div className="wrapper_history">
            <div className="history_accaunt">
              <h1>История аккаунта</h1>
              <div className="boxs">
                <p>Дата</p>
                <p>Действие</p>
                <p>IP Адрес</p>
                <p>Браузер</p>
              </div>
              {datas_log ? (
                datas_log.map((el, id) => (
                  <div key={id}>
                    <div className="box_history">
                      <p>{el.date}</p>
                      <p>{el.action}</p>
                      <p>{el.ip}</p>
                      <p>{el.browser}</p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>данных нет</h1>
              )}
            </div>
            <div className="wrapper_accaunt">
              <div className="save_box one">
                {datas_personal[0] ? (
                  <div className="save_box_user">
                    <img src={datas_personal[0].avatar} alt="" />
                    <div>
                      <h1>
                        {datas_personal[0].firstname}{" "}
                        {datas_personal[0].lastname}
                      </h1>
                      {datas_personal[0].verification.value == 1 ? (
                        <p className="activeited_false">
                          {datas_personal[0].verification.name}
                        </p>
                      ) : datas_personal[0].verification.value == 2 ? (
                        <p className="activeited_true">
                          {datas_personal[0].verification.name}
                        </p>
                      ) : datas_personal[0].verification.value == 3 ? (
                        <p className="activeited_norm">
                          {datas_personal[0].verification.name}
                        </p>
                      ) : datas_personal[0].verification.value == 4 ? (
                        <p className="activeited_not">
                          {datas_personal[0].verification.name}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {datas_personal[0] ? (
                <div className="save_box two">
                  <h1>Лимиты за текущий день в USDT</h1>
                  <div className="replenishment">
                    <p>Пополнение</p>
                    <p>Продажа</p>
                    <p>Покупка</p>
                  </div>
                  <div className="replenishment">
                    <p>{datas_personal[0].limits.refill}</p>
                    <p>{datas_personal[0].limits.sell}</p>
                    <p>{datas_personal[0].limits.buy}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="save_box three">
                <h1>Персональные данные</h1>
                {loading
                  ? ""
                  : datas_personal.map((el, id) => (
                      <div key={id} className="content_three">
                        <div className="content_box">
                          <MdEmail
                            size={20}
                            color={color ? "var(--green)" : "var(--orange)"}
                          />{" "}
                          <div>
                            <p className="text">Дата регистрации</p>
                            <p>{el.date_register}</p>
                          </div>
                        </div>
                        <div className="content_box">
                          <MdOutlineDateRange
                            size={20}
                            color={color ? "var(--green)" : "var(--orange)"}
                          />
                          <div>
                            <p className="text">Последний вход</p>
                            <p>{el.last_access}</p>
                          </div>
                        </div>
                        <div className="content_box">
                          <AiFillSafetyCertificate
                            size={22}
                            color={color ? "var(--green)" : "var(--orange)"}
                          />{" "}
                          <div>
                            <p className="text">Электронная почта</p>
                            <p>{el.email}</p>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cabinet;
