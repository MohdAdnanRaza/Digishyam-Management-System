import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { IoIosArrowRoundForward } from "react-icons/io";
// import Blob from "../../assets/blob.svg";
import HeaderPng from "../assets/header.png";
import { animate, motion } from "framer-motion";

export const FadeUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};
const Header = () => {
  // return (
  //   <Container maxWidth="lg" style={{ marginTop: "50px", textAlign: "center" }}>
  //     <Typography variant="h3" style={{ fontWeight: "bold" }}>
  //       Best <span style={{ color: "#0056D2" }}>Digital Marketing </span>
  //       Company for growing your business
  //     </Typography>
  //     <Typography variant="body1" style={{ marginTop: "20px", color: "gray" }}>
  //       Delivering the best digital marketing solutions for all your business
  //       needs. Whether you want to boost your online presence, generate quality
  //       leads, or enhance customer engagement, everything is possible with our
  //       cutting-edge digital marketing strategies and tools.
  //     </Typography>
  //     <Box style={{ marginTop: "30px" }}>
  //       <Button
  //         variant="contained"
  //         style={{
  //           backgroundColor: "#0056D2",
  //           color: "white",
  //           marginRight: 10,
  //         }}
  //       >
  //         Get Started Now
  //       </Button>
  //       <Button
  //         variant="outlined"
  //         style={{ borderColor: "#0056D2", color: "#0056D2" }}
  //       >
  //         Explore Demo
  //       </Button>
  //     </Box>
  //   </Container>
  // );
  return (
    <section className="bg-light overflow-hidden relative w-custom-width h-custom-height translate-x-[-80px]">
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px]">
        {/* Brand Info */}

        <div className="flex flex-col justify-center py-14 md:py-0 relative z-20 translate-x-[-75px] translate-y-[-60px]">
          <div className="text-center md:text-left space-y-10 lg:max-w-[400px]">
            <motion.h1
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="text-3xl lg:text-5xl font-bold !leading-snug"
            >
              Best <span className="text-secondary">Digital Marketing </span>
              Company for growing your business
            </motion.h1>
            <motion.div
              variants={FadeUp(0.8)}
              initial="initial"
              animate="animate"
              className="flex justify-center md:justify-start"
            >
              <button className="primary-btn flex items-center gap-2 group">
                Get Started
                <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Hero Image */}

        <div className="flex justify-center items-center relative">
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            src={HeaderPng}
            alt=""
            className="relative z-10 drop-shadow"
            style={{
              width: "100%",
              height: "60%",
              maxWidth: "100%",
              position: "absolute",
              left: "20%",
              top: "5%",
            }} // Ensures original size or responsiveness
          />
          <motion.img
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            src={Blob}
            alt=""
            className="absolute z-[1] hidden md:block"
            style={{ width: "auto", height: "auto", maxWidth: "100%" }} // Ensures original size or responsiveness
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
