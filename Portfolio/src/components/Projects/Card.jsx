import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const Card = ({ item }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-white bg-opacity-10 border border-gray-300 shadow-lg rounded-xl p-4 overflow-hidden min-w-[250px] max-w-sm transition-transform"
    >
      {/* Image with Lazy Loading */}
      <div className="relative w-full h-40 overflow-hidden rounded-lg">
        <img
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mt-4 text-white text-center">
        {item.title}
      </h3>

      {/* Skills */}
      {item.skills.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-300 text-center">Technology Used:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {item.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-800 text-gray-200 px-2 py-1 rounded-md shadow"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-4 justify-center">
        {item.link && (
          <a
            href={item.link}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg shadow-md transition-all hover:from-indigo-600 hover:to-blue-500 active:scale-95"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={16} /> View Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    link: PropTypes.string,
  }).isRequired,
};

export default Card;
