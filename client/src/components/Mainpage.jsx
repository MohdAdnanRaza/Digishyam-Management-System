import React, { useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import ServicesModal from "./ServicesModal"; // Import the new modal component
import Services from "./Services";
import Banner from "./Banner";
import Footer from "./Footer";

const Mainpage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <div>
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
      <div style={{ position: "absolute", top: "13%", left: "15%" }}>
        <Header />
      </div>
      {/* Header Section */}

      {/* Services Modal */}
      <ServicesModal open={modalOpen} onClose={handleModalToggle} />
      <div style={{ position: "absolute", top: "80%", left: "1%" }}>
        <Services />
      </div>
      <div style={{ position: "absolute", top: "170%", left: "1%" }}>
        <Banner />
      </div>
      <div style={{ position: "absolute", top: "245%", left: "1%" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Mainpage;
