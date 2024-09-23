import React, { useState, useEffect } from "react";
import style from "./Platform.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Platform = () => {
  const [platformData, setPlatformData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://portfolio-backend-image-v2.onrender.com/api/v2/portfolio/platform");
        setPlatformData(response.data.data);
      } catch (error) {
        console.error("Error fetching platform data:", error);
        setError("Failed to load platform data."); 
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  return (
    <section className="text-white" style={{ margin: "10%" }} id="platform">
      <div className={style.services}>
        <div className={style.container}>
          <h1 className={style.title}>Platform</h1>
          {loading ? (
            <p>Loading...</p> 
          ) : error ? (
            <p className={style.error}>{error}</p> 
          ) : platformData.length > 0 ? (
            <div className={style.serviceslist}>
              {platformData.map((item) => (
                <div key={item._id} className={style.service}>
                  <img
                    src={item.imageUrl || getImageUrl("fallback-image.png")} 
                    className={style.image}
                    alt={item.title}
                    loading="lazy"
                  />
                  <h2 className={style.serviceTitle}>{item.title}</h2>
                  <p className={`text-justify ${style.description}`}>{item.description}</p>
                  <Link
                    className="btn btn-primary d-flex justify-content-center"
                    to={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click Me
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No platform data available</p> 
          )}
        </div>
      </div>
    </section>
  );
};

export default Platform;
