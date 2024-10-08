import React, { useState } from "react";
import axios from "axios";
import { getImageUrl } from "../../utils";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handler for input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    // Trim the message before validation
    const trimmedMessage = formData.message.trim();

    // Validate inputs
    if (formData.name.trim().length < 2) {
      setError("Name should be at least 2 characters long");
      setIsSubmitting(false);
      return;
    }
    
    if (!formData.email) {
      setError("Email is required");
      setIsSubmitting(false);
      return;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Invalid email format");
        setIsSubmitting(false);
        return;
      }
    }

    if (trimmedMessage.length < 10) {
      setError("Message should be at least 10 characters long");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://portfolio-backend-image-v3.onrender.com/api/v2/portfolio/contacts",
        {
          ...formData,
          message: trimmedMessage, // Send trimmed message
        }
      );
      console.log("Form data submitted:", response.data);
      setSuccess(true);

      // Clear form fields after submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting form:", err.response?.data?.message || "Unknown error");
      setError(err.response?.data?.message || "An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="mx-auto max-w-7xl px-4">
        <div className="py-12 md:py-24">
          <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
            <div className="flex items-center justify-center">
              <div className="px-2 md:px-12">
                <p className="text-2xl font-bold text-white md:text-4xl">Contact Me</p>
                <p className="mt-4 text-lg text-white">Our friendly team would love to hear from you.</p>
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <label className="text-sm font-medium leading-none text-gray-700" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="text"
                      id="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid w-full items-center gap-1.5">
                    <label className="text-sm font-medium leading-none text-gray-700" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid w-full items-center gap-1.5">
                    <label className="text-sm font-medium leading-none text-gray-700" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      id="message"
                      placeholder="Leave us a message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                  
                  {success && <p className="mt-4 text-green-500">Message sent successfully!</p>}
                  {error && <p className="mt-4 text-red-500">{error}</p>}
                </form>
              </div>
            </div>
            <img
              alt="Contact us"
              className="hidden max-h-full w-full rounded-lg object-cover lg:block"
              src={getImageUrl("more/contact.png")}
            />
          </div>
        </div>
      </div>
      <hr className="mt-6" />
    </section>
  );
};

export default Contact;
