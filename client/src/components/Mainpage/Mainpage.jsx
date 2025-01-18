import React, { useState } from "react";
import Navbar from "../Navbar";
import Header from "../Header";
import Services from "../Services";
import Banner from "../Banner";
import Footer from "../Footer";
import ServicesModal from "../ServicesModal";

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
      Header Section
      {/* Services Modal */}
      <ServicesModal open={modalOpen} onClose={handleModalToggle} />
      <div style={{ position: "absolute", top: "90%", left: "1%" }}>
        <Services />
      </div>
      <div style={{ position: "absolute", top: "180%", left: "1%" }}>
        <Banner />
      </div>
      <div style={{ position: "absolute", top: "265%", left: "1%" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Mainpage;
// import React, { useState } from "react";
// import "./Mainpage.css"; // Import the CSS file
// import Navbar from "../Navbar";
// import Header from "../Header";
// import Services from "../Services";
// import Banner from "../Banner";
// import Footer from "../Footer";

// const Mainpage = () => {
//   const [modalOpen, setModalOpen] = useState(false);

//   const handleModalToggle = () => {
//     setModalOpen((prev) => !prev);
//   };

//   return (
//     <div className="main-container">
//       {/* Navbar */}
//       <div className="navbar-container">
//         <Navbar onServicesClick={handleModalToggle} />
//       </div>

//       {/* Header Section */}
//       <div className="header-container">
//         <Header />
//       </div>

//       {/* Services Modal */}
//       <ServicesModal open={modalOpen} onClose={handleModalToggle} />

//       {/* Services Section */}
//       <div className="services-container">
//         <Services />
//       </div>

//       {/* Banner Section */}
//       <div className="banner-container">
//         <Banner />
//       </div>

//       {/* Footer Section */}
//       <div className="footer-container">
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Mainpage;
