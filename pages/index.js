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


export async function getServerSideProps() {



  let category = "Handlooms";

  let q = null;

  let apiEndpoints = {
    all: "/api/products/list",
    category: category ? `/api/products/category/${category}` : null,
    name: q ? `/api/products/name/${encodeURIComponent(q.trim())}` : null,
  };

  let endpoint =
    apiEndpoints[
    category && category != "all" ? "category" : q ? "name" : "all"
    ];
  let url = process.env.HOST + endpoint;
  let dataPromises = endpoint
    ? [fetch(url).then((res) => (res.status == 200 ? res.json() : []))]
    : [];
  let [res] = await Promise.all(dataPromises);


  let filteredRes1 =
    res?.filter((item) => item?.category_id?.active && item?.active) || [];

  category = "Skincare-and-Beauty";
  q = null;

  apiEndpoints = {
    all: "/api/products/list",
    category: category ? `/api/products/category/${category}` : null,
    name: q ? `/api/products/name/${encodeURIComponent(q.trim())}` : null,
  };

  endpoint =
    apiEndpoints[
    category && category != "all" ? "category" : q ? "name" : "all"
    ];
  url = process.env.HOST + endpoint;
  dataPromises = endpoint
    ? [fetch(url).then((res) => (res.status == 200 ? res.json() : []))]
    : [];
  [res] = await Promise.all(dataPromises);


  let filteredRes2 =
    res?.filter((item) => item?.category_id?.active && item?.active) || [];
  category = "Handcrafts";
  q = null;

  apiEndpoints = {
    all: "/api/products/list",
    category: category ? `/api/products/category/${category}` : null,
    name: q ? `/api/products/name/${encodeURIComponent(q.trim())}` : null,
  };

  endpoint =
    apiEndpoints[
    category && category != "all" ? "category" : q ? "name" : "all"
    ];
  url = process.env.HOST + endpoint;
  dataPromises = endpoint
    ? [fetch(url).then((res) => (res.status == 200 ? res.json() : []))]
    : [];
  [res] = await Promise.all(dataPromises);


  let filteredRes3 =
    res?.filter((item) => item?.category_id?.active && item?.active) || [];

  category = "Organic-Food-Products";
  q = null;

  apiEndpoints = {
    all: "/api/products/list",
    category: category ? `/api/products/category/${category}` : null,
    name: q ? `/api/products/name/${encodeURIComponent(q.trim())}` : null,
  };

  endpoint =
    apiEndpoints[
    category && category != "all" ? "category" : q ? "name" : "all"
    ];
  url = process.env.HOST + endpoint;
  dataPromises = endpoint
    ? [fetch(url).then((res) => (res.status == 200 ? res.json() : []))]
    : [];
  [res] = await Promise.all(dataPromises);


  let filteredRes4 =
    res?.filter((item) => item?.category_id?.active && item?.active) || [];

  category = "Health-Care";
  q = null;

  apiEndpoints = {
    all: "/api/products/list",
    category: category ? `/api/products/category/${category}` : null,
    name: q ? `/api/products/name/${encodeURIComponent(q.trim())}` : null,
  };

  endpoint =
    apiEndpoints[
    category && category != "all" ? "category" : q ? "name" : "all"
    ];
  url = process.env.HOST + endpoint;
  dataPromises = endpoint
    ? [fetch(url).then((res) => (res.status == 200 ? res.json() : []))]
    : [];
  [res] = await Promise.all(dataPromises);


  let filteredRes5 =
    res?.filter((item) => item?.category_id?.active && item?.active) || [];
  return {
    props: {
      pro_category: category || null,
      prod1: filteredRes1,
      prod2: filteredRes2,
      prod3: filteredRes3,
      prod4: filteredRes4,
      prod5: filteredRes5,
      query: q || null,
    },
  };
}
let socket;

export default function Home({ socket_URL, prod1, prod2, prod3, prod4, prod5 }) {
  const [copiedTopDeals, setCopiedTopDeals] = useState([]);
  const dispatch = useDispatch();
  const newArrivalSlider = useRef();
  const [products1, setProducts1] = useState(prod1 || []);
  const [products2, setProducts2] = useState(prod2 || []);
  const [products3, setProducts3] = useState(prod3 || []);
  const [products4, setProducts4] = useState(prod4 || []);
  const [products5, setProducts5] = useState(prod5 || []);


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





  return (
    <>
      <Head>
        <title>Apneehatti</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />
        <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />

        <link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/bs-brain@2.0.4/components/contacts/contact-3/assets/css/contact-3.css" />
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
        <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/owl.carousel.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Jockey+One&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Jockey+One&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Jockey+One&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
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
                    Latest new arrivalss
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
                    TOP SELLING PRODUCTS
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

          {/* <div className="relative">
                <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute left-0 top-44 z-10  h-44  ">
              <button onClick={() => newArrivalSlider.current.slickPrev()}>
                <MdArrowBackIos className="text-2xl" />
              </button>
            </div>
                <div className="py-2 px-2 md:p-8 border bg-white rounded mx-4 my-4border  bg-white mx-4 my-4 ">
                  <div className="flex justify-between items-center ">
                    <div className="py-4" style={{ width: "100%" }}>
                      <h3 className="text-center text-2xl font-semibold uppercase mb-2">
                        Handpicks for You
                      </h3>

                      <h3 className="text-center text-gray-500">
                        Grab It Fast | Sale Is Live
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
                  <div className="w-10/12 md:w-full  mx-auto">
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
                        : Array.from({ length: 5 }, (_, i) => i + 4).map((i) => (
                          <ProductSkeleton key={i} />
                        ))}
                    </Slider>
                  </div>
                </div>
                <div className=" hidden md:flex p-2 cursor-pointer  justify-center items-center  absolute right-0 top-44 z-10  h-44  ">
              <button onClick={() => newArrivalSlider.current.slickNext()}>
                <MdArrowForwardIos className="text-2xl" />
              </button>
            </div>
              </div> */}




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
