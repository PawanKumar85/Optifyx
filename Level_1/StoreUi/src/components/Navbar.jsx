import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <>
      <nav className="bg-white shadow-md py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-gray-800">Apparel Store</h1>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-black font-semibold hover:text-blue-500">
              Shirts
            </Link>
            <Link to="/" className="text-gray-700 hover:text-blue-500">
              Pants
            </Link>
            <Link to="/" className="text-gray-700 hover:text-blue-500">
              Shoes
            </Link>
            <Link to="/" className="text-gray-700 hover:text-blue-500">
              Contact Us
            </Link>
          </div>
          <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
            <HiMenuAlt3 size={30} />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-20">
            <div className="flex flex-col items-start pl-6 space-y-2 py-4">
              <Link to="/" className="text-gray-700 hover:text-blue-500" onClick={toggleMenu}>
                Shirts
              </Link>
              <Link to="/" className="text-gray-700 hover:text-blue-500" onClick={toggleMenu}>
                Pants
              </Link>
              <Link to="/" className="text-gray-700 hover:text-blue-500" onClick={toggleMenu}>
                Shoes
              </Link>
              <Link
                to="/"
                className="text-white bg-blue-500 rounded-md px-4 py-2 hover:bg-blue-600 transition duration-200 w-full text-center"
                onClick={toggleMenu}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
