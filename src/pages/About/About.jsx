import React, { useEffect } from "react";
import Meet from "../../components/Meet/Meet";
import Partners from "../../components/Advantages/Advantages";
import "./About.css";

const About = ({ color }) => {
  useEffect(() => {
    document.title = "О компании";
    const desc = "XBT.kg — это сервис отвечающий даже самым серьезным запросам! XBT не просто обменка, а самое главное дело в нашей жизни, нам действительно важен каждый наш клиент.";
    document.querySelector("meta[name='description']").setAttribute('content', desc)
  }, []);
  return (
    <div className="About">
      <Meet color={color} />
      <Partners />
    </div>
  );
};

export default About;
