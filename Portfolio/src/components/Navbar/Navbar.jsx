import { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import style from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, closeMenu } from "../../store/navbarSlice";
import { getImageUrl } from "../../utils";
import { Link } from "react-router-dom";

const Navbar = ({ data }) => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const menuOpen = useSelector((state) => state.menu.isOpen);

  // Memoized Icons
  const menuIcon = getImageUrl("nav/menuIcon.png");
  const closeIcon = getImageUrl("nav/closeIcon.png");

  // Close menu on click outside
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        dispatch(closeMenu());
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        dispatch(closeMenu());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [menuOpen, dispatch]);

  // Smooth Scroll Handler
  const handleScroll = useCallback(
    (id) => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        dispatch(closeMenu());
      }
    },
    [dispatch]
  );

  return (
    <nav className={`${style.navbar}`}>
      <Link to="/" className={`${style.title} space-mono-bold`}>
        {data?.portfolio}
      </Link>

      <div className={style.menu} ref={menuRef}>
        {/* Menu Toggle Button */}
        <button
          className={style.menuBtn}
          onClick={() => dispatch(toggleMenu())}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <img src={menuOpen ? closeIcon : menuIcon} alt="Menu icon" />
        </button>

        {/* Menu Items */}
        <ul className={`${style.menuItems} ${menuOpen ? style.menuOpen : ""}`}>
          {data?.navbar?.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleScroll(item.navLink)}
                className="space-mono-regular"
              >
                {item.navName}
              </button>
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
