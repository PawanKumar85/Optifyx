import React, { useState, useEffect } from "react";
import style from "./Hero.module.css";
import { ReactTyped } from "react-typed";
import axios from "axios";
import Loader from "../Spinner";

const Hero = () => {
  const [homeData, setHomeData] = useState({});
  const [loading, setLoading] = useState(true); 
  const [imageLoading, setImageLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://portfolio-backend-image-v1.onrender.com/api/v2/portfolio/home"
        );
        setHomeData(response.data.data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  const handleImageLoad = () => {
    setImageLoading(false); 
  };


  return (
    <section className={style.container}>
      <div className={style.content}>
        <span className="text-2xl">Hello, I'm Pawan Kumar</span>
        <div className="flex d-inline-flex">
          <h1 className={style.title}>
            <ReactTyped
              strings={[" Student", " Coder", "MERN"]}
              typeSpeed={100}
              loop={true}
            />
          </h1>
        </div>
        <p className={style.desc}>{homeData.bio}</p>
        <div className="flex space-x-5">
          <a
            href="#contact"
            className={`${style.contactBtn} text-decoration-none`}
          >
            Contact Me
          </a>
          {homeData.resumeUrl && (
            <a
              target="_blank"
              href={homeData.resumeUrl}
              className={`${style.contactBtn} text-decoration-none`}
              download
            >
              Download CV
            </a>
          )}
        </div>
      </div>

      {homeData.imageUrl && (
        <>
          {imageLoading && <Loader />} 
          <img
            src={homeData.imageUrl}
            alt="Hero image of me"
            className={style.heroImg}
            onLoad={handleImageLoad} 
            style={{ display: imageLoading ? "none" : "block" }} 
          />
        </>
      )}

      <div className={style.topBlue} />
      <div className={style.bottomBlue} />
    </section>
  );
};

export default Hero;
