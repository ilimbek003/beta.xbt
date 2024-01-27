  import React from "react";
  import "./Advantages.css";
  import Slider from "react-slick";
  import images from "../../img/image 4.svg";
  import pay from "../../img/logo.227fa597.png";
  import binance from "../../img/1681906234binance-logo-png.png";
  import bybit from "../../img/Без названия.svg";
  const Advantages = () => {
    const settingsLeft = {
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: false,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 414,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    };
    const settingsRight = {
      ...settingsLeft,
      rtl: true, 
    };
    return (
      <div id="advantages">
        <h1 className="advantages_h1">
          Откройте для себя преимущества сотрудничества с нами.
        </h1>
        <div className="shadow-one" />
        <Slider {...settingsLeft}>
          <div>
            <img src={pay} alt="" />
          </div>
          <div>
            <img src={binance} alt="" />
          </div>
          <div>
            <img src={bybit} alt="" />
          </div>
          <div>
            <img src={images} alt="" />
          </div>
          <div>
            <img src={images} alt="" />
          </div>
          <div>
            <img src={images} alt="" />
          </div>
          <div>
            <img src={images} alt="" />
          </div>
          <div>
            <img src={images} alt="" />
          </div>
          <div>
            <img src={images} alt="" />
          </div>
        </Slider>
        <div className="advantages_slider">
          <Slider {...settingsRight}>
            <div>
              <img src={images} alt="" />
            </div>
            <div>
              <img src={images} alt="" />
            </div>
            <div>
              <img src={images} alt="" />
            </div>
            <div>
              <img src={images} alt="" />
            </div>
            <div>
              <img src={images} alt="" />
            </div>
            <div>
              <img src={images} alt="" />
            </div>
            <div>
              <img src={images} alt="" />
            </div>
            <div>
              <img src={images} alt="" />
            </div>
            <div>
              <img src={images} alt="" />
            </div>
          </Slider>
        </div>
        <div className="shadow" />
      </div>
    );
  };

  export default Advantages;
