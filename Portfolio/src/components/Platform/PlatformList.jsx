import PropTypes from "prop-types";
import { motion } from "framer-motion";
import style from "./Platform.module.css";
import PlatformItem from "./PlatformItem";

const PlatformList = ({ platformData }) => {
  return (
    <motion.div
      className={style.serviceslist}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {platformData.map((item, index) => (
        <PlatformItem key={item._id} item={item} index={index} />
      ))}
    </motion.div>
  );
};

PlatformList.propTypes = {
  platformData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PlatformList;
