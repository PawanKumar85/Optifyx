import React from "react";
import { IoLogoLinkedin } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io";
import { SiMinutemailer } from "react-icons/si";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <footer className="bg-[#04152d] text-center text-white">
      <div className="container pt-9">
        <div className="mb-9 flex justify-center">
          <Link
            to="https://www.linkedin.com/in/pawankr85/" // Replace with your actual route or link
            className="mr-9 text-neutral-200 hover:text-neutral-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoLinkedin size={30} />
          </Link>
          <Link
            to="https://github.com/PawanKumar85" // Replace with your actual route or link
            className="mr-9 text-neutral-200 hover:text-neutral-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoGithub size={30} />
          </Link>
          <a
            href="mailto:pawan630703@gmail.com"
            className="mr-9 text-neutral-200 hover:text-neutral-400"
          >
            <SiMinutemailer size={30} />
          </a>
          <Link
            to="https://m.facebook.com/profile.php?id=100010037854634" // Replace with your actual route or link
            className="mr-9 text-neutral-200 hover:text-neutral-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={30} />
          </Link>
          <Link
            to="https://www.instagram.com/pawan630703?igsh=MWF0c2Y3d3ozNnhxZg==" // Replace with your actual route or link
            className="mr-9 text-neutral-200 hover:text-neutral-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiInstagramFill size={30} />
          </Link>
          <Link
            to="https://x.com/pawansoni630703" // Replace with your actual route or link
            className="text-neutral-200 hover:text-neutral-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={30} />
          </Link>
        </div>
      </div>
      <div className="p-1 m-3 text-center text-[#fff] flex justify-center">
        Version: 1.0.5
      </div>
    </footer>
  );
}
