import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  const text = "Oops! The page you're looking for doesn't exist.";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      {/* Animated Text */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-8xl font-extrabold text-blue-600"
      >
        404
      </motion.h1>

      {/* Animated Subtitle */}
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="text-xl text-gray-700 mt-4"
      >
        {text}
      </motion.p>

      {/* Button with Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition-all duration-300"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
