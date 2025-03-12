import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const messages = [
  "🔥 New Project Added! Check it out.",
  "🚀 Hiring Now: Apply for top roles!",
  "💡 Stay tuned for upcoming events!",
  "🎉 Thank you for visiting my portfolio!"
];

const NotificationBar = () => {
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % messages.length;
    }, 8000); // Change message every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#04152d] text-white font-semibold text-sm md:text-base py-2 fixed top-0 left-0 z-50 overflow-hidden flex items-center">
      <motion.div
        className="whitespace-nowrap flex items-center space-x-12"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }} 
      >
        {messages.map((msg, idx) => (
          <motion.span
            key={idx}
            className="mr-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {msg}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default NotificationBar;
