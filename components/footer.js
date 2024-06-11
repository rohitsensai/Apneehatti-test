"use client";

import { GiReturnArrow, GiRibbonMedal } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { SiBrandfolder } from "react-icons/si";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import FooterSection from "./footerSection";
import { FacebookIcon, LinkedinIcon, TwitterIcon } from "react-share";
import { BsInstagram, BsFacebook, BsTwitter, BsLinkedin, BsGoogle } from "react-icons/bs";
import { FaArrowUp } from "react-icons/fa";
import { Divider } from "@mui/material";

const Footer = ({ categories }) => {
  const [isMounted, setIsMounted] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll animation
    });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      {/* <div
        className="d-flex flex-row justify-content-center bg-dark text-white cursor-pointer topmover"
        onClick={handleScrollToTop}
      >
        <FaArrowUp size={36} />
      </div> */}
      <footer className="footer">
        <div className="container">
          <div className="footer_inner">
            <div className="c-footer">
              <div className="layout">
                <div className="layout_item w-50">
                  <div className="newsletter">
                    <h3 className="newsletter_title">
                      Get updates on Himalayas products you probably want to know about in your inbox.
                    </h3>
                    <form action="" className="ml-12">
                      <input type="text" placeholder="Email Address" />
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>

                <div className="layout_item w-25">
                  <nav className="c-nav-tool">
                    <h4 className="c-nav-tool_title fw-bold mb-4">Menu</h4>
                    <ul className="c-nav-tool_list">
                      <li className="">
                      <span className="hover-underline">
                        <Link href="/search?category=all" className="c-link hover-underline">
                          
                          Shop All
                          
                        </Link>
                        </span>
                      </li>
                      <li>
                      <span className="hover-underline">
                        <Link href="about-us" className="c-link">
                          About Us
                          </Link>
                          </span>
                      </li>
                      <li>
                      <span className="hover-underline">
                        <Link href="/blogs/community" className="c-link">
                          Community
                        </Link>
                        </span>
                      </li>
                      <li>
                      <span className="hover-underline">
                        <a href="#" className="c-link">
                          Vibes
                        </a>
                        </span>
                      </li>
                    </ul>
                  </nav>
                </div>

                <div className="layout_item w-25">
                  <nav className="c-nav-tool">
                    <h4 className="c-nav-tool_title fw-bold mb-4">Support</h4>
                    <ul className="c-nav-tool_list">
                      <li className="c-nav-tool_item">
                      <span className="hover-underline">
                        <Link href="/pages/shipping-returns" className="c-link">
                          Shipping &amp; Returns
                        </Link>
                        </span>
                      </li>
                      <li className="c-nav-tool_item">
                      <span className="hover-underline">
                        <Link href="/FAQs" className="c-link">
                          Help &amp; FAQ
                        </Link>
                        </span>
                      </li>
                      <li className="c-nav-tool_item">
                      <span className="hover-underline">
                        <Link href="/policy" className="c-link">
                          Terms &amp; Conditions
                        </Link>
                        </span>
                      </li>
                      <li className="c-nav-tool_item">
                      <span className="hover-underline">
                        <Link href="/policy" className="c-link">
                          Privacy Policy
                        </Link>
                        </span>
                      </li>
                      <li className="c-nav-tool_item">
                      <span className="hover-underline">
                        <Link href="/contact-us" className="c-link">
                          Contact
                        </Link>
                        </span>
                      </li>
                      <li className="c-nav-tool_item">
                      <span className="hover-underline">
                        <Link href="/login" className="c-link">
                          Login
                        </Link>
                        </span>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              <div className="layout c-2 ml-32">
                <div className="layout_item w-50">
                  <ul className="flex">
                    <li>
                      <a href="https://www.facebook.com/Apneehatti-103048901780149">
                        <BsFacebook size={20} />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/apneehatti_official">
                        <BsInstagram size={20} />
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/ApneeHatti">
                        <BsTwitter size={20} />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/company/apneehatti">
                        <BsLinkedin size={20} />
                      </a>
                    </li>
                  </ul>
                </div>
                {/* <div className="layout_item w-25">
                  <ul className="flex">
                    <li>
                      <a href="#">
                        <BsFacebook size={32} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <BsTwitter size={32} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <BsInstagram size={32} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <BsLinkedin size={32} />
                      </a>
                    </li>
                  </ul>
                </div> */}
                <div className="scroll-to-top" onClick={handleScrollToTop}>
                  <FaArrowUp size={12} />
                </div>
                <style jsx>{`
        .scroll-to-top {
          position: fixed;
          bottom: 20px;
          right: 20px;
          cursor: pointer;
          background-color: #000; // Add background color if needed
          color: #fff; // Change icon color if needed
          padding: 10px; // Add padding if needed
          border-radius: 50%; // Make it round if needed
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); // Add shadow if needed
        }

        .scroll-to-top:hover {
          background-color: #333; // Change background color on hover
        }
      `}</style>
              </div>
            </div>
          </div>
          <div className="footer_copyright">
            <p>&copy; 2022 Apneehatti</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
