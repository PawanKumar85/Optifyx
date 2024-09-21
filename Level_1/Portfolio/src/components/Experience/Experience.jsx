import React from "react";
import style from "./Experience.module.css";
import history from "../../Data/history.json";
import { getImageUrl } from "../../utils";

const Experience = ({data}) => {
  return (
    <section className={style.container} id="experience">
      <h2 className={style.title}>Skills</h2>
      <div className={style.content}>
        <div className={style.skills}>
          {data.skills.map((skill) => {
            return (
              <div key={skill.skillId} className={style.skill}>
                <div className={style.skillImagContainer}>
                  <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />
                </div>
                <p>{skill.title}</p>
              </div>
            );
          })}
        </div>
        {/* <ul className={style.history}>
          {history.map((historyItem, id) => {
            return (
              <li key={id} className={style.historyItem}>
                <img
                  src={getImageUrl(historyItem.imageSrc)}
                  alt={`${historyItem.organisation} logo`}
                />
                <div className={style.historyItemDetails}>
                  <h3>{`${historyItem.role},${historyItem.organisation}`}</h3>
                  <p>{`${historyItem.startDate} - ${historyItem.endDate}`}</p>
                  <ul>
                    {historyItem.experiences.map((item, id) => {
                      return <li key={id}>{item}</li>;
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul> */}
      </div>
    </section>
  );
};

export default Experience;
