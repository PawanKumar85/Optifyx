import React from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollingText from "./components/ScrollText/ScrollingText";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollingText />
      <main className="flex-grow">
        <Body />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
