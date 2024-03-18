"use client";
import Link from "next/link";
import React from "react";
import { WhatsappIcon } from "react-share";

const Whatsapp = () => {
  return (
    <div className="cursor-pointer ">
        
      <Link
        href={
          "https://api.whatsapp.com/send/?phone=917876752516&text&type=phone_number&app_absent=0"
        }
      >
        <a target="_blank" rel="noopener noreferrer">
         <div className="fixed right-1 bottom-20 z-6"  style={{fontSize:"0.7em",fontFamily:"cursive"}}> Click me for help and Support</div>
          <WhatsappIcon round className="fixed right-4 bottom-4 z-10" />
        </a>
      </Link>
    </div>
  );
};

export default Whatsapp;
