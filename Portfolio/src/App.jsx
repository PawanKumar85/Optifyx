import { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import style from "./App.module.css";
import data from "./Data/personalData.json";
import { Routes, Route } from "react-router-dom";

// Lazy Load Components
const Hero = lazy(() => import("./components/Hero/Hero"));
const About = lazy(() => import("./components/About/About"));
const Education = lazy(() => import("./components/Education/Education"));
const Skills = lazy(() => import("./components/Skill/Skill"));
const Platform = lazy(() => import("./components/Platform/Platform"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const Login = lazy(() => import("./components/Auth/Login/Login"));
import NotFound from "./components/NotFound";

import Navbar from "./components/Navbar/Navbar";
import NotificationBar from "./components/NotificationBar/NotificationBar";

// Skeleton Loader
const Loader = () => (
  <div className="flex justify-center items-center h-[300px]">
    <span className="loading loading-ball loading-xl text-primary"></span>
  </div>
);

function App() {
  const location = useLocation(); // Current path check karne ke liye

  const isHomePage = location.pathname === "/"; // Agar home page par hain toh true hoga

  return (
    <div className={style.App}>
      {/* Sirf Home Page par NotificationBar & Navbar dikhayenge */}
      {isHomePage && <NotificationBar />}
      {isHomePage && <Navbar data={data} />}

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
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
          }
        />
        <Route
          path="/auth/login"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
