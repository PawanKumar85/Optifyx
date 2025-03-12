import { Suspense, lazy } from "react";
import style from "./App.module.css";
import data from "./Data/personalData.json";

const Hero = lazy(() => import("./components/Hero/Hero"));
const About = lazy(() => import("./components/About/About"));
const Education = lazy(() => import("./components/Education/Education"));
const Skills = lazy(() => import("./components/Skill/Skill"));

import Navbar from "./components/Navbar/Navbar";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Platform from "./components/Platform/Platform";
import Projects from "./components/Projects/Projects";

function App() {
  return (
    <div className={style.App}>
      <Navbar data={data} />
      <Suspense
        fallback={
          <div className="skeleton h-64 w-full ">
            <span className="loading loading-ball loading-xl text-primary"></span>
          </div>
        }
      >
        <Hero />
      </Suspense>

      <Suspense
        fallback={
          <div className="skeleton h-64 w-full ">
            <span className="loading loading-ball loading-xl text-primary"></span>
          </div>
        }
      >
        <About />
      </Suspense>

      <Suspense
        fallback={
          <div className="skeleton h-64 w-full ">
            <span className="loading loading-ball loading-xl text-primary"></span>
          </div>
        }
      >
        <Education />
      </Suspense>

      <Suspense
        fallback={
          <div className="skeleton h-64 w-full ">
            <span className="loading loading-ball loading-xl text-primary"></span>
          </div>
        }
      >
        <Skills />
      </Suspense>

      <Platform />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
