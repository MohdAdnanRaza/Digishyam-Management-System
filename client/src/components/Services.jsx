import React from "react";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"; // MUI Dialog components
import { Button } from "@mui/material"; // MUI Button component
import { TbWorldWww } from "react-icons/tb";
import { CiMobile3 } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import { RiComputerLine } from "react-icons/ri";
import {
  FaBars,
  FaBullhorn,
  FaChartLine,
  FaClipboardList,
  FaEnvelope,
  FaSearch,
} from "react-icons/fa";
// Service details mapping
const serviceDetails = {
  "Web Development": {
    description:
      "Professional web development services including frontend and backend development, responsive design, and modern web applications using latest technologies like React, Node.js, and more.",
    features: [
      "Custom Website Development",
      "E-commerce Solutions",
      "CMS Development",
      "API Integration",
      "Web Application Development",
    ],
    price: "₹9999",
  },
  "Mobile Development": {
    description:
      "Comprehensive mobile app development services for iOS and Android platforms using native and cross-platform technologies.",
    features: [
      "Native iOS Development",
      "Native Android Development",
      "Cross-platform Development",
      "App Maintenance",
      "App Store Optimization",
    ],
    price: "₹1199",
  },
  "Software Development": {
    description:
      "Delivering customized software solutions tailored to meet your business needs, including enterprise applications, desktop software, and system integrations.",
    features: [
      "Custom Software Development",
      "Enterprise Application Development",
      "System Integrations",
      "UI/UX Design",
      "Quality Assurance & Testing",
      "Software Maintenance & Support",
    ],
    price: "₹14999",
  },

  "Social Media Marketing": {
    description:
      "Boost your brand's presence on popular social media platforms with customized marketing strategies, content creation, and community engagement.",
    features: [
      "Social Media Strategy Development",
      "Content Creation & Curation",
      "Paid Advertising Campaigns",
      "Influencer Marketing",
      "Audience Engagement & Analytics",
    ],
    price: "₹999",
  },
  "SEO Optimization": {
    description:
      "Improve your website's visibility and rankings on search engines with targeted SEO strategies, keyword optimization, and on-page & off-page techniques.",
    features: [
      "On-page SEO Optimization",
      "Keyword Research & Strategy",
      "Backlink Building",
      "SEO Audits & Reports",
      "Content Marketing for SEO",
    ],
    price: "₹1199",
  },

  "Search Engine Marketing": {
    description:
      "Increase your website's visibility through paid search engine campaigns like Google Ads, targeting the right audience with the best budget strategies.",
    features: [
      "Google Ads Campaigns",
      "Keyword Research & Bidding Strategies",
      "Ad Copywriting & Design",
      "Performance Tracking & Optimization",
      "Targeted Audience & Demographics",
    ],
    price: "₹1499",
  },
  "WhatsApp Marketing": {
    description:
      "Reach your customers directly with personalized messages and promotions through WhatsApp, a powerful tool for instant communication.",
    features: [
      "Bulk WhatsApp Messaging",
      "WhatsApp Campaign Strategy",
      "Customer Engagement & Support",
      "WhatsApp Automation",
      "Tracking & Analytics",
    ],
    price: "₹799",
  },
  "Email Marketing": {
    description:
      "Design and execute successful email campaigns to keep your audience engaged, with personalized email lists, content, and detailed performance analytics.",
    features: [
      "Email Campaign Strategy",
      "Template Design & Customization",
      "Personalized Email Lists",
      "Tracking & Analytics",
      "Automated Email Sequences",
    ],
    price: "₹899",
  },
  "Pay Per Click": {
    description:
      "Drive targeted traffic to your website with effective PPC campaigns, ensuring the best return on investment through Google Ads, Facebook Ads, and more.",
    features: [
      "Google Ads Campaign Management",
      "Facebook & Instagram Ads",
      "Targeted Audience Bidding",
      "Ad Creation & Testing",
      "Conversion Rate Optimization",
    ],
    price: "₹1299",
  },
  "Logo Design": {
    description:
      "Create a strong brand identity with custom logo designs that reflect your brand values and vision, ensuring a memorable and professional look.",
    features: [
      "Custom Logo Design",
      "Brand Identity Creation",
      "Multiple Design Concepts",
      "Revisions & Feedback Integration",
      "Vector File Formats",
    ],
    price: "₹499",
  },
  "Brochure Design": {
    description:
      "Design visually appealing brochures that effectively communicate your brand's message, products, or services with a strong call to action.",
    features: [
      "Custom Brochure Design",
      "Creative Layout & Graphics",
      "High-Quality Printing",
      "Digital and Print Formats",
      "Content Integration & Proofreading",
    ],
    price: "₹699",
  },
  "24/7 Support": {
    description:
      "Offer continuous customer support through various channels like chat, email, and phone, ensuring your customers' queries are addressed round-the-clock.",
    features: [
      "Live Chat Support",
      "Email & Ticket Support",
      "Phone Support",
      "Remote Troubleshooting",
      "Custom Support Solutions",
    ],
    price: "₹1499",
  },
};

