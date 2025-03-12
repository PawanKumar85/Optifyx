import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types"; // Prop validation
import style from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

const Navbar = ({ data }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Toggle menu function
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className={style.navbar}>
      <a href="/" className={style.title}>
        {data?.portfolio}
      </a>
      <div className={style.menu} ref={menuRef}>
        <button
          className={style.menuBtn}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <img
            src={
              menuOpen
                ? getImageUrl("nav/closeIcon.png")
                : getImageUrl("nav/menuIcon.png")
            }
            alt={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          />
        </button>
        <ul className={`${style.menuItems} ${menuOpen ? style.menuOpen : ""}`}>
          {data?.navbar?.map((item, index) => (
            <li key={index}>
              <a href={`#${item.navLink}`} onClick={() => setMenuOpen(false)}>
                {item.navName}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// **Prop Validation**
Navbar.propTypes = {
  data: PropTypes.shape({
    portfolio: PropTypes.string.isRequired,
    navbar: PropTypes.arrayOf(
      PropTypes.shape({
        navLink: PropTypes.string.isRequired,
        navName: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Navbar;
