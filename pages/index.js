import Head from "next/head";
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

// {
//   "id": 137963979,
//   "sku": "1695042397112",
//   "hsn": "",
//   "name": "Chamba Chukh Red Chilli Chukh Garlic Flavour | Traditional Chamba Chukh with Garlic Flavour| ",
//   "description": "",
//   "category_code": "default",
//   "category_name": "Default Category",
//   "category_tax_code": "default",
//   "image": "",
//   "weight": "0.5 Kg",
//   "size": "",
//   "cost_price": "0.00",
//   "mrp": "163.00",
//   "tax_code": 0,
//   "low_stock": 0,
//   "ean": "",
//   "upc": "",
//   "isbn": "",
//   "created_at": "18 Sep 2023 06:37 PM",
//   "updated_at": "18 Sep 2023 06:37 PM",
//   "quantity": 1,
//   "color": "",
//   "brand": "",
//   "dimensions": "16 x 11 x 10 cm ",
//   "status": "INACTIVE",
//   "type": "Single"
// },

let socket;

export default function Home({ socket_URL }) {
  const [copiedTopDeals, setCopiedTopDeals] = useState([]);
  const dispatch = useDispatch();
  const newArrivalSlider = useRef();
  const topDealSlider = useRef();
  const trendingProductSlider = useRef();
  const bestSellerSlider = useRef();
  let { newArrival, topDeals, trendingProducts, bestSellers, loading } =
    useSelector((state) => state.products);



  var settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
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
    const fetchData = async () => {
      // Your data fetching logic here
      // For example, setting copiedTopDeals after fetching data
      const newCopiedTopDeals = [bestSellers[0], ...topDeals]; // Assuming topDeals and bestSellers are already defined
      setCopiedTopDeals(newCopiedTopDeals);

    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);





  return (
    <>
      <Head>
        <title>Apneehatti</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Jockey+One&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Jockey+One&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Jockey+One&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
          </Head >
          <div className="bg-grey;">
            <Herosection />
            <div className="bg-gray-100 hidden">
              <div className="grid grid-cols-2 w-11/12 gap-y-4 md:grid-cols-4 md:w-5/6 mx-auto py-12 gap-x-4">
                <div className="text-center shadow-md hover:shadow-xl transition-all duration-300  hover:bg-white p-5">
                  <MdAddBusiness className="text-4xl mb-1  mx-auto" />
                  <h1 className="font-medium">Support Local Business</h1>
                  <p className="text-sm text-gray-500">
                    We support the small business
                  </p>
                </div>
                <div className="text-center shadow-md hover:shadow-xl transition-all duration-300  hover:bg-white p-5">
                  <TbTruckDelivery className="text-4xl mb-1  mx-auto" />
                  <h1 className="font-medium">Pan India Delivery</h1>
                  <p className="text-sm text-gray-500">
                    We are delivering happiness all over india
                  </p>
                </div>
                <div className="text-center shadow-md hover:shadow-xl transition-all duration-300  hover:bg-white p-5">
                  <MdLocalFlorist className="text-4xl mb-1  mx-auto" />
                  <h1 className="font-medium">Eco Friendly Products</h1>
                  <p className="text-sm text-gray-500">
                    We deliver ecofriendly products
                  </p>
                </div>
                <div className="text-center shadow-md hover:shadow-xl transition-all duration-300  hover:bg-white p-5">
                  <AiFillSafetyCertificate className="text-4xl mb-1  mx-auto" />
                  <h1 className="font-medium">Quality Assurance</h1>
                  <p className="text-sm text-gray-500">
                    We provide genuine and quality product
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 m-2 p-2  my-4 ">
              <div className="">
                <img
                  src="/images/banner/offer-1.png"
                  width="100%"
                  alt=""
                />
              </div>
              <div className="">
                <img
                  src="/images/banner/offer-2.png"
                  width="100%"
                  alt=""

                />
              </div>
              <div className="hidden">
                <img
                  src="/pictures/banner/offer-3.png"

                  alt=""

                />
              </div>
            </div>

            <div className="">
              <div className="">
                <div className="py-4">
                  <h3 className="text-center text-2xl font-semibold uppercase mb-2 ">
                    Deals of the day
                  </h3>
                  <h3 className="text-center text-gray-500">
                    Upto 50% Off plus free shipping | Grab it Fast
                  </h3>
                </div>
              </div>
            </div>


            <div className="mx-4">
              <img
                src="/images/banner/banner4.png"
                width="100%"
                height="100%"
                className=" h-full object-cover"
                alt=""
                id="dis-img"
              />
            </div>


            <div className="">
              <div className="relative">
                <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute left-0 top-44 z-10 bg-gray-200 border-r-gray-300 border-t-gray-300 border-b-gray-300 text-gray-700 hover:text-black hover:shadow-2xl border shadow-lg h-44  ">
              <button
                onClick={() => {
                  newArrivalSlider.current.slickPrev();
                }}
              >
                <MdArrowBackIos className="text-3xl" />
              </button>
            </div>
                <div className="py-2 px-2 md:p-8 rounded bg-white mx-4 my-4">
                  <div className="flex justify-between items-center ">
                    <div className="py-4" style={{ width: "100%" }}>
                      <h3 className="text-center text-2xl font-semibold uppercase mb-2" style={{fontFamily: "Noto Sans"}}>
                        Latest new arrivals
                      </h3>

                      <h3 className="text-center text-gray-500">
                        We’re crushing on new arrivals + 30% off all full price!
                      </h3>

                    </div>
                    <div className="md:hidden w-20 flex justify-between items-center">
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
                      ref={(slider) => (newArrivalSlider.current = slider)}
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
                <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute right-0 top-44 z-10 bg-gray-200 border-l-gray-300 border-t-gray-300 border-b-gray-300 text-gray-700 hover:text-black hover:shadow-2xl border shadow-lg h-44  ">
               <button onClick={() => newArrivalSlider.current.slickNext()}>
                <MdArrowForwardIos className="text-3xl" />
              </button> 
             </div> 
              </div>

              <div className="relative">
                <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute left-0 top-44 z-10 bg-gray-200 border-r-gray-300 border-t-gray-300 border-b-gray-300 text-gray-700 hover:text-black hover:shadow-2xl border shadow-lg h-44  ">
                <button
                onClick={() => {
                  topDealSlider.current.slickPrev();
                }}
              >
                <MdArrowBackIos className="text-3xl" />
                </button>
                </div>
                <div className="py-2 px-2 md:p-8 rounded my-4 bg-white mx-4">
                  <div className="flex justify-between items-center ">
                    <div className="py-4" style={{ width: "100%" }}>
                      <h3 className="text-center text-2xl font-semibold uppercase mb-2">
                        TOP SELLING PRODUCTS
                      </h3>

                      <h3 className="text-center text-gray-500">
                        Grab It Fast | Sale Is Live
                      </h3>

                    </div>
                    <div className="md:hidden w-20 flex justify-between items-center">
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
                <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute right-0 top-44 z-10 bg-gray-200 border-l-gray-300 border-t-gray-300 border-b-gray-300 text-gray-700 hover:text-black hover:shadow-2xl border shadow-lg h-44  ">
              <button onClick={() => topDealSlider.current.slickNext()}>
                <MdArrowForwardIos className="text-3xl" />
              </button>
            </div>
              </div>

              <div className="relative">
                <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute left-0 top-44 z-10 bg-gray-200 border-r-gray-300 border-t-gray-300 border-b-gray-300 text-gray-700 hover:text-black hover:shadow-2xl border shadow-lg h-44  ">
              <button onClick={() => bestSellerSlider.current.slickPrev()}>
                <MdArrowBackIos className="text-3xl" />
              </button>
            </div>
                <div className="py-2 px-2 md:p-8 rounded bg-white mx-4 my-4 ">
                  <div className="flex justify-between items-center ">
                    <div className="py-4" style={{ width: "100%" }}>
                      <h3 className="text-center text-2xl font-semibold uppercase mb-2">
                        SUMMER SPECIALS
                      </h3>

                      <h3 className="text-center text-gray-500">
                        Grab It Fast | Sale Is Live
                      </h3>

                    </div>
                    <div className="md:hidden w-20 flex justify-between items-center">
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
                <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute right-0 top-44 z-10 bg-gray-200 border-l-gray-300 border-t-gray-300 border-b-gray-300 text-gray-700 hover:text-black hover:shadow-2xl border shadow-lg h-44  ">
              <button onClick={() => bestSellerSlider.current.slickNext()}>
                <MdArrowForwardIos className="text-3xl" />
              </button>
            </div>
              </div>

              <div className="relative">
                <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute left-0 top-44 z-10 bg-gray-200 border-r-gray-300 border-t-gray-300 border-b-gray-300 text-gray-700 hover:text-black hover:shadow-2xl border shadow-lg h-44  ">
              <button onClick={() => bestSellerSlider.current.slickPrev()}>
                <MdArrowBackIos className="text-3xl" />
              </button>
            </div>
                <div className="py-2 px-2 md:p-8 border bg-white rounded mx-4 my-4border  bg-white mx-4 my-4 ">
                  <div className="flex justify-between items-center ">
                    <div className="py-4" style={{ width: "100%" }}>
                      <h3 className="text-center text-2xl font-semibold uppercase mb-2">
                        Latest new arrivals
                      </h3>

                      <h3 className="text-center text-gray-500">
                        Grab It Fast | Sale Is Live
                      </h3>

                    </div>
                    <div className="md:hidden w-20 flex justify-between items-center">
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
                        : Array.from({ length: 5 }, (_, i) => i + 4).map((i) => (
                          <ProductSkeleton key={i} />
                        ))}
                    </Slider>
                  </div>
                </div>
                <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute right-0 top-44 z-10 bg-gray-200 border-l-gray-300 border-t-gray-300 border-b-gray-300 text-gray-700 hover:text-black hover:shadow-2xl border shadow-lg h-44  ">
              <button onClick={() => bestSellerSlider.current.slickNext()}>
                <MdArrowForwardIos className="text-3xl" />
              </button>
            </div>
              </div>
            </div>
          </div>
          <Benefits />
          <Testimonials />





        </>
        );
}
