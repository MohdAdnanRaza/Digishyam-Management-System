import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";

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
  return (
    <section className="bg-light overflow-hidden relative w-full h-auto md:h-[650px]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-4 md:px-8">
        {/* Brand Info */}
        <div className="flex flex-col justify-center space-y-6 md:space-y-8 py-10 md:py-0">
          <motion.h1
            variants={FadeUp(0.6)}
            initial="initial"
            animate="animate"
            className="text-3xl lg:text-5xl font-bold !leading-snug ml-3  md:mt-12 "
          >
            Best <span className="text-secondary">Digital</span>
            <br />
            <span className="text-secondary ">Marketing</span> <br />{" "}
            <span className="md:mt-4">Company for</span> <br />
            <span className="md:mt-4">growing your</span> <span>business</span>
          </motion.h1>

          <motion.div
            variants={FadeUp(0.8)}
            initial="initial"
            animate="animate"
            className="flex justify-center md:justify-start  -ml-9 md:ml-9"
          >
            <button className="primary-btn flex items-center gap-2 group">
              <a href="mailto:info@digishyam.com">Get Started</a>
              <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
            </button>
          </motion.div>
        </div>

        {/* Hero Image */}
        <div className="relative flex justify-center items-center transform md:translate-y-0 translate-y-[-20px]">
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            src="/assets/header.png"
            alt="Hero Graphic"
            className="relative z-10 drop-shadow  max-w-full w-[90%] md:w-[60%] lg:w-[80%] "
          />
          <motion.img
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            className="absolute z-[1] hidden md:block w-[150%] md:w-[100%] lg:w-[80%] opacity-70"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
