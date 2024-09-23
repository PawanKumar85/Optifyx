import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">About Us</h3>
            <p className="text-sm">
              We are dedicated to providing the best shopping experience with
              quality products and excellent customer service.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="text-sm">
              <li>
                <Link to="#home" className="hover:underline">
                  Shirt
                </Link>
              </li>
              <li>
                <Link to="#products" className="hover:underline">
                  Pants
                </Link>
              </li>
              <li>
                <Link to="#contact" className="hover:underline">
                  Shoes
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm">
          <p>© {new Date().getFullYear()} Yhills. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
