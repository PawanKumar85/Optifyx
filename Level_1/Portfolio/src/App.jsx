import React from "react";
import style from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Platform from "./components/Platform/Platform";
import Projects from "./components/Projects/Projects";
import data from "./Data/personalData.json";
import Education from "./components/Education/Education";
import Contact from "./components/Contact/Contact"
import Footer from "./components/Footer/Footer";
import Skills from "./components/Experience/Experience";


function App() {
  
  return (
    <div className={style.App}>
      <Navbar data={data} />
      <Hero/>
      <About/>
      <Education/>
      <Skills />
      <Platform/>
      <Projects/>
      <Contact/>
      <Footer/>

    </div>
  );
}

export default App;
