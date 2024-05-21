"use client";

import { GiReturnArrow, GiRibbonMedal } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { SiBrandfolder } from "react-icons/si";
import Link from "next/link";
import { useMemo } from "react";
import FooterSection from "./footerSection";
import { FacebookIcon, LinkedinIcon, TwitterIcon } from "react-share";
import { BsInstagram, BsFacebook, BsTwitter, BsLinkedin, BsGoogle } from "react-icons/bs";
import { FaArrowUp } from 'react-icons/fa';

import { Divider } from "@mui/material";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFacebookF, faInstagram, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { FaFacebook, FaInbox, FaInstagram, FaLinkedin, faInstagram, faLinkedinIn, faTwitter } from 'react-icons/fa';



const Footer = ({ categories }) => {
  //   const renderCategories = useMemo(() => {
  //     if (categories) {
  //       return categories.map((cat) => (
  //         <Link
  //           key={cat._id}
  //           href={{
  //             pathname: "/search",
  //             query: { category: cat.slug },
  //           }}
  //         >
  //           <a target="_blank" rel="noopener noreferrer">
  //             <span className="block hover:underline  font-medium text-gray-600 mb-1 capitalize">
  //               {cat.name}
  //             </span>
  //           </a>
  // </Link>
  //       ));
  //     }
  //     return null;
  //   }, [categories]);
  const [isMounted, setIsMounted] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll animation
    });
  };


  useEffect(() => {
    // Set isMounted to true when component mounts (client-side)
    setIsMounted(true);
  }, []);
  return (
    <div>
      <div className="d-flex flex-row justify-content-center bg-dark text-white cursor-pointer topmover" onClick={handleScrollToTop}>
        Back to Top <span>  <FaArrowUp /></span>
      </div>
      <div className="footer  text-white  " style={{ backgroundColor: "#191919" }}>
      <div className="mt-2 d-flex flex-column item-center justify-content-center">
      <div style={{ fontFamily: "Jockey One" }}>HELP</div>
      <a href="/policy" style={{ color: "#7A7A7A" }} className="d-block underlinee   ">Shipping Policy</a>
      <a href="/policy" style={{ color: "#7A7A7A" }} className="d-block underlinee  ">Return Policy</a>
      <a href="/policy" style={{ color: "#7A7A7A" }} className="d-block underlinee   ">Cancellation Policy</a>
      <a href="/FAQs" style={{ color: "#7A7A7A" }} className="d-block underlinee  ">FAQ</a>
    </div>
        <div className="mt-2 d-flex flex-column">
          <div style={{ fontFamily: "Jockey One" }}>CONTACT US</div>
          <div style={{ color: "#7A7A7A" }}  className="d-block underlinee  ">Mobile +91 <span></span>7876752516</div>
          <div style={{ color: "#7A7A7A" }}  className="d-block underlinee ">Email:support@anpneehatti.com</div>
        </div>
        <div className="mt-2 d-flex flex-column ">
          <div style={{ fontFamily: "Jockey One" }}>TOP CATEGORIES</div>
          
            <a href="/search?category=Handlooms" style={{ color: "#7A7A7A" }}  className="d-block underlinee  ">Handlooms</a>
         
            <a href="/search?category=Skincare-and-Beauty" style={{ color: "#7A7A7A" }}  className="d-block underlinee  ">Skincare & Beauty</a>
       
            <a href="/search?category=Handcrafts" style={{ color: "#7A7A7A" }}  className="d-block underlinee   ">Handcrafts</a>
       
            <a href="/search?category=Organic-Food-Products" style={{ color: "#7A7A7A" }} className="d-block underlinee ">Organic Food Products</a>
        
            <a href="/search?category=Health-Care" style={{ color: "#7A7A7A" }}  className="d-block underlinee ">Health Care</a>
      
        </div>
        <div className="mt-2 mx-20" >
          <div className="mb-1 text-center" style={{ fontFamily: 'Jockey One' }}>FOLLOW APNEEHATTI</div>
          <div className=" mx-0" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <a href="https://www.facebook.com/Apneehatti-103048901780149">
              <BsFacebook size={20} />
            </a>
            <a href="https://twitter.com/ApneeHatti">
              <BsInstagram size={20} />
            </a>
            <a href="https://twitter.com/ApneeHatti">
              <BsTwitter size={20} />
            </a>
            <a href="https://www.linkedin.com/company/apneehatti">
              <BsLinkedin size={20} />
            </a>
          </div>
          <div className="mt-10  align-item-center d-flex flex-row justify-content-center cursor-pointer">Certificates</div>

        </div>

      </div>

    </div>

    // <footer className="hidden   md:block  text-center border-t-4 border-green-400 shadow-2xl shadow-green-400 ">


    //  <div className="p-1 border-t-2">
    //       <div className="text-center mb-2 border-b-2 py-10 ">
    //         <h4 className="text-2xl font-bold mb-2">ApneeHatti</h4>
    //         <h5 className="text-gray-500">
    //           &nbsp;&nbsp;&nbsp;Apneehatti is an online marketplace that
    //           connects local businesses in Himachal with the big cities of India
    //         </h5>
    //         <div className="">
    //           <ul className="grid grid-cols-4 w-48 mx-auto pt-3">
    //             <li
    //               className="col-lg-3 col-md-3 col-sm-3"
    //               data-text="Facebook"
    //               data-color="#1877f2"
    //             >
    //               <a
    //                 className="facebook"
    //                 target="_blank"
    //                 href="https://www.facebook.com/Apneehatti-103048901780149"
    //               >
    //                 <i class="fab fa-facebook-f"></i>
    //               </a>
    //             </li>
    //             <li
    //               className="col-lg-3 col-md-3 col-sm-3"
    //               data-text="Twitter"
    //               data-color="#0099ff"
    //             >
    //               <a
    //                 className="twitter"
    //                 target="_blank"
    //                 href="https://twitter.com/ApneeHatti"
    //               >
    //                 <i class="fab fa-twitter"></i>
    //               </a>
    //             </li>
    //             <li
    //               className="col-lg-3 col-md-3 col-sm-3"
    //               data-text="Instagram"
    //               data-color="#e4405f"
    //             >
    //               <a
    //                 className="instagram"
    //                 target="_blank"
    //                 href="https://www.instagram.com/apneehatti/"
    //               >
    //                 <i class="fab fa-instagram"></i>
    //               </a>
    //             </li>
    //             <li
    //               className="col-lg-3 col-md-3 col-sm-3"
    //               data-text="Youtube"
    //               data-color="#ff0000"
    //             >
    //               <a
    //                 className="youtube"
    //                 target="_blank"
    //                 href="https://www.linkedin.com/company/apneehatti"
    //               >
    //                 <i class="fab fa-youtube"></i>
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //       <div className="grid grid-cols-2 p-4 border-b-2">
    //         <div className="">
    //           <h4 className="text-lg font-semibold mb-2 capitalize">
    //             About us
    //           </h4>
    //           <h5 className="font-normal text-sm text-gray-600 text-md py-1">
    //             About us
    //           </h5>
    //           <h5 className="font-normal text-sm text-gray-600 text-md py-1">
    //             Contact us <span>apneehatti@gmai.com</span>
    //           </h5>
    //           <h5 className="font-normal text-sm text-gray-600 text-md py-1">
    //             About team
    //           </h5>
    //           <h5 className="font-normal text-sm text-gray-600 text-md py-1">
    //             Customer support
    //           </h5>
    //         </div>
    //         <div className="">
    //           <h4 className="text-lg font-semibold mb-2 capitalize">
    //             Our Information
    //           </h4>
    //           <h5 className="font-normal text-sm text-gray-600 text-md py-1">
    //             Privacy policy
    //           </h5>
    //           <h5 className="font-normal text-sm text-gray-600 text-md py-1">
    //             Terms & conditions
    //           </h5>
    //           <h5 className="font-normal text-sm text-gray-600 text-md py-1">
    //             Return policy
    //           </h5>
    //           <h5 className="font-normal text-sm text-gray-600 text-md py-1">
    //             Site map
    //           </h5>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="p-10">
    //       <h6 className="font-medium text-sm text-center ">
    //         @Copyrights 2021. All rights reserved by apneehatti LLP .
    //       </h6>
    //     </div>













    /* <div className="bg-gradient-to-br border-t">
        <div className="container mx-auto grid grid-cols-5 py-9 gap-x-3 text-start">
          <FooterSection
           icon={
             <TbTruckDelivery className="text-5xl bg-green-100 p-2 text-green-700 border border-green-200 shadow-md rounded-full" />
           }
           title="Pan India Delivery"
           subtitle=""
         />
         <FooterSection
           icon={
             <GiReturnArrow className="text-5xl bg-green-100 p-2 text-green-700 border border-green-200 shadow-md rounded-full" />
           }
           title="Easy returns"
           subtitle="7 day return policy"
         />
         <FooterSection
           icon={
             <GiRibbonMedal className="text-5xl bg-green-100 p-2 text-green-700 border border-green-200 shadow-md rounded-full" />
           }
           title="100% authentic"
           subtitle="Products sourced directly"
         />
         <FooterSection
           icon={
             <SiBrandfolder className="text-5xl bg-green-100 p-2 text-green-700 border border-green-200 shadow-md rounded-full" />
           }
           title="50+ Brands"
           subtitle="500+ Products"
         />
         <div className="py-5 px-4 space-y-3 font-serif font-bold">
           <p>Follow us on social media for trending offers.</p>
           <div className="grid grid-cols-4">
             <Link href={"https://www.linkedin.com/company/75711800/admin"}>
               <a target="_blank" rel="noopener noreferrer">
                 <LinkedinIcon size={40} round />
               </a>
             </Link>
             <Link href={"https://twitter.com/Apneehatti_"}>
               <a target="_blank" rel="noopener noreferrer">
                 <TwitterIcon size={40} round />
               </a>
             </Link>
             <Link href={"https://www.facebook.com/Apneehatti0008"}>
               <a target="_blank" rel="noopener noreferrer">
                 <FacebookIcon size={40} round />
               </a>
             </Link>
             <Link href={"https://www.instagram.com/apneehatti_official"}>
               <h6 className="bg-gradient-to-tr from-pink-300  to-orange-500 rounded-full w-fit p-2  flex justify-center items-center">
                 <a target="_blank" rel="noopener noreferrer">
                   <BsInstagram className="text-xl" />
                 </a>
               </h6>
             </Link>
           </div>
         </div>
       </div>
     </div>
     <div className="py-9">
       <div className="flex gap-x-3 w-11/12 lg:w-4/5 text-sm mx-auto pb-4 md:py-4">
         <div className="w-full grid grid-cols-2 md:grid-cols-3 text-justify gap-4">
           <div>
             <h5 className="font-bold text-md uppercase font-serif mb-1">
               Help
             </h5>
             <div className="mt-2 cursor-pointer">
               <Link href="/policy">
                 <h5 className="font-medium text-gray-600 mb-1 capitalize hover:underline">
                   Shipping policy
                 </h5>
               </Link>
               <Link href="/policy">
                 <h5 className="font-medium text-gray-600 mb-1 capitalize hover:underline">
                   Return policy
                 </h5>
               </Link>
               <Link href="/policy">
                 <h5 className="font-medium text-gray-600 mb-1 capitalize hover:underline">
                   Cancellation policy
                 </h5>
               </Link>
               <Link href="/FAQs">
                 <h5 className="font-medium text-gray-600 mb-1 capitalize hover:underline">
                   FAQ
                 </h5>
               </Link>
             </div>
           </div>
           <div>
             <h5 className="font-bold text-md uppercase font-serif mb-1">
               Contact Us
             </h5>
             <div className="mt-2 ">
               <h5 className="font-medium text-gray-600 mb-1 capitalize">
                 Mobile: +917876752516
               </h5>
               <h5 className="font-medium text-gray-600 mb-1">
                 Email: support@apneehatti.com
               </h5>
             </div>
           </div>
           <div>
             <h5 className="font-bold text-md uppercase font-serif mb-1">
               Top categories
             </h5>
             <div className="mt-2 cursor-pointer">{renderCategories}</div>
           </div>
         </div>
         <div>
           <div className="text-start capitalize space-y-2">
             <p className="font-bold font-serif uppercase">
               for any help, you may call us at +917876752516
             </p>
             <p className="text-sm text-gray-600 font-medium">
               ( Monday to saturday, 8AM to 10PM and sunday, 10AM to 7PM )
             </p>
           </div>
         </div>
       </div>
        <div className="w-11/12 md:w-1/2 mx-auto text-justify">
         <p className="text-sm text-gray-600 font-medium mb-1">
           Join our mailing list and never miss an update
         </p>
         <div className="w-full">
           <label className="text-sm md:text-md font-medium text-gray-900">
             Mail
           </label>
           <div className="flex gap-x-3 mt-1">
             <input className="w-full" type="email" />
             <button className="px-5 hover:bg-black border-2 border-black hover:text-white uppercase font-medium text-sm transition-all duration-300">
               Subscribe
             </button>
           </div>
         </div>
       </div> 
      </div>
     <div className="bg-green-400 px-2 py-4">
       <span className="text-sm font-semibold">
         @copyrights 2023. All rights reserved by apneehatti LLP.
       </span>
     </div> */
    // </footer> 



  );
};

export default Footer;
