import React from "react";
import style from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Platform from "./components/Platform/Platform";
import Projects from "./components/Projects/Projects";
import data from "./Data/personalData.json";
import Education from "./components/Education/Education";
import Contact from "./components/Contact/Contact"
import Footer from "./components/Footer/Footer";
import Achievement from "./components/Achievement/Achievement";


function App() {
  
  return (
    <div className={style.App}>
      <Navbar data={data} />
      <Hero data={data} />
      <About data={data} />
      <Education data={data}/>
      <Experience data = {data} />
      <Platform data={data}/>
      <Projects data={data}/>
      {/* <Achievement data={data}/> */}
      <Contact/>
      <Footer/>

    </div>
  );
}

export default App;
