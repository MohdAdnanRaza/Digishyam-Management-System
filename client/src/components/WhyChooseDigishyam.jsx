import { FiShield, FiClock, FiTrendingUp, FiUsers } from "react-icons/fi";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedNumber = ({ value, symbol }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayedNumber, setDisplayedNumber] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, { duration: 2 });
    return () => controls.stop(); // stop animation when the component unmounts
  }, [value]);

  // Listen to the motion value and update the state with the rounded value
  useEffect(() => {
    const unsubscribe = rounded.onChange((latest) => {
      setDisplayedNumber(latest);
    });
    return () => unsubscribe();
  }, [rounded]);

  return (
    <motion.div className="inline-flex items-center">
      <div>{displayedNumber}</div>
      <div>{symbol}</div>
    </motion.div>
  );
};

const WhyChooseDigishyam = () => {
  const features = [
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Secure Solutions",
      description:
        "Enterprise-grade security with end-to-end encryption and compliance certifications",
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "24/7 Support",
      description:
        "Round-the-clock technical support with guaranteed response times",
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Proven Results",
      description: "90% of clients see measurable growth within first 6 months",
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Expert Team",
      description:
        "Certified professionals with 5+ years average industry experience",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose Digishyam?
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Delivering exceptional value through innovative digital solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full text-blue-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              <AnimatedNumber value={150} symbol="+" />
            </div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              <AnimatedNumber value={98} symbol="%" />
            </div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              <AnimatedNumber value={24} symbol="/7" />
            </div>
            <div className="text-gray-600">Support Availability</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              <AnimatedNumber value={5} symbol="+" />
            </div>
            <div className="text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseDigishyam;
