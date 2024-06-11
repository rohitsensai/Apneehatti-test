"use server";

import { Breadcrumb, Rating } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormatter from "../../helper/currencyFormatter";
import { initialCart } from "../../slices/cart";
import { HiHome } from "react-icons/hi";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { MdRestore } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import calculateDiscount from "../../helper/calculateDiscount";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Typography, Box, Stack } from '@mui/material';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';


const ProductReview = dynamic(() => import("../../components/productReview"), {
  ssr: false,
});
const RelatedProduct = dynamic(
  () => import("../../components/relatedProduct"),
  {
    ssr: false,
  }
);
const SocialShare = dynamic(() => import("../../components/socialShare"), {
  ssr: false,
});
const TextEditorView = dynamic(
  () => import("../../components/textEditorView"),
  {
    ssr: false,
  }
);

export async function getServerSideProps({ query }) {
  const { pid: product_id } = query;
  const data = await fetch(`${process.env.HOST}/api/products/${product_id}`);
  const res = await data.json();

  console.log("res", res)



  const [relatedProducts, pro_review] = await Promise.all([
    fetch(
      `${process.env.HOST}/api/products/category/${res.category_id.slug}`
    ).then((res) => res.json()),
    fetch(`${process.env.HOST}/api/review/byProduct/${res._id}`).then((res) =>
      res.json()
    ),
  ]);

  return {
    props: {
      category: res.category_id.slug,
      product_data: res,
      relatedProducts: relatedProducts ? relatedProducts.slice(0, 10) : [],
      pro_review: pro_review.message ? [] : pro_review,
      host: process.env.HOST,
    },
  };
}

