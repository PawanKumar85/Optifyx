/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Marquee from "react-fast-marquee";
import { getImageUrl } from "../../utils";
import "./Achievement.css";

const Achievement = ({ data }) => {
  return (
    <section className="App" id="achievement">
      <div className="title">
        <h1>My Achievements</h1>
      </div>

      <div>
        <Marquee direction="right" speed={100} delay={5}>
          {data.achievement.map((item, index) => {
            return (
              <div key={index} className="image_wrapper">
                <img src={getImageUrl(item)} alt="" />
              </div>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
};

export default Achievement;
