import { Breadcrumb, Rating } from "flowbite-react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { HiHome } from "react-icons/hi";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";

const BottomNavigation = dynamic(() =>
  import("../../components/bottomNavigation")
);
const Product = dynamic(() => import("../../components/card"));

export async function getServerSideProps(context) {
  const { category, q } = context.query;

  console.log("c",category)
  console.log("q",q)

  const apiEndpoints = {
    all: "/api/products/list",
    category: category ? `/api/products/category/${category}` : null,
    name: q ? `/api/products/name/${encodeURIComponent(q.trim())}` : null,
  };

  const endpoint =
    apiEndpoints[
    category && category != "all" ? "category" : q ? "name" : "all"
    ];
  const url = process.env.HOST + endpoint;
  const dataPromises = endpoint
    ? [fetch(url).then((res) => (res.status == 200 ? res.json() : []))]
    : [];
  const [res] = await Promise.all(dataPromises);


  const filteredRes =
    res?.filter((item) => item?.category_id?.active && item?.active) || [];
  return {
    props: {
      pro_category: category || null,
      prod: filteredRes,
      query: q || null,
    },
  };
}

const productScreen = ({ prod, pro_category, query }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [products, setProducts] = useState(prod || []);
  const [maxProductPrice, setMaxProductPrice] = useState(30000);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(maxProductPrice);
  const [discount, setDiscount] = useState(0);
  const [rating, setRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);


  const sortBy = (sort) => {
    let sortedProducts = [...products];

    if (sort === "lth") {
      sortedProducts.sort((a, b) => a.MRP - b.MRP);
    } else if (sort === "htl") {
      sortedProducts.sort((a, b) => b.MRP - a.MRP);
    } else if (sort === "a-z") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "z-a") {
      sortedProducts.sort((a, b) => -a.name.localeCompare(b.name));
    }
    setProducts(sortedProducts);
  };

  const filterHandler = () => {
    let filteredItems = [...prod];

    if (min || max) {
      filteredItems = filteredItems.filter(
        (item) => item.price >= min && item.price <= max
      );
    }

    if (discount > 0) {
      filteredItems = filteredItems.filter(
        (item) => ((item.MRP - item.price) / item.MRP) * 100 >= discount
      );
    }

    if (rating > 0) {
      filteredItems = filteredItems.filter(
        (item) => Number(item.Rating) >= rating
      );
    }

    setProducts(filteredItems);
  };

  const resetFilters = () => {
    setMin(0);
    setMax(maxProductPrice);
    setDiscount(0);
    setRating(0);
    setProducts([...prod]);
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach((input) => {
      input.checked = false;
    });
    document.getElementById("maxFilterValue").value = maxProductPrice;
    document.getElementById("maxFilterValueMobile").value = maxProductPrice;
  };

  useEffect(() => {
    if (products.length > 0) {
      if (max < min) {
        setMax(min);
        setMin(max);
      }
      filterHandler();
    }
  }, [min, max, discount, rating]);

  useEffect(() => {
    setProducts([...prod]);
  }, [router.query]);

  return (
    <>
      <Head>
        <title>{!query ? pro_category : query}</title>
      </Head>
      <div className=" " >
     
        <div className="  " >
          {/* <Breadcrumb
            aria-label="Solid background breadcrumb example"
            className="  dark:bg-gray-900"
          >
            <Breadcrumb.Item icon={HiHome}>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Search</Breadcrumb.Item>
            {pro_category && (
              <Breadcrumb.Item className="capitalize" href="#">
                {pro_category}
              </Breadcrumb.Item>
            )}
            {query && (
              <Breadcrumb.Item className="capitalize " href="#">
                {query}
              </Breadcrumb.Item>
            )}
          </Breadcrumb> */}
<div className="d-flex flex-row justify-content-between bg-white rounded shadow-sm mb-4 sticky top-0 z-20 px-3 mx-4 ">
            <div className="text-gray-500">Total {products.length} results</div>
            <div>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-black font-medium text-sm whitespace-nowrap py-2 px-3 border border-gray-300"
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              onMouseEnter={()  => setShowFilters(!showFilters)}
              
             
            >
              Filters
            </button>
            {  showFilters && ( <div className="  hidden md:block mx-auto "    onMouseLeave={() => setShowFilters(!showFilters)}>
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="flex justify-between items-center">
              <h1 className="font-medium text-md uppercase pb-3">Filter By</h1>
              <button
                className="font-medium text-sm text-black whitespace-nowrap py-2 px-3 bg-gray-200 hover:bg-gray-300 border border-gray-300"
                type="button"
                onClick={() => resetFilters()}
              >
                Reset
              </button>
            </div>
            <div className="mb-3 w-full">
              <h6 className="font-medium text-md py-2">Price</h6>
              <div className="flex items-center w-full relative">
                <div className="range-slider">
                  <div className="relative h-4">
                    <input
                      className="bg-green-400 h-1 rounded-lg border-gray-700 appearance-none absolute w-full"
                      defaultValue="0"
                      onChange={(e) => setMin(Number(e.target.value))}
                      min="0"
                      step={500}
                      max={maxProductPrice}
                      type="range"
                    />
                    <input
                      className="bg-green-400 h-1 rounded-lg border-gray-700 appearance-none absolute w-full"
                      defaultValue={maxProductPrice}
                      onChange={(e) => setMax(Number(e.target.value))}
                      min="0"
                      id="maxFilterValue"
                      step={500}
                      max={maxProductPrice}
                      type="range"
                    />
                  </div>

                  <div className="flex gap-x-5 items-center justify-center">
                    <input
                      className=" border-gray-300 border py-1 px-2 text-sm w-full"
                      value={min}
                      disabled
                    />
                    <h5 className="text-center text-md text-gray-500">to</h5>
                    <input
                      className=" border-gray-300 border py-1 px-2 text-sm w-full"
                      value={max}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <h6 className="font-medium text-md py-2">Customer Ratings</h6>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value={4}
                    onClick={(e) => setRating(Number(e.target.value))}
                    name="default-radio"
                    className="w-4 h-4 text-green-400 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ml-2 text-sm text-gray-500 hover:text-black cursor-pointer dark:text-gray-300 flex items-center"
                  >
                    <span className="mr-1 flex items-center">
                      4
                      <Rating size={"xs"}>
                        <Rating.Star filled={true} />
                      </Rating>
                    </span>
                    & above
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-radio-2"
                    type="radio"
                    value={3}
                    onClick={(e) => setRating(Number(e.target.value))}
                    name="default-radio"
                    className="w-4 h-4 text-green-400 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ml-2 text-sm text-gray-500 hover:text-black cursor-pointer dark:text-gray-300 flex items-center"
                  >
                    <span className="mr-1 flex items-center">
                      3
                      <Rating size={"xs"}>
                        <Rating.Star filled={true} />
                      </Rating>
                    </span>
                    & above
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-radio-3"
                    type="radio"
                    value={2}
                    onClick={(e) => setRating(Number(e.target.value))}
                    name="default-radio"
                    className="w-4 h-4 text-green-400 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-3"
                    className="ml-2 text-sm text-gray-500 hover:text-black cursor-pointer dark:text-gray-300 flex items-center"
                  >
                    <span className="mr-1 flex items-center">
                      2
                      <Rating size={"xs"}>
                        <Rating.Star filled={true} />
                      </Rating>
                    </span>
                    & above
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <h6 className="font-medium text-md py-2">Discount</h6>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center">
                  <input
                    id="default-radio-discount-1"
                    type="radio"
                    value={40}
                    onClick={(e) => setDiscount(e.target.value)}
                    name="default-radio-discount"
                    className="w-4 h-4 text-green-400 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-discount-1"
                    className="ml-2 text-sm text-gray-500 hover:text-black cursor-pointer dark:text-gray-300 flex items-center"
                  >
                    40% & more
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-radio-discount-2"
                    type="radio"
                    value={30}
                    onClick={(e) => setDiscount(e.target.value)}
                    name="default-radio-discount"
                    className="w-4 h-4 text-green-400 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-discount-2"
                    className="ml-2 text-sm text-gray-500 hover:text-black cursor-pointer dark:text-gray-300 flex items-center"
                  >
                    30% & more
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-radio-discount-3"
                    type="radio"
                    value={20}
                    onClick={(e) => setDiscount(e.target.value)}
                    name="default-radio-discount"
                    className="w-4 h-4 text-green-400 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-discount-3"
                    className="ml-2 text-sm text-gray-500 hover:text-black cursor-pointer dark:text-gray-300 flex items-center"
                  >
                    20% & more
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-radio-discount-4"
                    type="radio"
                    value={10}
                    onClick={(e) => setDiscount(e.target.value)}
                    name="default-radio-discount"
                    className="w-4 h-4 text-green-400 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-discount-4"
                    className="ml-2 text-sm text-gray-500 hover:text-black cursor-pointer dark:text-gray-300 flex items-center"
                  >
                    10% & more
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>)}
            </div>
            
            <div className="hidden md:flex lg:w-1/5 items-center">
              <h5 className="font-medium text-sm text-black whitespace-nowrap py-2 px-3 bg-gray-200 border border-gray-300 m-2">
                Sort by
              </h5>
              <select
                onChange={(e) => sortBy(e.target.value)}
                id="sort_by"
                className="bg-gray-50 border-gray-300  cursor-pointer text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-5"
                defaultValue={"selected"}

              >
                <option>Default</option>

                <option value="lth">Low to high</option>
                <option value="htl">High to low</option>
                <option value="a-z">A to Z</option>
                <option value="z-a">Z to A</option>
              </select>
            </div>
          </div>
         

          <AnimatePresence >
            <div className="rounded grid gap-1 xs:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4  z-index-1 bg-white mx-4">
              {products.length > 0 &&
                products.map((item) => (
                  <Product
                    key={item._id}
                    product={{
                      id: item._id,
                      title: item.name,
                      price: item.price,
                      MRP: item.MRP,
                      // category: item.category_id,
                      rating: item.rating,
                      image: item.images[0],
                      alt_text: item.alt_text,
                    }}
                  />
                ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
      <BottomNavigation
        resetFilters={resetFilters}
        sortBy={sortBy}
        setDiscount={setDiscount}
        setMin={setMin}
        setMax={setMax}
        min={min}
        max={max}
        setRating={setRating}
        rating={rating}
        maxProductPrice={maxProductPrice}
        setMaxProductPrice={setMaxProductPrice}
      />
    </>
  );
};

export default productScreen;
