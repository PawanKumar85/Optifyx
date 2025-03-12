import { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, closeMenu } from "../../store/navbarSlice";
import { getImageUrl } from "../../utils";
import { Link, useLocation } from "react-router-dom";
import style from "./Navbar.module.css";

const Navbar = ({ data }) => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const menuOpen = useSelector((state) => state.menu.isOpen);
  const location = useLocation();

  const menuIcon = getImageUrl("nav/menuIcon.png");
  const closeIcon = getImageUrl("nav/closeIcon.png");

  // Handle clicking outside to close menu
  const handleClickOutside = useCallback(
    (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        dispatch(closeMenu());
      }
    },
    [dispatch]
  );

  // Close menu on Escape key
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Escape") {
        dispatch(closeMenu());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (!menuOpen) return;

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);
    document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "auto";
    };
  }, [menuOpen, handleClickOutside, handleKeyPress]);

  // Smooth scroll handler
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

  // Close menu when navigating to a new page
  useEffect(() => {
    dispatch(closeMenu());
  }, [location.pathname, dispatch]);

  return (
    <nav className={style.navbar} role="navigation">
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
        <ul
          className={`${style.menuItems} ${menuOpen ? style.menuOpen : ""}`}
          role="menu"
        >
          {data?.navbar?.map((item, index) => (
            <li key={index} className="flex items-center justify-center" role="menuitem">
              {item.navName === "Login" ? (
                <Link
                  to={item.navLink}
                  className="space-mono-regular border px-4 py-2 rounded"
                >
                  {item.navName}
                </Link>
              ) : (
                <button
                  onClick={() => handleScroll(item.navLink)}
                  className="space-mono-regular rounded-md transition-all duration-300 hover:text-black"
                >
                  {item.navName}
                </button>
              )}
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
