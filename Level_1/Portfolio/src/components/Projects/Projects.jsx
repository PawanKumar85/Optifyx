import React, { useEffect, useState } from "react";
import style from "./Projects.module.css";
import Card from "./Card";
import Spinner from "../Spinner";
import axios from "axios";

const Projects = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem("projectData");

      if (cachedData) {
        setProjectData(JSON.parse(cachedData)); // Use cached data
        setLoading(false); // Stop loading
      } else {
        try {
          const response = await axios.get(
            "https://portfolio-backend-image-v2.onrender.com/api/v2/portfolio/project"
          );
          const data = response.data.data;
          setProjectData(data);
          localStorage.setItem("projectData", JSON.stringify(data)); // Cache the data
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Error fetching project data.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />; // Display a spinner while loading
  }

  if (error) {
    return <p>{error}</p>; // Show an error message if there's an error
  }

  return (
    <section className={style.container} id="project">
      <h2 className={style.title}>Projects</h2>
      <div className={`${style.projects} overflow-x-auto`}>
        {projectData.length > 0 ? (
          projectData.map((item) => (
            <div className={style.projectCard} key={item._id}>
              <Card item={item} />
            </div>
          ))
        ) : (
          <p>No projects available.</p> // Show this if no projects exist
        )}
      </div>
    </section>
  );
};

export default Projects;
