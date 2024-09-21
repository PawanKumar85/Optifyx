import React from "react";
import style from "./Platform.module.css";
import { getImageUrl } from "../../utils";
import { Link } from "react-router-dom";

const Platform = ({ data }) => {
  return (
    <section className="text-white" style={{ margin: "10%" }} id="platform">
      <div className={style.services}>
        <div className={style.container}>
          <h1 className={style.title}>Platform</h1>
          <div className={style.serviceslist}>
            {data.platform.map((item, index) => (
              <div key={index} className={style.service}>
                <img
                  src={getImageUrl(item.imageSrc)}
                  className={style.image}
                  alt={item.title}
                  loading="lazy"
                />
                <h2 className={style.serviceTitle}>{item.title}</h2>
                <p className={style.description}>{item.description}</p>
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
        </div>
      </div>
    </section>
  );
};

export default Platform;
