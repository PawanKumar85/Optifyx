import { motion } from "framer-motion";
import PropTypes from "prop-types";

const EducationList = ({ educationData }) => {
  return (
    <motion.div
      className="timeline-items"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {educationData.map((item, index) => (
        <motion.div
          className="timeline-item"
          key={item._id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div className="timeline-dot"></div>
          <div className="timeline-date space-mono-regular">
            {item.duration}
          </div>
          <div className="timeline-content">
            <h3 className="space-mono-bold">{item.title}</h3>
            <span className="space-mono-regular">
              {item.course} : {item.courseID}
            </span>
            <p className="space-mono-regular">{item.college}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// ✅ Add PropTypes validation
EducationList.propTypes = {
  educationData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      course: PropTypes.string.isRequired,
      courseID: PropTypes.string.isRequired,
      college: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EducationList;
