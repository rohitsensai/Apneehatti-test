"use client";
import { motion } from "framer-motion";

const EmptyCart = () => {
  return (
    <motion.div
      className="flex flex-col justify-center items-center h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 mb-3"
        viewBox="0 0 20 20"
        fill="#0da976"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v1h2a1 1 0 011 1v2a1 1 0 01-1 1h-1.447l-1.342 9.393A2 2 0 0110.219 19H6.781a2 2 0 01-1.992-1.607L3.447 8H2a1 1 0 01-1-1V5a1 1 0 011-1h2V4zm10 0H6v1h8V4zm-1 3v1H7V7h6zm-3 3v1h-2v-1h2zm-1 3v1H8v-1h4z"
          clipRule="evenodd"
        />
      </motion.svg>

      <motion.p
        className="text-xl font-semibold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Your cart is empty
      </motion.p>
      <motion.p
        className="text-gray-500 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Please add some items to continue shopping
      </motion.p>
    </motion.div>
  );
};

export default EmptyCart;
