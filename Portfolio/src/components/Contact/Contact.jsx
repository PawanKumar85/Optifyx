import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm, resetFormState } from "../../store/contactSlice";
import { getImageUrl } from "../../utils";
import { motion } from "framer-motion";

const Contact = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);
  
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    if (success) {
      setTimeout(() => dispatch(resetFormState()), 3000);
      setFormData({ name: "", email: "", message: "" });
    }
  }, [success, dispatch]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = formData.message.trim();
    if (formData.name.trim().length < 2 || trimmedMessage.length < 10) return;
    dispatch(submitContactForm({ ...formData, message: trimmedMessage }));
  };

  return (
    <motion.section 
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-24">
        <div className="grid items-center justify-items-center gap-10 lg:grid-cols-2">
          <motion.div 
            className="px-2 md:px-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-2xl font-bold text-white md:text-4xl space-mono-bold-italic">Contact Me</p>
            <p className="mt-4 text-lg text-white space-mono-regular">Our friendly team would love to hear from you.</p>
            <motion.form 
              onSubmit={handleSubmit} 
              className="mt-8 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              {["name", "email"].map((field) => (
                <div key={field} className="grid gap-1.5">
                  <label className="text-sm font-medium text-gray-700 space-mono-regular" htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    className="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder-gray-400 focus:ring-gray-400 space-mono-regular"
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="grid gap-1.5">
                <label className="text-sm font-medium text-gray-700" htmlFor="message">Message</label>
                <textarea
                  className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder-gray-400 focus:ring-gray-400 space-mono-regular"
                  id="message"
                  placeholder="Leave us a message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 space-mono-regular"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? "Sending..." : "Send Message"}
              </motion.button>
              {success && <p className="mt-4 text-green-500">Message sent successfully!</p>}
              {error && <p className="mt-4 text-red-500">{error}</p>}
            </motion.form>
          </motion.div>
          <motion.img
            alt="Contact us"
            className="hidden max-h-full w-full rounded-lg object-cover lg:block"
            src={getImageUrl("more/contact.png")}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>
      <hr className="mt-6" />
    </motion.section>
  );
};

export default Contact;