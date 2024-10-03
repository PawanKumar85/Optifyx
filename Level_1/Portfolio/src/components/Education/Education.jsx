import React, { useEffect, useState } from "react";
import "./Education.css";
import axios from "axios";
import Loader from "../Spinner"; // Assuming you have a Loader component

const Education = () => {
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem("educationData");

      if (cachedData) {
        setEducationData(JSON.parse(cachedData));
        setLoading(false); // Stop loading when cached data is available
      } else {
        try {
          const response = await axios.get(
            "https://portfolio-backend-image-v2.onrender.com/api/v2/portfolio/education"
          );
          const data = response.data.data;
          setEducationData(data);
          localStorage.setItem("educationData", JSON.stringify(data));
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false); // Stop loading once data is fetched
        }
      }
    };
    fetchData();
  }, []);

  return (
    <section className="education" id="education">
      <h2 className="heading">Education</h2>
      {loading ? ( // Display loader when data is still loading
        <Loader />
      ) : (
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
      )}
    </section>
  );
};

export default Education;
