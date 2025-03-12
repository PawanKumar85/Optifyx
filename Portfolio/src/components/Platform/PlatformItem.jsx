import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import style from "./Platform.module.css";

const PlatformItem = ({ item, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      className={style.service}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <img
        src={item.imageUrl || "/path/to/fallback-image.png"}
        className={style.image}
        alt={item.title}
        loading="lazy"
      />
      <h2 className="space-mono-bold">{item.title}</h2>
      <p className="space-mono-regular">{item.description}</p>
      <div style={{ height: "auto",width: "100%" }}>
        <Link
          className="btn btn-primary d-flex justify-content-center"
          to={item.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="space-mono-bold">Click Me</span>
        </Link>
      </div>
    </motion.div>
  );
};

PlatformItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default PlatformItem;
