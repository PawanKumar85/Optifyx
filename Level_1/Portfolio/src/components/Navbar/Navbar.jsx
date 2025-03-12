import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        dispatch(closeMenu());
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, dispatch]);

  return (
    <nav className={style.navbar}>
      <Link href="/" className={style.title}>
        {data?.portfolio}
      </Link>
      <div className={style.menu} ref={menuRef}>
        <button
          className={style.menuBtn}
          onClick={() => dispatch(toggleMenu())}
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
              <a
                href={`#${item.navLink}`}
                onClick={() => dispatch(closeMenu())}
              >
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
