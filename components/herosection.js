"use client";
import Image from "next/image";
import { Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { HiArrowCircleLeft } from "react-icons/hi";

function Herosection() {
  const [mediaSize, setMediaSize] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.matchMedia("(max-width: 480px)").matches;
      const isTablet = window.matchMedia("(max-width: 768px)").matches;

      if (isMobile) {
        setMediaSize("mobile");
      } else if (isTablet) {
        setMediaSize("tablet");
      } else {
        setMediaSize("desktop");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="image-container h-44 sm:h-64 xl:h-[380px] 2xl:h-96">
        <Carousel showThumbs={false}
          // leftControl={
            // <div className=" sm:hidden md:flex p-1 cursor-pointer  justify-center items-center absolute left-0 top-20 md:bg-gray-200 md:border-r-gray-300 md:border-t-gray-300 md:border-b-gray-300 text-gray-700 hover:text-black hover:shadow-2xl md:border md:shadow-lg h-44  ">
            //   <button>
            //     <MdArrowBackIos className="text-2xl" />
            //   </button>
            // </div>
          // }
          // rightControl={
            // <div className=" sm:hidden md:flex p-1 cursor-pointer  justify-center items-center absolute right-0 top-20 md:bg-gray-200 md:border-l-gray-300 md:border-t-gray-300 md:border-b-gray-300 text-gray-700 hover:text-black hover:shadow-2xl md:border md:shadow-lg h-44  ">
            //   <button>
            //     <MdArrowForwardIos className="text-2xl" />
            //   </button>
            // </div>
          // }
        >
          <div className="relative w-screen h-full">
            {mediaSize == "mobile" ? (
              <Image
                src="/images/banner/MobileBanner-1.png"
                alt="banner"
                priority
                layout="fill"
                placeholder="blur"
                blurDataURL={"/images/banner/MobileBanner-1.png"}
                objectFit="contain"
              />
            ) : (
              <Image
                src="/images/banner/banner-9.jpg"
                alt="banner"
                priority
                layout="fill"
                placeholder="blur"
                blurDataURL={"/images/banner/banner-9.jpg"}
                objectFit="contain"
              />
            )}
          </div>
          <div className="relative w-screen h-full">
            {mediaSize == "mobile" ? (
              <Image
                src="/images/banner/banner2M.webp"
                alt="banner"
                layout="fill"
                objectFit="contain"
                loading="lazy"
                placeholder="blur"
                blurDataURL={"/images/banner/banner2M.webp"}
              />
            ) : (
              <Image
                src="/images/banner/banner1.jpeg"
                alt="banner"
                layout="fill"
                loading="lazy"
                placeholder="blur"
                blurDataURL={"/images/banner/banner2D.webp"}
                objectFit="contain"
              />
            )}
          </div>
        </Carousel>
      </div>
    </>
  );
}

export default Herosection;
