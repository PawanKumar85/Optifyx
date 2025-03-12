import PropTypes from "prop-types";
import { motion } from "framer-motion";
import style from "./Skill.module.css";

const SkillList = ({ skillData }) => {
  return (
    <motion.div 
      className={style.skills} 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
    >
      {skillData.map((skill, index) => (
        <motion.div
          key={skill.skillId || index}
          className={style.skill}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className={style.skillImagContainer}>
            <img src={skill.imageUrl} alt={skill.title} />
          </div>
          <p className="space-mono-bold">{skill.title}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

SkillList.propTypes = {
  skillData: PropTypes.arrayOf(
    PropTypes.shape({
      skillId: PropTypes.string,
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SkillList;
