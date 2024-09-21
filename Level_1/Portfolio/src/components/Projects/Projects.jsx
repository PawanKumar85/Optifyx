import React from "react";
import style from "./Projects.module.css";
import Card from "./Card";

const Projects = ({ data }) => {
  return (
    <section className={style.container} id="project">
      <h2 className={style.title}>Projects</h2>
      <div className={style.projects}>
        {data.projects.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
