import React, { useState, useEffect } from "react";
import style from "./Platform.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Spinner"; // Assuming you have a Loader component

const Platform = () => {
  const [platformData, setPlatformData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling state

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem("platformData");

      if (cachedData) {
        setPlatformData(JSON.parse(cachedData));
        setLoading(false); // Stop loading if cached data is available
      } else {
        try {
          const response = await axios.get(
            "https://portfolio-backend-image-v2.onrender.com/api/v2/portfolio/platform"
          );
          const data = response.data.data;
          setPlatformData(data);
          localStorage.setItem("platformData", JSON.stringify(data)); // Cache data
        } catch (error) {
          console.error("Error fetching platform data:", error);
          setError("Failed to load platform data."); // Set error message
        } finally {
          setLoading(false); // Stop loading once data is fetched or failed
        }
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
            <Loader /> // Display a loader while data is loading
          ) : error ? (
            <p className={style.error}>{error}</p> // Show error message if there's an error
          ) : platformData.length > 0 ? (
            <div className={style.serviceslist}>
              {platformData.map((item) => (
                <div key={item._id} className={style.service}>
                  <img
                    src={item.imageUrl || "/path/to/fallback-image.png"} // Fallback image
                    className={style.image}
                    alt={item.title}
                    loading="lazy"
                  />
                  <h2 className={style.serviceTitle}>{item.title}</h2>
                  <p className={`text-justify ${style.description}`}>
                    {item.description}
                  </p>
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
            <p>No platform data available</p> // Display message if no data is available
          )}
        </div>
      </div>
    </section>
  );
};

export default Platform;
