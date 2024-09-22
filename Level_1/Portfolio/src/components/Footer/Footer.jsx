import React, { useEffect, useState } from "react";
import { IoLogoLinkedin } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io";
import { SiMinutemailer } from "react-icons/si";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Footer() {
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);

  useEffect(() => {
    const fetchSocialMediaLinks = async () => {
      try {
        const response = await axios.get("https://portfolio-backend-image-v1.onrender.com/api/v2/portfolio/social");
        setSocialMediaLinks(response.data.data); // Ensure this is an array
      } catch (error) {
        console.error("Error fetching social media links:", error);
      }
    };

    fetchSocialMediaLinks();
  }, []);

  return (
    <footer className="bg-[#04152d] text-center text-white">
      <div className="container pt-9">
        <div className="mb-9 flex justify-center">
          {Array.isArray(socialMediaLinks) ? (
            socialMediaLinks.map((link) => (
              <Link
                key={link._id}
                to={link.url} // Assuming url is the field containing the link
                className="mr-9 text-neutral-200 hover:text-neutral-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={link.icon} alt={link._id} className="w-[50px] h-[50px]"/>
              </Link>
            ))
          ) : (
            <p>No social media links available.</p>
          )}
        </div>
      </div>
      <div className="p-1 m-3 text-center text-[#fff] flex justify-center">
        Version: 1.0.5
      </div>
    </footer>
  );
}
