"use client";

import React from "react";
import { FaArrowUp } from "react-icons/fa";

const Whatsapp = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="cursor-pointer fixed right-8 bottom-28 z-10 " onClick={handleScrollToTop}>
      <FaArrowUp style={{ fontSize: "2em" }} />
      <div style={{ fontSize: "0.7em", fontFamily: "cursive" }} className="fixed right-4 bottom-36 z-6">
        Back to Top
      </div>
    </div>
  );
};

export default Whatsapp;
