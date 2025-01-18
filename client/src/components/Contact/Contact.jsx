import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, TextField, Button } from "@mui/material";
import { FaInstagram, FaFacebookF, FaYoutube, FaGlobe } from "react-icons/fa";
import Footer from "../Footer";
import Navbar from "../Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{ position: "absolute", top: "0.2%", left: "0.5%", width: "100%" }}
    >
      <Navbar />
      <div
        className="h-200"
        style={{
          backgroundColor: "#f0f8ff",
        }}
      >
        <div className="relative">
          <div
            className="absolute inset-0 bg-black opacity-20 "
            aria-hidden="true"
          />
          <div className="relative z-10 container mx-auto px-4 py-16">
            <div className="text-center mb-12 space-y-4">
              <h1 className="text-4xl font-bold text-black mb-4">
                Get in Touch
              </h1>
              <p className="text-black/90 max-w-2xl mx-auto">
                Ready to transform your digital presence? DigiShyam is here to
                help you achieve your marketing goals. Let's create something
                amazing together.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information Card */}
              <Card
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  color: "black",
                  padding: "16px",
                }}
              >
                <CardContent>
                  <h2 className="text-2xl font-semibold mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone style={{ height: "20px", width: "20px" }} />
                      <span>+91 8171226419</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail style={{ height: "20px", width: "20px" }} />
                      <span>info@digishyam.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin style={{ height: "20px", width: "20px" }} />
                      <span>123 Rampur garden,Civil Lines,Bareilly</span>
                    </div>
                  </div>
                  <div className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a
                        href="https://www.instagram.com/digishyambareilly/"
                        className="hover:text-pink-400 transition-colors"
                      >
                        <FaInstagram size={24} />
                      </a>
                      <a
                        href="https://www.instagram.com/digishyambareilly/"
                        className="hover:text-blue-400 transition-colors"
                      >
                        <FaFacebookF size={24} />
                      </a>
                      <a
                        href="https://www.youtube.com/@digishyambly"
                        className="hover:text-red-400 transition-colors"
                      >
                        <FaYoutube size={24} />
                      </a>
                      <a
                        href="https://digishyam.com/"
                        className="hover:text-green-400 transition-colors"
                      >
                        <FaGlobe size={24} />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Form Card */}
              <Card
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  padding: "16px",
                }}
              >
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                      name="name"
                      label="Name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        style: {
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          color: "black",
                        },
                      }}
                    />
                    <TextField
                      name="email"
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        style: {
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          color: "black",
                        },
                      }}
                    />
                    <TextField
                      name="phone"
                      label="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        style: {
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          color: "black",
                        },
                      }}
                    />
                    <TextField
                      name="message"
                      label="Message"
                      value={formData.message}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        style: {
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          color: "black",
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      style={{ backgroundColor: "white", color: "purple" }}
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
