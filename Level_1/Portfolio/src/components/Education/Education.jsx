import React, { useEffect, useState } from "react";
import "./Education.css";
import axios from "axios";

const Education = () => {
  const [educationData, setEducationData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_EDUCATION
        );
        setEducationData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="education" id="education">
      <h2 className="heading">Education</h2>
      <div className="timeline-items">
        {educationData.map((item) => (
          <div className="timeline-item" key={item._id}>
            <div className="timeline-dot"></div>
            <div className="timeline-date">{item.duration}</div>
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <span>
                {item.course} : {item.courseID}
              </span>
              <p>{item.college}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
