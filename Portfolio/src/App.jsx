import { Suspense, lazy } from "react";
import style from "./App.module.css";
import data from "./Data/personalData.json";

// Lazy Load Components
const Hero = lazy(() => import("./components/Hero/Hero"));
const About = lazy(() => import("./components/About/About"));
const Education = lazy(() => import("./components/Education/Education"));
const Skills = lazy(() => import("./components/Skill/Skill"));
const Platform = lazy(() => import("./components/Platform/Platform"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Footer = lazy(() => import("./components/Footer/Footer"));

import Navbar from "./components/Navbar/Navbar";

// Skeleton Loader
const Loader = () => (
  <div className="flex justify-center items-center h-[300px]">
    <span className="loading loading-ball loading-xl text-primary"></span>
  </div>
);

function App() {
  return (
    <div className={style.App}>
      <Navbar data={data} />

      {/* Wrap Everything in a Single Suspense */}
      <Suspense fallback={<Loader />}>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Platform />
        <Projects />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
