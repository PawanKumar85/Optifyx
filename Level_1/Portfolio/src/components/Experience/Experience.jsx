import React, { useEffect, useState } from "react";
import style from "./Experience.module.css";
import axios from "axios";

const Experience = () => {
  const [skillData, setSkillData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://portfolio-backend-image-v1.onrender.com/api/v2/portfolio/skill");
        if (response.data && response.data.data) {
          setSkillData(response.data.data);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching skill data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className={style.container} id="experience">
      <h2 className={style.title}>Skills</h2>
      <div className={style.content}>
        <div className={style.skills}>
          {skillData.map((skill, index) => {
            return (
              <div key={skill.skillId || index} className={style.skill}>
                <div className={style.skillImagContainer}>
                  <img src={skill.imageUrl} alt={skill.title} />
                </div>
                <p>{skill.title}</p>
              </div>
            );
          })}
        </div>
        {/* Uncomment if you want to display history as well
        <ul className={style.history}>
          {history.map((historyItem, id) => {
            return (
              <li key={id} className={style.historyItem}>
                <img
                  src={getImageUrl(historyItem.imageSrc)}
                  alt={`${historyItem.organisation} logo`}
                />
                <div className={style.historyItemDetails}>
                  <h3>{`${historyItem.role}, ${historyItem.organisation}`}</h3>
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
        </ul>
        */}
      </div>
    </section>
  );
};

export default Experience;
