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

export default function Home({ socket_URL}) {
  const [copiedTopDeals, setCopiedTopDeals] = useState([]);
  const dispatch = useDispatch();
  const newArrivalSlider = useRef();
  const [products1, setProducts1] = useState( []);
  const [products2, setProducts2] = useState( []);
  const [products3, setProducts3] = useState([]);
  const [products4, setProducts4] = useState( []);
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
    newArrivalSlider.current.slickPlay();
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


        <div className="grid grid-cols-2 gap-1 mx-4 mx-2 py-0  mt-4 ">
          <div className="">
            <img
              src="/images/banner/offer-2.png"
              width="100%"
              alt=""
              loading="lazy"
              placeholder="blur"
              blurDataURL="/images/banner/offer-2.png"
            />
          </div>
          <div className="">
            <img
              src="/images/banner/offer-1.png"
              width="100%"
              alt=""
              loading="lazy"
              placeholder="blur"
              blurDataURL="/images/banner/offer-1.png"

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




        <div className="w-full ">
            <Image
              src="/images/banner/new.jpg"
              layout="responsive"
              width={1840} // Use the actual width of your image
              height={400} // Use the actual height of your image
              alt="New banner"
              loading="lazy"
              blurDataURL="/images/banner/new.jpg"
              placeholder="blur"
            />
          </div>


        <div className="">
          <div className="relative ">
            {/* <div className=" hidden md:flex  cursor-pointer  justify-center items-center  absolute left-0 top-44 z-10 h-44  ">
              <button
                onClick={() => {
                  newArrivalSlider.current.slickPrev();
                }}
              >
                <MdArrowBackIos className=" text-2xl " />
              </button>
            </div> */}
            <div className="py-2 px-2 md:p-8 rounded bg-white mx-sm-4 my-sm-4">
              <div className="flex justify-between items-center ">
                <div className="py-4" style={{ width: "100%" }}>
                  <h3 className="text-center text-2xl font-semibold uppercase mb-2" >
                    Latest new arrivals
                  </h3>

                  <h3 className="text-center text-gray-500" style={{ fontSize: "14px" }}>
                    We’re crushing on new arrivals + 30% off all full price!
                  </h3>

                </div>
                <div className="md:hidden d-none w-20 flex justify-between items-center border border-danger">
                  <button onClick={() => newArrivalSlider.current.slickPrev()}>
                    <HiArrowCircleLeft className="text-3xl" />
                  </button>
                  <button onClick={() => newArrivalSlider.current.slickNext()}>
                    <HiArrowCircleRight className="text-3xl" />
                  </button>
                </div>
              </div>
              <div className="w-10/12 md:w-full  mx-auto ">
                <Slider
                  ref={newArrivalSlider}
                  {...settings}
                >
                  {!loading && newArrival.length > 0
                    ? newArrival.map((item) => (
                      <Product
                        key={item._id}
                        product={{
                          id: item._id,
                          title: item.name,
                          price: item.price,
                          MRP: item.MRP,
                          category: item.category_id.name,
                          image: item.images[0],
                          alt_text: item.alt_text,
                        }}
                      />
                    ))
                    : Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
                      <ProductSkeleton key={i} />
                    ))}
                </Slider>
              </div>
            </div>
            {/* <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute right-0 top-44 z-10  h-44  ">
              <button onClick={() => newArrivalSlider.current.slickNext()}>
                <MdArrowForwardIos className="text-2xl" />
              </button>
            </div> */}
          </div>

          


          <div className="w-full ">
            <Image
              src="/images/banner/3.jpg"
              layout="responsive"
              width={1840} // Use the actual width of your image
              height={400} // Use the actual height of your image
              alt=" banner"
              loading="lazy"
              blurDataURL="/images/banner/3.jpg"
              placeholder="blur"
            />
          </div>

          <div className="relative">
            {/* <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute left-0 top-44 z-10  h-44  ">
              <button
                onClick={() => {
                  topDealSlider.current.slickPrev();
                }}
              >
                <MdArrowBackIos className="text-2xl" />
              </button>
            </div> */}
            <div className="py-2 px-2 md:p-8 rounded my-sm-4 bg-white  mx-sm-4 ">
              <div className="flex justify-between items-center ">
                <div className="py-4" style={{ width: "100%" }}>
                  <h3 className="text-center text-2xl font-semibold uppercase mb-2">
                    TOP DEALS
                  </h3>

                  <h3 className="text-center text-gray-500" style={{ fontSize: "14px" }}>
                    Grab It Fast | Sale Is Live
                  </h3>

                </div>
                <div className="md:hidden d-none w-20 flex justify-between items-center">
                  <button onClick={() => topDealSlider.current.slickPrev()}>
                    <HiArrowCircleLeft className="text-3xl" />
                  </button>

                  <button onClick={() => topDealSlider.current.slickNext()}>
                    <HiArrowCircleRight className="text-3xl" />
                  </button>
                </div>
              </div>

              <div className="w-10/12 md:w-full  mx-auto" >
                <Slider
                  ref={(slider) => (topDealSlider.current = slider)}
                  {...settings}
                >
                  {!loading && topDeals.length > 0
                    ? [...topDeals, ...topDeals].map((item) => (
                      <Product
                        key={item._id}
                        product={{
                          id: item._id,
                          title: item.name,
                          price: item.price,
                          MRP: item.MRP,
                          category: item.category_id.name,
                          image: item.images[0],
                          alt_text: item.alt_text,
                        }}
                      />
                    ))
                    : Array.from({ length: 5 }, (_, i) => i + 2).map((i) => (
                      <ProductSkeleton key={i} />
                    ))}

                </Slider>
              </div>
            </div>
            {/* <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute right-0 top-44 z-10  h-44  ">
              <button onClick={() => topDealSlider.current.slickNext()}>
                <MdArrowForwardIos className="text-2xl" />
              </button>
            </div> */}
          </div>


          


          <div className="w-full ">
            <Image
              src="/images/banner/summer.jpg"
              layout="responsive"
              width={1840} // Use the actual width of your image
              height={400} // Use the actual height of your image
              alt="Summer banner"
              loading="lazy"
              blurDataURL="/images/banner/summer.jpg"
              placeholder="blur"
            />
          </div>

          <div className="relative">
            {/* <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute left-0 top-44 z-10  h-44  ">
              <button onClick={() => bestSellerSlider.current.slickPrev()}>
                <MdArrowBackIos className="text-2xl" />
              </button>
            </div> */}
            <div className="py-2 px-2 md:p-8 rounded bg-white  mx-sm-4  my-sm-4 ">
              <div className="flex justify-between items-center ">
                <div className="py-4" style={{ width: "100%" }}>
                  <h3 className="text-center text-2xl font-semibold uppercase mb-2">
                    SUMMER SPECIALS
                  </h3>

                  <h3 className="text-center text-gray-500" style={{ fontSize: "14px" }}>
                    Grab It Fast | Sale Is Live
                  </h3>

                </div>
                <div className="md:hidden d-none w-20 flex justify-between items-center">
                  <button onClick={() => bestSellerSlider.current.slickPrev()}>
                    <HiArrowCircleLeft className="text-3xl" />
                  </button>

                  <button onClick={() => bestSellerSlider.current.slickNext()}>
                    <HiArrowCircleRight className="text-3xl" />
                  </button>
                </div>
              </div>
              <div className="w-10/12 md:w-full  mx-auto">
                <Slider
                  ref={(slider) => (bestSellerSlider.current = slider)}
                  {...settings}
                >
                  {!loading && bestSellers.length > 0
                    ? bestSellers.map((item) => (
                      <Product
                        key={item._id}
                        product={{
                          id: item._id,
                          title: item.name,
                          price: item.price,
                          MRP: item.MRP,
                          category: item.category_id.name,
                          image: item.images[0],
                          alt_text: item.alt_text,
                        }}
                      />
                    ))
                    : Array.from({ length: 5 }, (_, i) => i + 3).map((i) => (
                      <ProductSkeleton key={i} />
                    ))}
                </Slider>
              </div>
            </div>
            {/* <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute right-0 top-44 z-10  h-44  ">
              <button onClick={() => bestSellerSlider.current.slickNext()}>
                <MdArrowForwardIos className="text-2xl" />
              </button>
            </div> */}
          </div>

          <div className="relative">
            {/* <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute left-0 top-44 z-10  h-44  ">
              <button onClick={() => bestSellerSlider.current.slickPrev()}>
                <MdArrowBackIos className="text-2xl" />
              </button>
            </div> */}
            <div className="py-2 px-2 md:p-8 rounded bg-white  mx-sm-4  my-sm-4 ">
              <div className="flex justify-between items-center ">
                <div className="py-4" style={{ width: "100%" }}>
                  <h3 className="text-center text-2xl font-semibold uppercase mb-2">
                    TOP SELLING PRODUCTS
                  </h3>

                  <h3 className="text-center text-gray-500" style={{ fontSize: "14px" }}>
                    Grab It Fast | Sale Is Live
                  </h3>

                </div>
                <div className="md:hidden d-none w-20 flex justify-between items-center">
                  <button onClick={() => trendingProductSlider.current.slickPrev()}>
                    <HiArrowCircleLeft className="text-3xl" />
                  </button>

                  <button onClick={() => trendingProductSlider.current.slickNext()}>
                    <HiArrowCircleRight className="text-3xl" />
                  </button>
                </div>
              </div>
              <div className="w-10/12 md:w-full  mx-auto">
                <Slider
                  ref={(slider) => (trendingProductSlider.current = slider)}
                  {...settings}
                >
                  {!loading && trendingProducts.length > 0
                    ? trendingProducts.map((item) => (
                      <Product
                        key={item._id}
                        product={{
                          id: item._id,
                          title: item.name,
                          price: item.price,
                          MRP: item.MRP,
                          category: item.category_id.name,
                          image: item.images[0],
                          alt_text: item.alt_text,
                        }}
                      />
                    ))
                    : Array.from({ length: 5 }, (_, i) => i + 3).map((i) => (
                      <ProductSkeleton key={i} />
                    ))}
                </Slider>
              </div>
            </div> 
            </div>




          <div className="w-full ">
            <Image
              src="/images/banner/handlooms.jpg"
              layout="responsive"
              width={1840} // Use the actual width of your image
              height={400} // Use the actual height of your image
              alt="Handlooms banner"
              loading="lazy"
              blurDataURL="/images/banner/handlooms.jpg"
              placeholder="blur"
            />
          </div>

          <div className="relative">
            {/* <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute left-0 top-44 z-10  h-44  ">
              <button onClick={() => handloomsSlider.current.slickPrev()}>
                <MdArrowBackIos className="text-2xl" />
              </button>
            </div> */}
            <div className="py-2 px-2 md:p-8 rounded bg-white  mx-sm-4  my-sm-4 ">
              <div className="flex justify-between items-center ">
                <div className="py-4" style={{ width: "100%" }}>
                  <h3 className="text-center text-2xl font-semibold uppercase mb-2">
                    Handlooms
                  </h3>

                  <h3 className="text-center text-gray-500" style={{ fontSize: "14px" }}>
                    Grab It Fast | Sale Is Live
                  </h3>

                </div>
                <div className="md:hidden d-none w-20 flex justify-between items-center">
                  <button onClick={() => handloomsSlider.current.slickPrev()}>
                    <HiArrowCircleLeft className="text-3xl" />
                  </button>

                  <button onClick={() => bestSellerSlider.current.slickNext()}>
                    <HiArrowCircleRight className="text-3xl" />
                  </button>
                </div>
              </div>
              <div className="w-10/12 md:w-full  mx-auto">
                <Slider
                  ref={(slider) => (handloomsSlider.current = slider)}
                  {...settings}
                >
                  {!loading && products1.length > 0
                    ? products1.map((item) => (
                      <Product
                        key={item._id}
                        product={{
                          id: item._id,
                          title: item.name,
                          price: item.price,
                          MRP: item.MRP,
                          category: item.category_id.name,
                          image: item.images[0],
                          alt_text: item.alt_text,
                        }}
                      />
                    ))
                    : Array.from({ length: 5 }, (_, i) => i + 3).map((i) => (
                      <ProductSkeleton key={i} />
                    ))}
                </Slider>
              </div>
            </div>
            {/* <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute right-0 top-44 z-10  h-44  ">
              <button onClick={() => handloomsSlider.current.slickNext()}>
                <MdArrowForwardIos className="text-2xl" />
              </button>
            </div> */}
          </div>




          <div className="w-full ">
            <Image
              src="/images/banner/skincare.jpg"
              layout="responsive"
              width={1840} // Use the actual width of your image
              height={400} // Use the actual height of your image
              alt="Skincare banner"
              loading="lazy"
              blurDataURL="/images/banner/skincare.jpg"
              placeholder="blur"
            />
          </div>



          <div className="relative">
            {/* <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute left-0 top-44 z-10  h-44  ">
              <button onClick={() => skinCareandBeautySlider.current.slickPrev()}>
                <MdArrowBackIos className="text-2xl" />
              </button>
            </div> */}
            <div className="py-2 px-2 md:p-8 rounded bg-white  mx-sm-4  my-sm-4 ">
              <div className="flex justify-between items-center ">
                <div className="py-4" style={{ width: "100%" }}>
                  <h3 className="text-center text-2xl font-semibold uppercase mb-2">
                    sKINCARE & BEAUTY
                  </h3>

                  <h3 className="text-center text-gray-500" style={{ fontSize: "14px" }}>
                    Grab It Fast | Sale Is Live
                  </h3>

                </div>
                <div className="md:hidden d-none w-20 flex justify-between items-center">
                  <button onClick={() => skinCareandBeautySlider.current.slickPrev()}>
                    <HiArrowCircleLeft className="text-3xl" />
                  </button>

                  <button onClick={() => skinCareandBeautySlider.current.slickNext()}>
                    <HiArrowCircleRight className="text-3xl" />
                  </button>
                </div>
              </div>
              <div className="w-10/12 md:w-full  mx-auto">
                <Slider
                  ref={(slider) => (skinCareandBeautySlider.current = slider)}
                  {...settings}
                >
                  {!loading && products2.length > 0
                    ? products2.map((item) => (
                      <Product
                        key={item._id}
                        product={{
                          id: item._id,
                          title: item.name,
                          price: item.price,
                          MRP: item.MRP,
                          category: item.category_id.name,
                          image: item.images[0],
                          alt_text: item.alt_text,
                        }}
                      />
                    ))
                    : Array.from({ length: 5 }, (_, i) => i + 3).map((i) => (
                      <ProductSkeleton key={i} />
                    ))}
                </Slider>
              </div>
            </div>
            {/* <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute right-0 top-44 z-10  h-44  ">
              <button onClick={() => skinCareandBeautySlider.current.slickNext()}>
                <MdArrowForwardIos className="text-2xl" />
              </button>
            </div> */}
          </div>





          <div className="w-full ">
            <Image
              src="/images/banner/handcrafts.jpg"
              layout="responsive"
              width={1840} // Use the actual width of your image
              height={400} // Use the actual height of your image
              alt="Handcrafts banner"
              loading="lazy"
              blurDataURL="/images/banner/handcrafts.jpg"
              placeholder="blur"
            />
          </div>



          <div className="relative">
            {/* <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute left-0 top-44 z-10  h-44  ">
              <button onClick={() => handcraftsSlider.current.slickPrev()}>
                <MdArrowBackIos className="text-2xl" />
              </button>
            </div> */}
            <div className="py-2 px-2 md:p-8 rounded bg-white  mx-sm-4  my-sm-4 ">
              <div className="flex justify-between items-center ">
                <div className="py-4" style={{ width: "100%" }}>
                  <h3 className="text-center text-2xl font-semibold uppercase mb-2">
                    Handcrafts
                  </h3>

                  <h3 className="text-center text-gray-500" style={{ fontSize: "14px" }}>
                    Grab It Fast | Sale Is Live
                  </h3>

                </div>
                <div className="md:hidden d-none w-20 flex justify-between items-center">
                  <button onClick={() => handcraftsSlider.current.slickPrev()}>
                    <HiArrowCircleLeft className="text-3xl" />
                  </button>

                  <button onClick={() => handcraftsSlider.current.slickNext()}>
                    <HiArrowCircleRight className="text-3xl" />
                  </button>
                </div>
              </div>
              <div className="w-10/12 md:w-full  mx-auto">
                <Slider
                  ref={(slider) => (handcraftsSlider.current = slider)}
                  {...settings}
                >
                  {!loading && products3.length > 0
                    ? products3.map((item) => (
                      <Product
                        key={item._id}
                        product={{
                          id: item._id,
                          title: item.name,
                          price: item.price,
                          MRP: item.MRP,
                          category: item.category_id.name,
                          image: item.images[0],
                          alt_text: item.alt_text,
                        }}
                      />
                    ))
                    : Array.from({ length: 5 }, (_, i) => i + 3).map((i) => (
                      <ProductSkeleton key={i} />
                    ))}
                </Slider>
              </div>
            </div>
            {/* <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute right-0 top-44 z-10  h-44  ">
              <button onClick={() => handcraftsSlider.current.slickNext()}>
                <MdArrowForwardIos className="text-2xl" />
              </button>
            </div> */}
          </div>





          <div className="w-full ">
            <Image
              src="/images/banner/organics.jpg"
              layout="responsive"
              width={1840} // Use the actual width of your image
              height={400} // Use the actual height of your image
              alt="Organics banner"
              loading="lazy"
              blurDataURL="/images/banner/organics.jpg"
              placeholder="blur"
            />
          </div>



          <div className="relative">
            {/* <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute left-0 top-44 z-10  h-44  ">
              <button onClick={() => organiSlider.current.slickPrev()}>
                <MdArrowBackIos className="text-2xl" />
              </button>
            </div> */}
            <div className="py-2 px-2 md:p-8 rounded bg-white  mx-sm-4  my-sm-4 ">
              <div className="flex justify-between items-center ">
                <div className="py-4" style={{ width: "100%" }}>
                  <h3 className="text-center text-2xl font-semibold uppercase mb-2">
                    Organic fOOD PRODUCTS
                  </h3>

                  <h3 className="text-center text-gray-500" style={{ fontSize: "14px" }}>
                    Grab It Fast | Sale Is Live
                  </h3>

                </div>
                <div className="md:hidden d-none w-20 flex justify-between items-center">
                  <button onClick={() => organiSlider.current.slickPrev()}>
                    <HiArrowCircleLeft className="text-3xl" />
                  </button>

                  <button onClick={() => organiSlider.current.slickNext()}>
                    <HiArrowCircleRight className="text-3xl" />
                  </button>
                </div>
              </div>
              <div className="w-10/12 md:w-full  mx-auto">
                <Slider
                  ref={(slider) => (organiSlider.current = slider)}
                  {...settings}
                >
                  {!loading && products4.length > 0
                    ? products4.map((item) => (
                      <Product
                        key={item._id}
                        product={{
                          id: item._id,
                          title: item.name,
                          price: item.price,
                          MRP: item.MRP,
                          category: item.category_id.name,
                          image: item.images[0],
                          alt_text: item.alt_text,
                        }}
                      />
                    ))
                    : Array.from({ length: 5 }, (_, i) => i + 3).map((i) => (
                      <ProductSkeleton key={i} />
                    ))}
                </Slider>
              </div>
            </div>
            {/* <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute right-0 top-44 z-10  h-44  ">
              <button onClick={() => organiSlider.current.slickNext()}>
                <MdArrowForwardIos className="text-2xl" />
              </button>
            </div> */}
          </div>



          <div className="w-full ">
            <Image
              src="/images/banner/healthcare.jpg"
              layout="responsive"
              width={1840} // Use the actual width of your image
              height={400} // Use the actual height of your image
              alt="Healthcare banner"
              loading="lazy"
              blurDataURL="/images/banner/healthcare.jpg"
              placeholder="blur"
            />
          </div>


          <div className="relative">
            {/* <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute left-0 top-44 z-10  h-44  ">
              <button onClick={() => healthCareSlider.current.slickPrev()}>
                <MdArrowBackIos className="text-2xl" />
              </button>
            </div> */}
            <div className="py-2 px-2 md:p-8 rounded bg-white  mx-sm-4  my-sm-4 ">
              <div className="flex justify-between items-center ">
                <div className="py-4" style={{ width: "100%" }}>
                  <h3 className="text-center text-2xl font-semibold uppercase mb-2">
                    Health CARE
                  </h3>

                  <h3 className="text-center text-gray-500" style={{ fontSize: "14px" }}>
                    Grab It Fast | Sale Is Live
                  </h3>

                </div>
                <div className="md:hidden d-none w-20 flex justify-between items-center">
                  <button onClick={() => healthCareSlider.current.slickPrev()}>
                    <HiArrowCircleLeft className="text-3xl" />
                  </button>

                  <button onClick={() => healthCareSlider.current.slickNext()}>
                    <HiArrowCircleRight className="text-3xl" />
                  </button>
                </div>
              </div>
              <div className="w-10/12 md:w-full  mx-auto">
                <Slider
                  ref={(slider) => (healthCareSlider.current = slider)}
                  {...settings}
                >
                  {!loading && products5.length > 0
                    ? products5.map((item) => (
                      <Product
                        key={item._id}
                        product={{
                          id: item._id,
                          title: item.name,
                          price: item.price,
                          MRP: item.MRP,
                          category: item.category_id.name,
                          image: item.images[0],
                          alt_text: item.alt_text,
                        }}
                      />
                    ))
                    : Array.from({ length: 5 }, (_, i) => i + 3).map((i) => (
                      <ProductSkeleton key={i} />
                    ))}
                </Slider>
              </div>
            </div>
            {/* <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute right-0 top-44 z-10  h-44  ">
              <button onClick={() => healthCareSlider.current.slickNext()}>
                <MdArrowForwardIos className="text-2xl" />
              </button>
            </div> */}
          </div>



        </div>
      </div>
      <Benefits />
      <Testimonials />





    </>
  );
}
