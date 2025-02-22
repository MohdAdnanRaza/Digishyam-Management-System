import React, { useState } from "react";
import Navbar from "../Navbar";
import Header from "../Header";
import Services from "../Services";
import Banner from "../Banner";
import Footer from "../Footer";
import ServicesModal from "../ServicesModal";
import ClientShowcase from "./ClientShowcase";
import WhyChooseDigishyam from "../WhyChooseDigishyam";
const Mainpage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <div
      style={{ width: "100%", margin: "0", padding: "0", overflowX: "hidden" }}
    >
      {/* Navbar */}
      <div
        style={{
          position: "absolute",
          top: "1px",
          left: "1px",
          width: "100%",
        }}
      >
        <Navbar onServicesClick={handleModalToggle} />
      </div>
      <div className="absolute md:absolute md:top-[14%] md:left-[6%] top-[16%] left-[1%] w-full">
        <Header />
      </div>

      {/* Services Modal */}
      <ServicesModal open={modalOpen} onClose={handleModalToggle} />
      <div className="absolute md:absolute md:top-[84%] md:left-[6%] top-[144%] left-[1%]">
        <Services />
      </div>
      <div className="absolute md:absolute md:top-[190%] md:left-[1%] top-[649%] left-[1%]">
        <Banner />
      </div>
      <div className="absolute md:absolute md:top-[300%] md:left-0 top-[838%] left-[12%] w-100 md:w-10/12 lg:w-full">
        <ClientShowcase />
      </div>
      <div className="absolute md:absolute md:top-[402%] md:left-[1%] top-[1080%] left-[1%] w-100 md:w-10/12 lg:w-full">
        <WhyChooseDigishyam />
      </div>
      <div className="absolute md:absolute md:top-[502%] md:left-[1%] top-[1400%] left-[1%] w-100 md:w-10/12 lg:w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Mainpage;
