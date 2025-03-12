import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";

const socialMediaLinks = [
  { id: "1", name: "GitHub", url: "https://github.com/PawanKumar85", icon: FaGithub },
  { id: "2", name: "LinkedIn", url: "https://www.linkedin.com/in/pawankr85/", icon: FaLinkedin },
  { id: "3", name: "Twitter", url: "https://x.com/pawansoni630703", icon: FaSquareXTwitter },
  { id: "4", name: "Email", url: "mailto:pawan630703@gmail.com", icon: SiMinutemailer },
  { id: "5", name: "Facebook", url: "https://m.facebook.com/profile.php?id=100010037854634", icon: FaFacebook },
  { id: "6", name: "Instagram", url: "https://www.instagram.com/pawan630703?igsh=MWF0c2Y3d3ozNnhxZg==", icon: FaInstagram },
];

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#04152d] text-white text-center py-6"
    >
      <motion.div
        className="flex justify-center gap-6 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {socialMediaLinks.map(({ id, name, url, icon: Icon }) => (
          <motion.a
            key={id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="transition-all duration-300"
          >
            <Icon className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] hover:text-neutral-400" />
          </motion.a>
        ))}
      </motion.div>
      <motion.p
        className="mt-4 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Version: 5.5.0
      </motion.p>
    </motion.footer>
  );
};

export default Footer;