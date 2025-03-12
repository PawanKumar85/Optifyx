import { useEffect, lazy, Suspense } from "react";
import style from "./About.module.css";
import { getImageUrl } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutData } from "../../store/aboutSlice";

const List = lazy(() => import("./List"));

const About = () => {
  const dispatch = useDispatch();
  const { data: aboutData, loading } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(fetchAboutData());
  }, [dispatch]);

  return (
    <section className={style.container} id="about">
      <h2 className = "space-mono-bold-italic">About</h2>

      <div className={style.content}>
        <img
          src={getImageUrl("about/skills.png")}
          alt="about Image of me"
          className={style.aboutImg}
        />

        {loading ? (
          <div className="skeleton h-32 w-full bg-gray-700 rounded-2xl"></div>
        ) : aboutData?.length > 0 ? (
          <Suspense
            fallback={
              <div className="skeleton h-32 w-full bg-gray-700 rounded-2xl"></div>
            }
          >
            <List aboutData={aboutData} style={style} />
          </Suspense>
        ) : (
          <p className="text-gray-500 font-bold">No information available.</p>
        )}
      </div>
    </section>
  );
};

export default About;
