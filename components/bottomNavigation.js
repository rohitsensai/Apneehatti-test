"use client";
import { useState } from "react";
import { BsFilter, BsSortAlphaDown } from "react-icons/bs";
import { Rating } from "flowbite-react";

const BottomNavigation = ({
  resetFilters,
  setDiscount,
  setMin,
  setMax,
  min,
  max,
  setRating,
  maxProductPrice,
  sortBy,
}) => {
  const [isFilterOpen, setisFilterOpen] = useState(false);
  const [isSortOpen, setisSortOpen] = useState(false);

  return (
    <div className="md:hidden ">
      <div
        className={`fixed z-10 bottom-0 transform right-0 left-0 transition-all duration-100 bg-white h-screen p-5 ${
          isFilterOpen ? "top-[94px]" : "top-[100%]"
        }`}
      >
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="flex justify-between items-center">
            <h5 className="font-medium text-md uppercase pb-3">Filter By</h5>
            <button
              className="font-medium text-sm text-black whitespace-nowrap py-2 px-3 bg-gray-200 hover:bg-gray-300 border border-gray-300"
              type="button"
              onClick={() => resetFilters()}
            >
              Reset
            </button>
          </div>{" "}
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
                    step={500}
                    max={maxProductPrice}
                    id="maxFilterValueMobile"
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
          <div className="mt-3 w-full mx-auto">
            <button
              className="btn1"
              onClick={() => setisFilterOpen(false)}
              type="button"
            >
              Save
            </button>
          </div>
        </div>{" "}
      </div>
      <div
        className={`fixed z-10 bottom-0 transform right-0 left-0 max-h-fit transition-all duration-100 bg-white h-screen p-5 ${
          isSortOpen ? "top-[94px]" : "top-[100%]"
        }`}
      >
        <h5 className="font-medium text-md uppercase pb-3">Sort By</h5>
        <ul className="leading-10">
          <li className="ml-3">
            <input
              id="lth"
              type="radio"
              value="lth"
              onClick={(e) => sortBy(e.target.value)}
              name="sort_by"
              className="w-6 h-6 text-green-400 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="lth"
              className="ml-2 text-md font-medium text-gray-400 dark:text-gray-500"
            >
              Low to High
            </label>
          </li>
          <li className="ml-3">
            <input
              id="htl"
              type="radio"
              value="htl"
              onClick={(e) => sortBy(e.target.value)}
              name="sort_by"
              className="w-6 h-6 text-green-400 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="htl"
              className="ml-2 text-md font-medium text-gray-400 dark:text-gray-500"
            >
              High to low
            </label>
          </li>
          <li className="ml-3">
            <input
              id="a-z"
              type="radio"
              value="a-z"
              onClick={(e) => sortBy(e.target.value)}
              name="sort_by"
              className="w-6 h-6 text-green-400 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="a-z"
              className="ml-2 text-md font-medium text-gray-400 dark:text-gray-500"
            >
              A to Z
            </label>{" "}
          </li>
          <li className="ml-3">
            <input
              id="z-a"
              type="radio"
              value="z-a"
              onClick={(e) => sortBy(e.target.value)}
              name="sort_by"
              className="w-6 h-6 text-green-400 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="z-a"
              className="ml-2 text-md font-medium text-gray-400 dark:text-gray-500"
            >
              Z to A
            </label>{" "}
          </li>
        </ul>
        <div className="mt-3 w-full mx-auto">
          <button
            className="btn1"
            onClick={() => setisSortOpen(false)}
            type="button"
          >
            Save
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 z-10 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full grid-cols-2">
          <button
            type="button"
            onClick={() => setisSortOpen(!isSortOpen)}
            className="inline-flex border-r flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <BsSortAlphaDown />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Sort
            </span>
          </button>
          <button
            type="button"
            onClick={() => setisFilterOpen(!isFilterOpen)}
            className="inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <BsFilter />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Filter
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
