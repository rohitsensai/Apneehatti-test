import { Rating } from "flowbite-react";
const ProductSkeleton = () => {
  return (
    <div className=" animate-pulse">
      <div className="block bg-white border border-gray-50 shadow group  overflow-hidden">
        <div className="min-h-[395px] relative">
          <div className="h-[220px] mb-2 relative overflow-hidden group transition">
            <div className="w-full h-full flex justify-center items-center cursor-pointer">
              <div className="relative bg-gray-300 mx-auto w-52 h-52 flex items-center justify-center rounded dark:bg-gray-700">
                <svg
                  className="text-gray-200 w-12 h-12"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>
            </div>
          </div>
          {/* category & title & MRP */}
          <div className="px-5 pb-4 relative">
            <div className="text-xs capitalize text-gray-500 mb-1">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-2"></div>
            </div>
            <h2 className="lg:text-sm  font-semibold mb-1 line-clamp-2">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
            </h2>
            <div>
              <Rating size={"sm"}>
                {Array.from({ length: 5 }, (elem, index) => {
                  return (
                    <div>
                      <Rating.Star key={index} filled={false} />
                    </div>
                  );
                })}
              </Rating>
            </div>
            <div className="flex items-center gap-x-2 mt-2">
              <div className="font-semibold">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 "></div>
              </div>
              <div className="text-sm line-through text-gray-700">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 "></div>
              </div>
            </div>
          </div>
          <div className="px-5 w-full">
            <div className=" h-7 bg-gray-200 rounded-sm dark:bg-gray-700 w-full "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
