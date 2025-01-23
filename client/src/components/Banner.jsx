import React from "react";
import BannerPng from "../assets/banner.png";
import { FaServicestack } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import { IoIosPricetag } from "react-icons/io";
import { motion } from "framer-motion";
import { FadeUp } from "../components/Header";

const Banner = () => {
  return (
    <section className="bg-gray-100">
      <div className="container mx-auto px-4 py-14 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Banner Image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            src={BannerPng}
            alt="Digital Marketing"
            className="w-[90%] sm:w-[80%] md:max-w-[450px] object-cover drop-shadow"
          />
        </div>

        {/* Banner Text */}
        <div className="flex flex-col justify-center sm:mt-0 mt-12">
          <div className="text-center md:text-left space-y-8 md:space-y-12">
            <motion.h1
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug"
            >
              The Best Leading Digital Marketing Service Provider
            </motion.h1>
            <div className="flex flex-col gap-6">
              {/* Service Item 1 */}
              <motion.div
                variants={FadeUp(0.2)}
                initial="initial"
                whileInView={"animate"}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-6 bg-[#f4f4f4] rounded-2xl hover:bg-white duration-300 hover:shadow-lg"
              >
                <FaServicestack className="text-2xl text-blue-500" />
                <p className="text-lg">20+ Services</p>
              </motion.div>
              {/* Service Item 2 */}
              <motion.div
                variants={FadeUp(0.4)}
                initial="initial"
                whileInView={"animate"}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-6 bg-[#f4f4f4] rounded-2xl hover:bg-white duration-300 hover:shadow-lg"
              >
                <FaShippingFast className="text-2xl text-green-500" />
                <p className="text-lg">Fast and Effective Delivery</p>
              </motion.div>
              {/* Service Item 3 */}
              <motion.div
                variants={FadeUp(0.6)}
                initial="initial"
                whileInView={"animate"}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-6 bg-[#f4f4f4] rounded-2xl hover:bg-white duration-300 hover:shadow-lg"
              >
                <IoIosPricetag className="text-2xl text-red-500" />
                <p className="text-lg">Affordable Prices</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