const ServicesData = [
  {
    id: 1,
    title: "Web Development",
    link: "#",
    icon: <TbWorldWww sx={{ color: "blue" }} />, // MUI icon styling
    delay: 0.2,
  },
  {
    id: 2,
    title: "Mobile Development",
    link: "#",
    icon: <CiMobile3 sx={{ color: "yellow" }} />,
    delay: 0.3,
  },
  {
    id: 3,
    title: "Software Development",
    link: "#",
    icon: <RiComputerLine sx={{ color: "pink" }} />,
    delay: 0.4,
  },
  {
    id: 4,
    title: "Social Media Marketing",
    link: "#",
    icon: <FaBullhorn sx={{ color: "purple" }} />,
    delay: 0.5,
  },
  {
    id: 5,
    title: "SEO Optimization",
    link: "#",
    icon: <FaSearch sx={{ color: "teal" }} />,
    delay: 0.6,
  },
  {
    id: 6,
    title: "Search Engine Marketing",
    link: "#",
    icon: <FaSearch color="blue" />,
    delay: 0.2,
  },
  {
    id: 7,
    title: "WhatsApp Marketing",
    link: "#",
    icon: <FaClipboardList sx={{ color: "green" }} />,
    delay: 0.3,
  },
  {
    id: 8,
    title: "Email Marketing",
    link: "#",
    icon: <FaEnvelope sx={{ color: "orange" }} />,
    delay: 0.4,
  },
  {
    id: 9,
    title: "Pay Per Click",
    link: "#",
    icon: <FaChartLine sx={{ color: "red" }} />,
    delay: 0.5,
  },
  {
    id: 10,
    title: "Logo Design",
    link: "#",
    icon: <FaBars color="brown" />,
    delay: 0.6,
  },
  {
    id: 11,
    title: "Brochure Design",
    link: "#",
    icon: <FaBars color="purple" />,
    delay: 0.7,
  },
  {
    id: 12,
    title: "24/7 Support",
    link: "#",
    icon: <BiSupport sx={{ color: "gray" }} />,
    delay: 0.7,
  },
];

const SlideLeft = (delay) => {
  return {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const ServiceCard = ({ service }) => {
  const [open, setOpen] = React.useState(false); // Manage dialog state

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <motion.div
        variants={SlideLeft(service.delay)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="bg-[#f4f4f4] rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 hover:shadow-2xl cursor-pointer"
        onClick={handleClickOpen}
      >
        <div className="text-4xl mb-4">{service.icon}</div>
        <h1 className="text-lg font-semibold text-center px-3">
          {service.title}
        </h1>
      </motion.div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{service.icon}</span>
            {service.title}
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="py-4">
            {serviceDetails[service.title] ? (
              <>
                <p className="text-gray-600 mb-4">
                  {serviceDetails[service.title].description}
                </p>
                <div className="space-y-2 mb-6">
                  <h3 className="font-semibold">Key Features:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {serviceDetails[service.title].features.map(
                      (feature, index) => (
                        <li key={index} className="text-gray-600">
                          {feature}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">
                    Starting at {serviceDetails[service.title].price}
                  </span>
                  <Button variant="contained" color="primary">
                    <a href="mailto:info@digishyam.com">Get Started</a>
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-gray-600">
                Details for this service will be available soon. Please contact
                us for more information.
              </p>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const Services = () => {
  return (
    <section className="bg-white translate-y-[60px] translate-x-[1px] w-[104%]">
      <div className="container pb-14 pt-16">
        <h1 className="text-4xl font-bold text-left pb-10">
          Services we provide
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {ServicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
