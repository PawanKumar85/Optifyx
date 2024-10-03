import React, { useEffect, useState } from "react";
import style from "./About.module.css";
import { getImageUrl } from "../../utils";
import axios from "axios";

const About = () => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem("aboutData");

      if (cachedData) {
        setAboutData(JSON.parse(cachedData)); // Use cached data
        setLoading(false);
      } else {
        try {
          const response = await axios.get(
            "https://portfolio-backend-image-v2.onrender.com/api/v2/portfolio/about"
          );
          const data = response.data.data;
          setAboutData(data);
          localStorage.setItem("aboutData", JSON.stringify(data)); // Store data in cache
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <section className={style.container} id="about">
      <h2 className={style.title}>About</h2>
      <div className={style.content}>
        <img
          src={getImageUrl("about/skills.png")}
          alt="about Image of me"
          className={`${style.aboutImg}`}
        />
        {loading ? ( 
          <p>Loading...</p>
        ) : (
          <ul className={style.aboutItems}>
            {aboutData.map((item) => (
              <li key={item._id} className={style.aboutItem}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-[70px] h-[70px]"
                />
                <div className={style.aboutItemText}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default About;
