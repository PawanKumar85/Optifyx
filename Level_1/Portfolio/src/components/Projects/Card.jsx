import React from "react";
import { getImageUrl } from "../../utils";
import style from './Card.module.css';

const Card = ({
  item: { title, imageSrc, description, skills, demo, source },
}) => {
  return (
    <div className={style.container}>
      <div className="flex justify-center">
      <img
        src={getImageUrl(imageSrc)}
        alt={`Image of ${title}`}
        className={`${style.image} w-[150px]`}
      />
      </div>
      <h3 className={style.title}>{title}</h3>
      <p className="font-bold mt-3 mb-[-5px]">Technology Uses </p>
      <ol className={style.skills}>
        {skills.map((skill, index) => (
          <li key={index} className={style.skill}>
            {skill}
          </li>
        ))}
      </ol>
      <div className={style.links}>
        {demo && (
          <a
            href={demo}
            className={`w-full text-center ${style.link}`}
            target="_blank"
            rel="noopener noreferrer" // Security improvement
          >
            View Demo
          </a>
        )}
        {source && (
          <a
            href={source}
            className={style.link}
            target="_blank"
            rel="noopener noreferrer" // Security improvement
          >
            View Source
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;
