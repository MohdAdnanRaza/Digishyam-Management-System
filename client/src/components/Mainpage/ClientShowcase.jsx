// import React from "react";
// import { motion } from "framer-motion";
// import { Hospital, Anchor, Activity } from "lucide-react";

// const clients = [
//   {
//     name: "Sai Sukhda Hospital",
//     icon: Hospital,
//     color: "bg-blue-500",
//     description: "Comprehensive Healthcare Services",
//   },
//   {
//     name: "Hexa Lift",
//     icon: Anchor,
//     color: "bg-green-500",
//     description: "Advanced Lifting Solutions",
//   },
//   {
//     name: "Flex Gym Fitness",
//     icon: Activity,
//     color: "bg-purple-500",
//     description: "Fitness & Wellness Center",
//   },
//   {
//     name: "Ishaan Hospital",
//     icon: Hospital,
//     color: "bg-red-500",
//     description: "Modern Medical Care",
//   },
//   {
//     name: "Mahajan Hospital",
//     icon: Hospital,
//     color: "bg-indigo-500",
//     description: "Specialized Healthcare",
//   },
//   {
//     name: "Rai Dental & Implant Centre",
//     icon: Activity,
//     color: "bg-teal-500",
//     description: "Advanced Dental Solutions",
//   },
// ];

// const ClientShowcase = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-8 py-16  w-full mx-12">
//       <motion.h1
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-4xl font-bold text-center mb-12 text-gray-800"
//       >
//         Our Valued Clients
//       </motion.h1>

//       <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8">
//         {clients.map((client, index) => (
//           <motion.div
//             key={client.name}
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{
//               duration: 0.5,
//               delay: index * 0.2,
//             }}
//             whileHover={{
//               scale: 1.05,
//               rotate: 3,
//               boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
//             }}
//             className={`${client.color} text-white p-6 rounded-xl shadow-lg text-center transform transition-all`}
//           >
//             <div className="flex justify-center mb-4">
//               <client.icon size={64} strokeWidth={1.5} />
//             </div>
//             <h2 className="text-xl font-semibold mb-2">{client.name}</h2>
//             <p className="text-sm opacity-80">{client.description}</p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ClientShowcase;
import React from "react";
import { motion } from "framer-motion";
import { Hospital, Anchor, Activity } from "lucide-react";

const clients = [
  {
    name: "Sai Sukhda Hospital",
    icon: Hospital,
    color: "bg-blue-500",
    description: "Comprehensive Healthcare Services",
  },
  {
    name: "Hexa Lift",
    icon: Anchor,
    color: "bg-green-500",
    description: "Advanced Lifting Solutions",
  },
  {
    name: "Flex Gym Fitness",
    icon: Activity,
    color: "bg-purple-500",
    description: "Fitness & Wellness Center",
  },
  {
    name: "Ishaan Hospital",
    icon: Hospital,
    color: "bg-red-500",
    description: "Modern Medical Care",
  },
  {
    name: "Mahajan Hospital",
    icon: Hospital,
    color: "bg-indigo-500",
    description: "Specialized Healthcare",
  },
  {
    name: "Rai Dental & Implant Centre",
    icon: Activity,
    color: "bg-teal-500",
    description: "Advanced Dental Solutions",
  },
];

const ClientShowcase = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 sm:px-8 py-10 sm:py-16 w-full">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800"
      >
        Our Valued Clients
      </motion.h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {clients.map((client, index) => (
          <motion.div
            key={client.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
            }}
            whileHover={{
              scale: 1.05,
              rotate: 3,
              boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
            }}
            className={`${client.color} text-white p-4 sm:p-6 rounded-xl shadow-lg text-center transform transition-all`}
          >
            <div className="flex justify-center mb-3 sm:mb-4">
              <client.icon size={48} sm:size={64} strokeWidth={1.5} />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
              {client.name}
            </h2>
            <p className="text-sm sm:text-base opacity-80">
              {client.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ClientShowcase;
