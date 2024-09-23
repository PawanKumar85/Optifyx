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
      try {
        const response = await axios.get("/api/v2/portfolio/project");
        setProjectData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching project data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={style.container} id="project">
      <h2 className={style.title}>Projects</h2>
      <div className={style.projects}>
        {projectData.length > 0 ? (
          projectData.map((item) => (
            <div className={style.projectCard} key={item._id}>
              <Card item={item} />
            </div>
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
