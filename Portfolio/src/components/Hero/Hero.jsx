import { useEffect } from "react";
import style from "./Hero.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../../store/homeSlice";
import { ReactTyped } from "react-typed";
import Loader from "../Spinner";

const Hero = () => {
  const dispatch = useDispatch();
  const { homeData, loading } = useSelector((state) => state.hero);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  const text = "Hello, I'm Pawan Kumar";

  return (
    <section className={style.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={style.content}>
            <span className="text-2xl">{text}</span>
            <div className="flex d-inline-flex">
              <h1 className={style.title}>
                <ReactTyped
                  strings={["Student", "Coder", "MERN"]}
                  typeSpeed={100}
                  loop
                />
              </h1>
            </div>
            <p className={style.desc}>{homeData?.bio}</p>
            <div className="flex space-x-5">
              <a
                href="#contact"
                className={`${style.contactBtn} text-decoration-none`}
              >
                Contact Me
              </a>
              {homeData?.resumeUrl && (
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

          {homeData?.imageUrl && (
            <img
              src={homeData.imageUrl}
              alt="Hero image of me"
              className={style.heroImg}
              style={{ display: "block" }}
            />
          )}

          <div className={style.topBlue} />
          <div className={style.bottomBlue} />
        </>
      )}
    </section>
  );
};

export default Hero;
