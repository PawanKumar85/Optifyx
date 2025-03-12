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
            <span className="text-2xl space-mono-bold">{text}</span>
            <div className="flex d-inline-flex">
              <h1 className="space-mono-bold">
                <ReactTyped
                  strings={["Student", "Coder", "MERN"]}
                  typeSpeed={100}
                  loop
                />
              </h1>
            </div>
            <p className="space-mono-regular text-2xl">
              {homeData?.bio}
            </p>
            <div className="flex space-x-5">
              <a
                href="#contact"
                className={`${style.contactBtn} text-decoration-none space-mono-bold-italic border px-4 py-2 rounded`}
              >
                Contact
              </a>
              {homeData?.resumeUrl && (
                <a
                  target="_blank"
                  href={homeData.resumeUrl}
                  className={`${style.contactBtn} text-decoration-none space-mono-bold-italic border px-4 py-2 rounded`}
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
