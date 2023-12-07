import React, { useEffect } from "react";
import Meet from "../../components/Meet/Meet";
import Amazing from "../../components/Amazing/Amazing";

const About = ({ color }) => {
  useEffect(() => {
    document.title = "О компании";
  }, []);
  return (
    <div className="About">
      <Meet color={color} />
      <Amazing />
    </div>
  );
};

export default About;
