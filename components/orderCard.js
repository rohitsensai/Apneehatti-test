import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import CurrencyFormatter from "../helper/currencyFormatter";
import { getNextSeventhDayDate } from "../helper/estimateDeliveryDate";

const OrderCard = ({ orders }) => {
  return (
    <div className="min-h-screen container lg:w-5/6 m-auto p-5 ">
      <h1 className="font-medium text-xl">Order History</h1>

      {orders.length > 0 ? (
        <>
          <div className="mt-5">
            {orders.map((item) => (
              <div className="border p-3 bg-gray-100" key={item._id}>
                <div className="md:grid grid-cols-3 mb-1">
                  <div>
                    <h5 className="text-sm mb-2 text-gray-500">
                      <span
                        className="uppercase font-medium text-black
                "
                      >
                        Order Id :
                      </span>{" "}
                      #{item._id}
                    </h5>
                  </div>
                  <div className="hidden md:block">
                    <h5 className="text-sm mb-2 text-gray-500 text-center">
                      <span
                        className="uppercase font-medium text-black
                "
                      >
                        Order Date :
                      </span>{" "}
                      {new Date(item.createdAt).toDateString()}
                      {" , "}
                      {new Date(item.createdAt).toLocaleTimeString()}{" "}
                    </h5>
                  </div>{" "}
                  <div className="hidden md:block">
                    <h5 className="text-sm mb-2 text-gray-500 float-right">
                      <span
                        className="uppercase font-medium text-black
                "
                      >
                        Order Total :
                      </span>{" "}
                      <CurrencyFormatter price={item.total} />
                    </h5>
                  </div>
                </div>
                {item.order_items.map((newItem) => (
                  <div key={newItem._id}>
                    <div className="w-full bg-white flex justify-center items-center  p-2 py-5 border">
                      <div className="relative w-1/4 h-24 ">
                        <Image
                          src={newItem.image[0]}
                          layout="fill"
                          objectFit="contain"
                          alt="product_img"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={newItem.image[0]}
                        />
                      </div>
                      <div className=" w-2/3">
                        <h5 className="text-md flex items-center gap-x-2">
                          <span className=" h-3 w-3 bg-yellow-200 rounded-full lowercase"></span>
                          Deliver It On {getNextSeventhDayDate(item.createdAt)}
                        </h5>
                        <h5 className="text-sm text-gray-500 ml-5 line-clamp-2">
                          {newItem.title}
                        </h5>
                      </div>
                      <div className="w-1/12">
                        <Link
                          href={{
                            pathname: "/order_details",
                            query: { id: item._id },
                          }}
                        >
                          <HiOutlineArrowsExpand className="text-2xl mx-auto" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="p-5 mt-10 text-center">
          <h5 className=" font-semibold text-md mb-2">
            Your order history is currently empty, but don't worry!
          </h5>
          <p className="text-sm font-light text-gray-500">
            Our online store is filled with amazing products waiting to be
            discovered. Browse through our wide range of items, and find
            something that piques your interest. With our unbeatable prices and
            exceptional quality, it's the perfect time to treat yourself or find
            a special gift for someone. Start shopping today and create a
            memorable shopping experience with us.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
