import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Footer() {
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSocialMediaLinks = async () => {
      try {
        const response = await axios.get("https://portfolio-backend-image-v2.onrender.com/api/v2/portfolio/social");
        setSocialMediaLinks(response.data.data);
      } catch (error) {
        console.error("Error fetching social media links:", error);
        setError("Failed to load social media links.");
      } finally {
        setLoading(false);
      }
    };

    fetchSocialMediaLinks();
  }, []);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <footer className="bg-[#04152d] text-center text-white">
      <div className="container pt-9 px-4">
        <div className="mb-9 flex justify-center flex-wrap">
          {Array.isArray(socialMediaLinks) && socialMediaLinks.length > 0 ? (
            socialMediaLinks.map((link) => (
              <Link
                key={link._id}
                to={link.url}
                className="m-3 text-neutral-200 hover:text-neutral-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={link.icon}
                  alt={`Icon for ${link.name}`} // Assuming link has a name property
                  className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
                />
              </Link>
            ))
          ) : (
            <p>No social media links available.</p>
          )}
        </div>
      </div>
      <div className="p-1 m-3 text-center text-[#fff] flex justify-center">
        Version: 5.0.0
      </div>
    </footer>
  );
}
