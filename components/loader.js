"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="loader-container">
      <motion.div
        animate={{ opacity: [0, 1, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Image
          loading="lazy"
          placeholder="blur"
          width={100}
          height={100}
          blurDataURL="/images/logo/apneehatti_logo.svg"
          src="/images/logo/ApneeHatti_light.png" 
          alt="Brand Logo"
          className="z-20"
        />
      </motion.div>
    </div>
  );
};

export default Loader;
