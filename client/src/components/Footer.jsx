import React from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Youtube,
  Globe,
  Send,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import logo from "../assets/logo.png";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-100 to-gray-200 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            {/* <h2 className="text-3xl font-bold text-primary">DigiShyam</h2> */}
            <img
              src={logo} // Replace with your logo's file path
              alt="DigiShyam Logo"
              style={{ height: "70px", width: "auto" }} // Adjust the height as needed
            />
            <p className="text-gray-600 leading-relaxed">
              Delivering cutting-edge digital marketing solutions to transform
              your online presence, generate quality leads, and enhance customer
              engagement through innovative strategies.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/yourwhatsappnumber"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-green-500 hover:text-green-600"
                >
                  <Send size={24} />
                </motion.div>
              </a>
              <a
                href="https://www.instagram.com/digishyambareilly/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-pink-500 hover:text-pink-600"
                >
                  <Instagram size={24} />
                </motion.div>
              </a>
              <a
                href="https://digishyam.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Globe size={24} />
                </motion.div>
              </a>
              <a
                href="https://www.youtube.com/@digishyambly"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-red-500 hover:text-red-600"
                >
                  <Youtube size={24} />
                </motion.div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-600">
                {[
                  "Web Development",
                  "Software Development",
                  "Apps Development",
                  "E-learning",
                ].map((service) => (
                  <li
                    key={service}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600">
                {["Home", "Services", "About", "Contact"].map((link) => (
                  <li
                    key={link}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className=" font-semibold">Contact Us</h3>
            <div className="flex items-center space-x-3 text-gray-600">
              <MapPin size={30} />
              <span>
                Dhanwantri Chauraha Rampur Garden Bareilly , Uttar Pradesh
              </span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Phone size={20} />
              <span>+91 8171226419</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Mail size={20} />
              <span>info@digishyam.com</span>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 rounded-l-lg border w-full focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <button className="bg-primary text-white px-6 rounded-r-lg hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-gray-500 border-t pt-6">
          © {new Date().getFullYear()} DigiShyam. All Rights Reserved.
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
