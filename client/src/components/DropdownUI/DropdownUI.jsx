import React from "react";
import {
  FaBullhorn,
  FaSearch,
  FaEnvelope,
  FaClipboardList,
  FaChartLine,
  FaLaptopCode,
  FaCode,
  FaPalette,
  FaBars,
} from "react-icons/fa";
import "./DropdownUI.css";
import { TbWorldWww } from "react-icons/tb";
import { RiComputerLine } from "react-icons/ri";
import { CiMobile3 } from "react-icons/ci";

const DropdownUI = () => {
  const menuItems = [
    {
      title: "Digital Marketing",
      icon: <FaBullhorn color="purple" />,
      items: [
        "Social Media Marketing",
        "Search Engine Marketing",
        "Whatsapp Marketing",
        "Email Marketing",
        "Search Engine Optimization (SEO)",
        "Pay-per-click (PPC)",
      ],
    },
    {
      title: "Software Development",
      icon: <RiComputerLine color="blue" />,
      items: ["Website Development", "Mobile Development", "Website Designing"],
    },
    {
      title: "Graphic Designing",
      icon: <FaPalette color="pink" />,
      items: ["Logo Design", "Brochure Design", "Illustrations"],
    },
  ];

  const iconsMapping = {
    "Social Media Marketing": <FaBullhorn color="purple" />,
    "Search Engine Marketing": <FaSearch color="blue" />,
    "Whatsapp Marketing": <FaClipboardList color="green" />,
    "Email Marketing": <FaEnvelope color="orange" />,
    "Search Engine Optimization (SEO)": <FaSearch color="teal" />,
    "Pay-per-click (PPC)": <FaChartLine color="red" />,
    "Website Development": <TbWorldWww color="blue" />,
    "Mobile Development": <CiMobile3 color="darkblue" />,
    "Website Designing": <FaPalette color="pink" />,
    "Logo Design": <FaBars color="purple" />,
    "Brochure Design": <FaBars color="brown" />,
    Illustrations: <FaBars color="yellow" />,
  };

  return (
    <div className="dropdown-ui">
      {menuItems.map((menu, index) => (
        <div key={index} className="dropdown">
          <div className="dropdown-title">
            {menu.icon} <span>{menu.title}</span>
          </div>
          {menu.items && (
            <ul className="dropdown-list">
              {menu.items.map((item, idx) => (
                <li key={idx} className="dropdown-item">
                  {iconsMapping[item]} <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default DropdownUI;
