import Head from "next/head";
import Image from 'next/image'
import { AiFillSafetyCertificate } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import {
  MdAddBusiness,
  MdArrowBackIos,
  MdArrowForwardIos,
  MdLocalFlorist,
} from "react-icons/md";
import {
  HiArrowCircleLeft,
  HiArrowCircleRight,
  HiArrowNarrowRight,
  HiArrowRight,
  HiArrowSmRight,
} from "react-icons/hi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedProducts } from "../slices/product";
import Script from "next/script";
import BannerandProduct from "../components/BannerandProduct";



const Herosection = dynamic(() => import("../components/herosection"), {
  ssr: false,
});
const Benefits = dynamic(() => import("../components/Benefits"), {
  ssr: false,
})
const Testimonials = dynamic(() => import("../components/Testimonials"), {
  ssr: false,
})
const Product = dynamic(() => import("../components/card"), { ssr: false });
const ProductSkeleton = dynamic(() => import("../components/cardSkeleton"), {
  ssr: false,
});


let socket;

export default function Home({ socket_URL }) {
  const [copiedTopDeals, setCopiedTopDeals] = useState([]);
  const dispatch = useDispatch();
  const newArrivalSlider = useRef();
  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [products3, setProducts3] = useState([]);
  const [products4, setProducts4] = useState([]);
  const [products5, setProducts5] = useState([]);


  const topDealSlider = useRef();
  const handloomsSlider = useRef();
  const skinCareandBeautySlider = useRef();
  const healthCareSlider = useRef();
  const handcraftsSlider = useRef();
  const organiSlider = useRef();



  const trendingProductSlider = useRef();
  const bestSellerSlider = useRef();
  let { newArrival, topDeals, trendingProducts, bestSellers, loading } =
    useSelector((state) => state.products);



  var settings = {
    arrows: false,
    dots: false,
    // pauseOnHover:true,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          // autoplay:true,
          // speed: 8000
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };



  useEffect(() => {
    dispatch(fetchFeaturedProducts());
    // newArrivalSlider.current.slickPlay();
    bestSellerSlider.current.slickPlay();
    handcraftsSlider.current.slickPlay();
    handloomsSlider.current.slickPlay();
    organiSlider.current.slickPlay();
    skinCareandBeautySlider.current.slickPlay();
    healthCareSlider.current.slickPlay();
    topDealSlider.current.slickPlay();

    // Call the fetchData function when the component mounts
  }, []);
  useEffect(() => {
    // Function to fetch JSON data
    async function fetchData() {
      try {
        let response = await fetch('/data/handlooms.json');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        let jsonData = await response.json();
        setProducts1(jsonData);
        response = await fetch('/data/skincare.json');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        jsonData = await response.json();
        setProducts2(jsonData);
        response = await fetch('/data/handcrafts.json');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        jsonData = await response.json();
        setProducts3(jsonData);
        response = await fetch('/data/organics.json');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        jsonData = await response.json();
        setProducts4(jsonData);
        response = await fetch('/data/healthcare.json');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        jsonData = await response.json();
        setProducts5(jsonData);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }

    // Call the function to fetch data
    fetchData();
  }, []);





  return (
    <>
      <Head>
        <title>Apneehatti</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />
        <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
      </Head >
      <div className="bg-grey;">
        <Herosection />
        <div className="grid grid-cols-2 gap-1 mx-4 py-0  mt-4 ">
          <div className="">
            <img
              src="/images/banner/image2.png"
              width="100%"
              alt=""
              loading="lazy"
              placeholder="blur"
              blurDataURL="/images/banner/image2.png"
            />
          </div>
          <div className="">
            <img
              src="/images/banner/image1.png"
              width="100%"
              alt=""
              loading="lazy"
              placeholder="blur"
              blurDataURL="/images/banner/image1.png"
            />
          </div>
        </div>


        <div className=" ">
          <div className="py-4">
            <h3 className="text-center text-2xl font-semibold uppercase  ">
              Deals of the day
            </h3>
            <h3 className="text-center text-gray-500 " style={{ fontSize: "14px" }}>
              Upto 50% Off plus free shipping | Grab it Fast
            </h3>
          </div>
        </div>
        <div>
          <BannerandProduct name="LATEST NEW ARRIVAL" slider={newArrivalSlider} products={newArrival} image="/images/banner/new.jpg" />
          <BannerandProduct name="TOP DEALS" slider={topDealSlider} products={topDeals} image="/images/banner/2.jpg" />
          <BannerandProduct name="SUMMER SPECIAL" slider={bestSellerSlider} products={topDeals} image="/images/banner/summer.jpg" />
          <BannerandProduct name="TOP SELLING PRODUCTS" slider={trendingProductSlider} products={topDeals} image="/images/banner/3.jpg" />
          <BannerandProduct name="HANDLOOMS" slider={handloomsSlider} products={products1} image="/images/banner/handlooms.jpg" />
          <BannerandProduct name="SKINCARE & BEAUTY" slider={skinCareandBeautySlider} products={products2} image="/images/banner/skincare.jpg" />
          <BannerandProduct name="HANDCRAFTS" slider={handcraftsSlider} products={products3} image="/images/banner/handcrafts.jpg" />
          <BannerandProduct name="ORGANIC FOOD PRODUCTS" slider={organiSlider} products={products4} image="/images/banner/organics.jpg" />
          <BannerandProduct name="HEALTH CARE" slider={healthCareSlider} products={products5} image="/images/banner/healthcare.jpg" />
        </div>
      </div>
      <Benefits />
      <Testimonials />
    </>
  );
}
