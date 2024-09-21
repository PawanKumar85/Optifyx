/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import style from "./About.module.css";
import { getImageUrl } from "../../utils";
const About = ({ data }) => {
  return (
    <section className={style.container} id="about">
      <h2 className={style.title}>About</h2>
      <div className={style.content}>
        <img
          src={getImageUrl("about/skills.png")}
          alt="about Image of me"
          className={style.aboutImg}
        />
        <ul className={style.aboutItems}>
          {data.about.map((item) => {
            return (
              <li key={item.aboutId} className={style.aboutItem}>
                <img
                  src={getImageUrl(`${item.imageSrc}`)}
                  alt={item.alt}
                />
                <div className={style.aboutItemText}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default About;
