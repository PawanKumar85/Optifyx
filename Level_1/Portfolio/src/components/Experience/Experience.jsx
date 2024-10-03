import React, { useEffect, useState } from "react";
import style from "./Experience.module.css";
import axios from "axios";
import Loader from "../Spinner"; // Assuming you have a Loader component

const Experience = () => {
  const [skillData, setSkillData] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem("skillData");

      if (cachedData) {
        setSkillData(JSON.parse(cachedData));
        setLoading(false); // Stop loading when cached data is available
      } else {
        try {
          const response = await axios.get(
            "https://portfolio-backend-image-v2.onrender.com/api/v2/portfolio/skill"
          );
          if (response.data && response.data.data) {
            const data = response.data.data;
            setSkillData(data);
            localStorage.setItem("skillData", JSON.stringify(data)); // Cache the data
          } else {
            console.error("Unexpected response structure:", response.data);
          }
        } catch (error) {
          console.error("Error fetching skill data:", error);
        } finally {
          setLoading(false); // Stop loading once data is fetched
        }
      }
    };
    fetchData();
  }, []);

  return (
    <section className={style.container} id="experience">
      <h2 className={style.title}>Skills</h2>
      <div className={style.content}>
        {loading ? (
          <Loader /> // Display loader while data is loading
        ) : (
          <div className={style.skills}>
            {skillData.map((skill, index) => (
              <div key={skill.skillId || index} className={style.skill}>
                <div className={style.skillImagContainer}>
                  <img src={skill.imageUrl} alt={skill.title} />
                </div>
                <p>{skill.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
