import { Suspense, lazy } from "react";
import style from "./App.module.css";
import data from "./Data/personalData.json";

const Hero = lazy(() => import("./components/Hero/Hero"));
const About = lazy(() => import("./components/About/About"));

import Navbar from "./components/Navbar/Navbar";
import Contact from "./components/Contact/Contact";
import Education from "./components/Education/Education";
import Footer from "./components/Footer/Footer";
import Platform from "./components/Platform/Platform";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Experience/Experience";

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
      
      <Education />
      <Skills />
      <Platform />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