const ProductDetail = ({
  product_data,
  relatedProducts,
  pro_review,
  category,
  host,
}) => {
  const dispatch = useDispatch();
  const [mainImg, setMainImg] = useState(
    product_data && product_data.images[0]
  );
  const [zoomIn, setZoomIn] = useState(false);
  const [reviews, setReviews] = useState(pro_review || []);
  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewEditModalOpen, setReviewEditModalOpen] = useState(false);

  const [starRating, setStarRating] = useState(0);
  const { data: session, status } = useSession();
  const [relatedVideos, setRelatedVideos] = useState([]);

  const router = useRouter();

  const { cartItems } = useSelector((state) => state.cart);

  const imageMagnify = (e) => {
    const img = document.getElementById("bigImg");
    const result = document.getElementById("zoomable_container");
    /*create lens:*/
    const lens = document.getElementById("lens");
    /*insert lens:*/
    img.parentElement.insertBefore(lens, img);
    /*calculate the ratio between result DIV and lens:*/
    const cx = result.offsetWidth / lens.offsetWidth / 2;
    const cy = result.offsetHeight / lens.offsetHeight / 2;
    /*set background properties for the result DIV:*/
    result.style.backgroundImage = `url('${mainImg}')`;
    result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    const moveLens = (e) => {
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      const pos = getCursorPos(e);
      /*calculate the position of the lens:*/
      let x = pos.x - lens.offsetWidth / 2;
      let y = pos.y - lens.offsetHeight / 2;
      /*prevent the lens from being positioned outside the image:*/
      x = Math.max(Math.min(x, img.width - lens.offsetWidth), 0);
      y = Math.max(Math.min(y, img.height - lens.offsetHeight), 0);
      /*set the position of the lens:*/
      lens.style.left = `${x}px`;
      lens.style.top = `${y}px`;
      /*display what the lens "sees":*/
      result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    };
    /*and also for touch screens:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);

    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    const getCursorPos = (e) => {
      let x = 0;
      let y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      const a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left - window.pageXOffset;
      y = e.pageY - a.top - window.pageYOffset;
      return { x: x, y: y };
    };
  };

  const imageMagnifyOut = (e) => {
    setZoomIn(!zoomIn);
  };

  const createReview = async (e) => {
    e.preventDefault();
    setReviewModalOpen(!reviewModalOpen);
    const reviewFormData = new FormData(e.target);
    reviewFormData.append("rating", starRating);
    const review_form_data = Object.fromEntries(reviewFormData);
    const data = await fetch(`/api/review/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session && session.user.accessToken}`,
      },
      body: JSON.stringify(review_form_data),
    });
    const res = await data.json();
    if (res.message) {
      toast.error(res.message);
    } else {
      setReviews(res);
    }
  };

  const editReview = async (e) => {
    e.preventDefault();
    setReviewEditModalOpen(!reviewEditModalOpen);
    const reviewEditFormData = new FormData(e.target);
    reviewEditFormData.append("rating", starRating);
    const review_edit_form_data = Object.fromEntries(reviewEditFormData);

    const data = await fetch(`/api/review/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session && session.user.accessToken}`,
      },
      body: JSON.stringify(review_edit_form_data),
    });
    const res = await data.json();
    setReviews(res);
  };

  const reviewLike = async (id, like, product_id) => {
    const data = await fetch(`/api/review/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session && session.user.accessToken}`,
      },
      body: JSON.stringify({ id, like, product_id }),
    });

    const res = await data.json();
    setReviews(res);
  };

  const handleAddToWishlist = async (id) => {
    const data = await fetch(`/api/users/product/addtowishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session && session.user.accessToken}`,
      },
      body: JSON.stringify({ id }),
    });

    const res = await data.json();
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
    }
  };

  const minus = async (id) => {
    if (!session) {
      toast.warning("Please SignIn First");
    } else {
      const data = await fetch(`/api/cart/${session.user.id}/minus`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ product_id: id, quantity: 1 }),
      });

      if (data.ok) {
        const response = await data.json();
        if (response) {
          const savedcart = response.items;
          const initialCartObj = {
            savedcart,
            shipping: response.shipping,
            subtotal: response.subtotal,
            total: response.total,
          };
          dispatch(initialCart(initialCartObj));
          toast.success("Removed successfully");
        }
      }
    }
  };

  const handleStarRating = (index) => {
    setStarRating(index + 1);
  };

  const handleAddToCart = async (id) => {
    if (!session) {
      toast.warning("Please SignIn First");
    } else {
      const data = await fetch(`/api/cart/${session.user.id}/add`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ product_id: id, quantity: 1 }),
      });
      if (data.ok) {
        const response = await data.json();
        if (response) {
          const savedcart = response.items;
          const initialCartObj = {
            savedcart,
            shipping: response.shipping,
            subtotal: response.subtotal,
            total: response.total,
          };
          dispatch(initialCart(initialCartObj));
          toast.success("Added successfully");
        }
      }
    }
  };
  const handleBuyNow = async (id) => {
    if (!session) {
      toast.warning("Please SignIn First");
    } else {
      const data = await fetch(`/api/cart/${session.user.id}/add`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ product_id: id, quantity: 1 }),
      });
      if (data.ok) {
        const response = await data.json();
        if (response) {
          const savedcart = response.items;
          const initialCartObj = {
            savedcart,
            shipping: response.shipping,
            subtotal: response.subtotal,
            total: response.total,
          };
          dispatch(initialCart(initialCartObj));
          router.push('/placeorder')
        }
      }
    }
  };

  const handleSubmit = () => {

    if (!session) {
      toast.warning("Please SignIn First");
    } else {
      toadt.success("Review added")
    }
  }

  const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';
  const youtubeOptions = {
    method: 'GET',

    headers: {
      'X-RapidAPI-Key': "8374352490msh0bfad092455b7e4p117e86jsn08fae4eb1b9a",
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
  };


  const doSomething = async () => {
    const res = await fetch(`${youtubeSearchUrl}/search?query=${product_data.name} exercise`, youtubeOptions);
    const relatedVideosData = await res.json();
    setRelatedVideos(relatedVideosData.contents);
  }

  useEffect(() => {
    setMainImg(product_data.images[0]);

    doSomething();

  }, [product_data]);

  const openNewWindow = () => {
    // Calculate window size and position
    const width = 600; // Width of the new window
    const height = 500; // Height of the new window
    const left = (window.innerWidth - width) / 2; // Center horizontally
    const top = (window.innerHeight - height) / 2; // Center vertically

    // Options for the new window
    const options = `width=${width},height=${height},left=${left},top=${top}`;

    // Open new window with specified size and position
    window.open('/policy', 'New Window', options);
  };



  return (
    <>
      <Head>
        <title>{product_data.name}</title>
        <meta property="og:title" content={product_data.name} />
        <meta
          property="og:description"
          content={`Shop for ${product_data.category_id.name} &amp; more using our Apneehatti platform Free shipping &amp; COD.`}
        />
        <meta property="og:url" content={router.asPath} />
        <meta property="og:site_name" content="Apneehatti" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:url" content={product_data.images[0]} />
        <meta property="twitter:image" content={product_data.images[0]}></meta>
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:title" content={product_data.alt_text}></meta>
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:url" content={product_data.images[0]} />
        <meta property="og:image:width" content="1800" />
        <meta property="og:image:height" content="1600" />
        <meta property="og:image:alt" content={product_data.alt_text} />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-w-screen">
        {/* <Breadcrumb
          aria-label="Solid background breadcrumb example"
          className="bg-gray-50 py-3 px-5 dark:bg-gray-900 hidden md:block"
        >
          <Breadcrumb.Item icon={HiHome}>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Search</Breadcrumb.Item>
          <Breadcrumb.Item>Product</Breadcrumb.Item>
          {product_data?.category_id.name && (
            <Breadcrumb.Item className="capitalize" href="#">
              {product_data?.category_id.name}
            </Breadcrumb.Item>
          )}
          {product_data && (
            <Breadcrumb.Item className="capitalize truncate " href="#">
              {product_data.name}
            </Breadcrumb.Item>
          )}
        </Breadcrumb> */}

        {/* ProductDetail */}
        <div className=" md:m-6 space-y-3 ">
          <div className=" lg:grid grid-cols-2  relative " >
            <div className="relative " >
              <div
                className="flex   lg:sticky lg:top-35 mt-2   overflow-y-auto imageidv   "
                id="1"
              >

                <div
                  className=" md:min-h-[550px] min-h-[400px]  relative flex justify-center items-center  overflow-hidden rounded"
                  style={{}}
                >
                  <div
                    className="rounded"
                  // onMouseMove={() => setZoomIn(true)}
                  // onMouseLeave={() => setZoomIn(false)}
                  >
                    <div
                      id="img_wrapper"
                      className=" w-full h-full  justify-center items-center cursor-pointer mb-20 rounded bg-white "

                    >
                      <Image
                        src={mainImg}
                        // onMouseMove={imageMagnify}
                        width={900}
                        height={740}
                        id="bigImg"
                        className="border"
                        // objectFit="contain"
                        alt={product_data.alt_text}
                      />
                      <div className="flex justify-center flex-wrap ">
                        {product_data.images.map((item, idx) => (
                          <div key={item._id}>
                            <div className="bg-gray-50 mb-1 p-2  hover:border-black cursor-pointer">
                              <Image
                                src={item}
                                alt={product_data.alt_text}
                                width={100}
                                height={100}
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL={item}
                                objectFit="contain"
                                onMouseEnter={(e) => setMainImg(item)}
                                onTouchStart={(e) => setMainImg(item)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>

                    <div
                      className={`${zoomIn ? "" : "hidden"
                        } absolute z-30 opacity-60 top-0 w-28 h-20  bg-gray-100 opacity-15`}
                      id="lens"
                    ></div>
                    { /* Reviews*/}
                    

                  </div>

                </div>






              </div>



            </div>


            <div className="relative overflow-y-auto font-serif rounded " id="2">
              <div
                className={`${zoomIn ? "" : "hidden"
                  }   top-0 fixed flex justify-center z-10 items-center border-2   `}
                id="zoomable_container"
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "650px",
                }}
              ></div>

              <div className={`  w-4/5 lg:px-10 m-2 bg-white mx-auto rounded  `}>
                <div className="rounded bg-white ">
                <div className="space-y-2  p-4 border-gray-300 rounded bg-white rounded ">
                  <h2 className="text-xl md:text-2xl font-semibold font-serif">
                    {product_data.name}
                  </h2>
                </div>
                <div className="space-y-2 md:space-y-0 md:flex gap-10 p-4 border-gray-300 rounded my-2 bg-white rounded">
                  <div className=" space-y-2">
                    <Link
                      href={{
                        pathname: "/search",
                        query: { category: product_data.category_id.slug },
                      }}
                    >
                      <p className="text-md text-blue-500 cursor-pointer ">
                        Visit the {product_data.category_id.name}
                      </p>
                    </Link>
                    <div className="flex gap-x-1 items-center">
                      <h3 className="text-md font-medium">
                        {product_data.rating}
                      </h3>
                      <Rating>
                        {Array.from({ length: 5 }, (elem, index) => {
                          return (
                            <Rating.Star
                              key={index}
                              filled={
                                product_data.rating > index ? true : false
                              }
                            />
                          );
                        })}
                      </Rating>
                      <h3 className="text-md ml-4 font-medium">
                        {reviews.length} ratings
                      </h3>
                    </div>
                  </div>
                  <SocialShare
                    url={`${host + router.asPath}`}
                    quote={product_data.name}
                  />
                </div>
                <div className="p-4 space-y-1 flex items-center gap-x-5 border-gray-300 rounded bg-white rounded">
                  <div className="space-y-2">
                    <div className="flex  items-end  space-x-2">
                      {calculateDiscount(product_data.price, product_data.MRP) >
                        0 && (
                          <h4 className="text-md text-green-500 bg-green-100 p-2 border border-green-200">
                            {calculateDiscount(
                              product_data.price,
                              product_data.MRP
                            ) + "%"}
                          </h4>
                        )}
                      <div className="mr-2 text-green-800 font-medium " >

                        New Price:

                      </div>
                      <CurrencyFormatter price={product_data.price} />
                    </div>
                    <h6 className="text-md  text-gray-400 ">
                      M.R.P :{" "}
                      <span className="line-through">
                        <CurrencyFormatter price={product_data.MRP} />
                      </span>
                    </h6>
                    <div className="text-sm font-medium  flex items-center space-x-1">
                      <h5 className="text-gray-700">
                        Sold by{" "}
                        <span className="underline">
                          {product_data.brand_id?.name}
                        </span>
                      </h5>
                    </div>

                    <p className="text-sm  text-blue-500 cursor-pointer" onClick={openNewWindow}>
                      Check Policy
                    </p>

                  </div>
                  <div className="flex flex-1 max-w-[200px] items-center h-full text-primary font-medium p-2 my-2">
                    {/* Minus icon */}
                    <div
                      onClick={() => minus(product_data._id)}
                      className="flex justify-center items-center cursor-pointer rounded-full bg-gray-300"
                      style={{ width: '30px', height: '30px' }}
                    >
                      <IoMdRemove style={{ color: 'black', fontSize: '20px' }} />
                    </div>

                    {/* Quantity display */}
                    <div className="flex justify-center items-center px-2">
                      {cartItems.filter((item) => item.id === product_data._id).length > 0 ? (
                        cartItems
                          .filter((item) => item.id === product_data._id)
                          .map((x) => (
                            <span key={x.id}>{x.quantity || 0}</span>
                          ))
                      ) : (
                        <span>0</span>
                      )}
                    </div>

                    {/* Plus icon */}
                    <div
                      onClick={() => handleAddToCart(product_data._id)}
                      className="flex justify-center items-center cursor-pointer rounded-full bg-gray-300"
                      style={{ width: '30px', height: '30px' }}
                    >
                      <IoMdAdd style={{ color: 'black', fontSize: '20px' }} />
                    </div>
                  </div>

                      </div>
                </div>
                {/* <div className="grid grid-cols-1  md:grid-cols-2 gap-x-4 font-sans ">
                        <button
                          className=" uppercase transition-all duration-300 hover:bg-pink-600 hover:text-white text-sm font-bold w-full  border-2 border-pink-500 text-pink-500"
                          onClick={() => handleAddToWishlist(product_data._id)}
                        >
                          Add to Wishlist
                        </button>
                        <button
                          className="uppercase transition-all duration-300 hover:bg-pink-600 hover:text-white text-sm font-bold w-full  border-2 border-pink-500 text-pink-500"
                          onClick={() => handleAddToCart(product_data._id)}
                        >
                          Add to bag
                        </button>
                      </div>
                       */}
                <div className="d-flex justify-content-between mt-6 button-wrapper  ">
                  <button
                    onClick={(e) => {
                      add(product);
                    }}
                    className="button"
                  >
                    <div className="d-flex flex-row">
                      <FaShoppingCart />
                      ADD TO CART

                    </div>
                  </button>
                  <div
                    className="button button-buy-now"
                    onClick={(e) => buynowhandler(e)}
                  >
                    <div className="button-content">
                      BUY NOW

                    </div>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-5 items-stretch border-b border-gray-300 bg-white rounded my-4">
                  <div className="flex flex-col items-center justify-center text-center h-full space-y-2 ">
                    <MdRestore className="text-3xl" />
                    <p className="text-xs font-medium">7 days replacement</p>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center h-full space-y-2 ">
                    <SiBrandfolder className="text-2xl" />
                    <p className="text-xs font-medium">Top brand</p>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center h-full space-y-2 ">
                    <TbTruckDelivery className="text-3xl" />
                    <p className="text-xs font-medium">Fast delivery</p>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center h-full space-y-2">
                    <RiSecurePaymentFill className="text-2xl" />
                    <p className="text-xs font-medium">Secure transaction</p>
                  </div>
                </div>




                <p className=" my-4 ld:px-4 text-sm text-gray-500 text-justify leading-6 line-clamp-6  bg-white rounded">
                  <TextEditorView desc={product_data.desc} />
                  {/* {product_data.desc} */}
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="  mx-4  min-h-[200px]">
        {/* Reviews */}
        <ProductReview
          reviews={reviews}
          setReviews={setReviews}
          starRating={starRating}
          session={session}
          reviewModalOpen={reviewModalOpen}
          setReviewModalOpen={setReviewModalOpen}
          reviewEditModalOpen={reviewEditModalOpen}
          setReviewEditModalOpen={setReviewEditModalOpen}
          handleStarRating={handleStarRating}
          setThumbsDown={setThumbsDown}
          setThumbsUp={setThumbsUp}
          reviewLike={reviewLike}
          createReview={createReview}
          editReview={editReview}
          mainImg={mainImg}
          product_data={product_data}
        />
      </div>


      <Box sx={{  textAlign: 'center' }} className="mb-3 bg-white mx-4 rounded" >
        <Typography  color="#000" sx={{ width: '100%', margin: 'auto' }}>
          <span className="text-2xl" style={{  textTransform: 'capitalize' }}>Related Videos</span>
        </Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'center',
            '& .exercise-video': {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              margin: '10px',
              padding: '10px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              maxWidth: '250px', // Set maximum width for uniformity
              width: '200px', // Set fixed width to ensure uniform size
              height: '200px', // Set fixed height to ensure uniform size
              overflow: 'hidden', // Hide overflow to prevent size variations
            },
            '@media (max-width: 600px)': {
              flexDirection: 'column',
              alignItems: 'center',
            },
          }}
        >
          {relatedVideos?.slice(0, 6)?.map((item, index) => (
            <a
              key={index}
              className="exercise-video"
              href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
              target="_blank"
              rel="noreferrer"
            >
              <img style={{ borderTopLeftRadius: '8px', width: '100%', height: '50%', objectFit: 'cover' }} src={item.video.thumbnails[0].url} alt={item.video.title} />
              <Box sx={{ marginTop: '10px', textAlign: 'center', width: '100%' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.video.title}
                </Typography>
                <Typography sx={{ fontSize: '10px', color: '#000' }}>
                  {item.video.channelName}
                </Typography>
              </Box>
            </a>
          ))}
        </Stack>
      </Box>





      <div className="p-2 mx-4  min-h-[200px] ">
        {/* Related Products */}
        <RelatedProduct relatedProducts={relatedProducts} category={category} />
      </div>
    </>
  );
};

export default ProductDetail;
