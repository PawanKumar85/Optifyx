import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook,FaInstagram } from "react-icons/fa"; // Import icons from react-icons
import { SiMinutemailer } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  // Static array of social media links with icons
  const socialMediaLinks = [
    {
      _id: "1",
      name: "GitHub",
      url: "https://github.com/PawanKumar85",
      icon: <FaGithub className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]" />, // Using icon component
    },
    {
      _id: "2",
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/pawankr85/",
      icon: <FaLinkedin className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]" />, // Using icon component
    },
    {
      _id: "3",
      name: "Twitter",
      url: "https://x.com/pawansoni630703",
      icon: <FaSquareXTwitter className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]" />, // Using icon component
    },
    {
      _id: "4",
      name: "Email",
      url: "mailto:pawan630703@gmail.com",
      icon: <SiMinutemailer className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]" />, // Using icon component
    },
    {
      _id: "5",
      name: "Facebook",
      url: "https://m.facebook.com/profile.php?id=100010037854634",
      icon: <FaFacebook className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]" />, // Using icon component
    },
    {
      _id: "6",
      name: "Instagram",
      url: "https://www.instagram.com/pawan630703?igsh=MWF0c2Y3d3ozNnhxZg==",
      icon: <FaInstagram  className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]" />, // Using icon component
    },
    // Add more links as needed
  ];

  return (
    <footer className="bg-[#04152d] text-center text-white">
      <div className="container pt-9 px-4">
        <div className="mb-9 flex justify-center flex-wrap">
          {socialMediaLinks.length > 0 ? (
            socialMediaLinks.map((link) => (
              <Link
                key={link._id}
                to={link.url}
                className="m-3 text-neutral-200 hover:text-neutral-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon} {/* Render the icon component */}
              </Link>
            ))
          ) : (
            <p>No social media links available.</p>
          )}
        </div>
      </div>
      <div className="p-1 m-3 text-center text-[#fff] flex justify-center">
        Version: 5.5.0
      </div>
    </footer>
  );
};

export default Footer;
