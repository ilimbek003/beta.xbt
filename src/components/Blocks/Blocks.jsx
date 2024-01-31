import React, { useEffect, useState } from "react";
import "./Blocks.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Line, LineChart } from "recharts";

const Blocks = ({ data, datas }) => {
  const [ratesArray, setRatesArray] = useState([]);
  useEffect(() => {
    const ratesArray = datas.map((el, index) => ({
      price: el.rates[index]?.price || index,
    }));
    setRatesArray(ratesArray);
  }, [datas]);

  function clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj
  }

  function preparePrices(data) {
    let prices = [{price: '68.25'}]
    data.forEach((item) => {
      prices.push({ price: item.price })
    })
    return prices;
  }

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1284,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 824,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
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
    <div className="blocks_comp">
      <div className="width">
        <Slider {...settings} className="slider_block">
          {data.map((el, index) => (
            <div key={index} className="home_block">
              <div className="box_block_block">
                <div className="absolune">
                  <p>
                    <img className="logo_img" src={el.logo} alt="" /> {el.name}{" "}
                  </p>
                  <h1>
                    <span className="dollar">$</span> {el.rate}
                  </h1>
                </div>
                <div className="margen">
                  <LineChart
                    className="line_chart_one"
                    width={120}
                    height={35}
                    margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                    data={ratesArray}
                  >
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke={el.difference.includes("-") ? "red" : "#30E0A1"}
                      dot={false}
                    />
                  </LineChart>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Blocks;
