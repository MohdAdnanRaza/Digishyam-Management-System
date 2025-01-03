import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { Business, Code, People } from "@mui/icons-material";
import AboutPng from "../assets/aboutus.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
const AboutUs = () => {
  return (
    <>
      <Container
        maxWidth={false} // Allow full-width customization
        style={{
          marginTop: "1px",
          textAlign: "center",
          width: "100%", // Increased width
          position: "absolute",
          top: "1px",
          left: "40%", // Adjust as needed to align properly
          transform: "translateX(-40%)", // Centering if needed
          background:
            "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(255,255,255,1) 100%)",
          padding: "20px", // Add inner spacing
          boxSizing: "border-box", // Maintain proper sizing
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0.2px",
            left: "2px",
            width: "100%",
          }}
        >
          <Navbar />
        </div>

        {/* About Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h3"
            style={{ fontWeight: "bold", marginTop: "60px" }}
          >
            About Us
          </Typography>
          <Typography variant="h6" style={{ marginTop: "20px", color: "gray" }}>
            We are a leading digital marketing and software development company
            dedicated to helping businesses grow their online presence and
            achieve their goals.
          </Typography>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <Box style={{ marginTop: "30px" }}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Our Mission
            </Typography>
            <Typography
              variant="body1"
              style={{ marginTop: "10px", color: "gray" }}
            >
              Our mission is to provide innovative solutions that drive results
              and empower our clients to succeed in the digital landscape.
            </Typography>
          </Box>
        </motion.div>

        {/* Services Section */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          style={{ marginTop: "50px" }}
        >
          {[
            {
              title: "Digital Marketing",
              description:
                "We offer a full range of digital marketing services to enhance your brand visibility and drive traffic to your website.",
              Icon: Business,
            },
            {
              title: "Software Development",
              description:
                "Our team creates custom software solutions tailored to your business needs, ensuring efficiency and scalability.",
              Icon: Code,
            },
            {
              title: "Client Success",
              description:
                "We prioritize our clients' success and work collaboratively to achieve their objectives.",
              Icon: People,
            },
          ].map(({ title, description, Icon }, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 + index * 0.2 }}
              >
                <Icon style={{ fontSize: "40px", color: "#1976d2" }} />
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  {title}
                </Typography>
                <Typography variant="body2" style={{ color: "gray" }}>
                  {description}
                </Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Success Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          style={{ marginTop: "60px", textAlign: "center" }}
        >
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Our Success Story
          </Typography>
          <Grid container spacing={3} style={{ marginTop: "20px" }}>
            {/* Left Side Content */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                style={{ textAlign: "left" }}
              >
                <Typography
                  variant="body1"
                  style={{
                    marginBottom: "20px",
                    color: "gray",
                    fontSize: "20px",
                  }}
                >
                  <strong>Digishyam</strong> starts providing digital growth to
                  small businesses. We came to the market and saw that some big
                  businesses are digital, and their growth is remarkable.
                  However, small businesses were struggling to go digital due to
                  the high costs of digital marketing. Recognizing this problem,
                  we introduced digital marketing services at very affordable
                  prices to help small businesses grow digitally.
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    marginBottom: "20px",
                    color: "gray",
                    fontSize: "20px",
                  }}
                >
                  We are the best Digital Marketing Company in Bareilly. Our
                  goal is to empower small businesses with the tools they need
                  for digital success. If you want to grow digitally, reach out
                  to us and discover how we can help you.
                </Typography>
              </motion.div>
            </Grid>

            {/* Right Side Image */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
              >
                <img
                  src={AboutPng}
                  alt="Success Story"
                  style={{
                    width: "36%",
                    position: "absolute",
                    top: "50%",
                    left: "80%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
        <Footer />
      </Container>
    </>
  );
};

export default AboutUs;
