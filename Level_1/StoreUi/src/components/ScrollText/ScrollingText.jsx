// ScrollingText.js
import React from "react";
import "./ScrollingText.css"

const ScrollingText = () => {
  return (
    <div className="overflow-hidden">
      <div className="animate-scroll text-lg font-bold text-center">
        Language Used :  &nbsp;&nbsp;&nbsp;&nbsp; React &nbsp;&nbsp;&nbsp;&nbsp; Tailwind CSS &nbsp;&nbsp;&nbsp;&nbsp; Hello World &nbsp;&nbsp;&nbsp;&nbsp; Hello World
      </div>
    </div>
  );
};

export default ScrollingText;
