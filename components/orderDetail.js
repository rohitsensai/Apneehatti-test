import { Breadcrumb } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { HiHome } from "react-icons/hi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import CurrencyFormatter from "../helper/currencyFormatter";
import Invoice from "./invoice";

const OrderDetail = ({ order, shipping_address, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const check_delivery_status = (status, delivery_status) => {
    let check_status;
    if (status == "order_confirmed") {
      if (delivery_status == "order_confirmed") {
        check_status = true;
      } else if (delivery_status == "shipped") {
        check_status = true;
      } else if (delivery_status == "out_for_delivery") {
        check_status = true;
      } else if (delivery_status == "delivered") {
        check_status = true;
      }
    } else if (status == "shipped") {
      if (delivery_status == "order_confirmed") {
        check_status = false;
      } else if (delivery_status == "shipped") {
        check_status = true;
      } else if (delivery_status == "out_for_delivery") {
        check_status = true;
      } else if (delivery_status == "delivered") {
        check_status = true;
      }
    } else if (status == "out_for_delivery") {
      if (delivery_status == "order_confirmed") {
        check_status = false;
      } else if (delivery_status == "shipped") {
        check_status = false;
      } else if (delivery_status == "out_for_delivery") {
        check_status = true;
      } else if (delivery_status == "delivered") {
        check_status = true;
      }
    } else if (status == "delivered") {
      if (delivery_status == "order_confirmed") {
        check_status = false;
      } else if (delivery_status == "shipped") {
        check_status = false;
      } else if (delivery_status == "out_for_delivery") {
        check_status = false;
      } else if (delivery_status == "delivered") {
        check_status = true;
      }
    }
    return check_status;
  };

  return (
    <>
      <Breadcrumb
        aria-label="Solid background breadcrumb example"
        className="hidden md:block bg-gray-50 py-3 px-5 dark:bg-gray-900"
      >
        <Breadcrumb.Item icon={HiHome}>Home</Breadcrumb.Item>
        <Breadcrumb.Item>My Account</Breadcrumb.Item>
        <Breadcrumb.Item>My Orders</Breadcrumb.Item>
        <Breadcrumb.Item>#{order._id}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="min-h-screen md:w-5/6 mx-auto p-5">
        <div className=" md:flex justify-between ">
          <h1 className=" font-medium text-lg uppercase ">
            Order ID : #{order._id}
          </h1>
          <h1 className=" font-medium text-sm capitalize">
            Date : {new Date(order.createdAt).toDateString()}
            {" , "}
            {new Date(order.createdAt).toLocaleTimeString()}{" "}
          </h1>
        </div>

        <div className="border-b-2 p-4">
          <h1 className="capitalize font-medium text-lg">Shipping Details</h1>
          <div className="md:flex justify-between mt-2">
            <div className="mt-5 md:m-0">
              <h5 className="text-sm mb-1 ">Shipping Address</h5>
              <div className="pl-3 pt-2">
                <h5 className="text-sm mb-1 text-gray-500 capitalize">
                  {user.fullname}
                </h5>
                <h5 className="text-sm mb-1 text-gray-500 capitalize">
                  {order.shipping_address.address_line +
                    ", " +
                    order.shipping_address.city +
                    ", " +
                    order.shipping_address.postal_code +
                    ", " +
                    order.shipping_address.state +
                    ", " +
                    order.shipping_address.country}
                </h5>
                <h5 className="text-sm mb-1 text-gray-500">
                  <span className="text-black"> Email :</span>{" "}
                  {order.shipping_address.email}
                </h5>
                <h5 className="text-sm mb-1 text-gray-500">
                  <span className="text-black"> Contact No :</span>{" "}
                  {order.shipping_address.mobile}
                </h5>
              </div>{" "}
            </div>
            <div className="mt-5 md:m-0">
              <h5 className="text-sm mb-1 ">Billing Address</h5>
              <div className="pl-3 pt-2">
                <h5 className="text-sm mb-1 text-gray-500 capitalize">
                  {user.fullname}
                </h5>
                <h5 className="text-sm mb-1 text-gray-500 capitalize">
                  {order.shipping_address.address_line +
                    ", " +
                    order.shipping_address.city +
                    ", " +
                    order.shipping_address.postal_code +
                    ", " +
                    order.shipping_address.state +
                    ", " +
                    order.shipping_address.country}
                </h5>
                <h5 className="text-sm mb-1 text-gray-500">
                  <span className="text-black"> Email :</span>{" "}
                  {order.shipping_address.email}
                </h5>
                <h5 className="text-sm mb-1 text-gray-500">
                  <span className="text-black"> Contact No :</span>{" "}
                  {order.shipping_address.mobile}
                </h5>
              </div>{" "}
            </div>
            <div className="flex flex-col justify-center items-center mt-5 md:m-0">
              <h5 className="font-bold uppercase">
                Total : <CurrencyFormatter price={order.total} />
              </h5>
              {/* <button className=" px-10 w-56 py-2  uppercase transition-all duration-300 hover:bg-black hover:text-white text-sm font-bold mt-2 border-2 border-black">
                Download Invoice
              </button> */}
              <Invoice
                order={order}
                billing_address={shipping_address}
                shipping_address={shipping_address}
                logo={"/images/logo/apneehatti_logo.png"}
                signature={"/images/signature/signature.png"}
              />
            </div>
          </div>
        </div>
        <div className="border-b-2 md:p-4">
          <h1 className="capitalize font-medium text-lg mt-2">Order Items</h1>
          <div className="md:pl-3 pt-2">
            {order.order_items.map((item) => (
              <div key={item._id}>
                <div className="w-full bg-white   border">
                  <div className="p-2 py-5 flex flex-wrap justify-center items-center">
                    <div className="relative h-20 w-1/5 md:w-1/12 flex justify-center items-center">
                      <Image
                        src={item.image[0]}
                        layout="fill"
                        objectFit="contain"
                        alt="product_img"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={item.image[0]}
                      />
                    </div>
                    <div className=" w-4/5 md:w-3/12">
                      <h5 className="text-sm text-gray-500 ml-5">
                        {item.title}
                      </h5>
                      <h5 className="text-sm text-gray-500 ml-5">
                        <CurrencyFormatter price={item.price} />
                      </h5>
                      <h5 className="text-sm text-gray-500 ml-5">
                        Total Price ({item.quantity} Item) :{" "}
                        <CurrencyFormatter price={item.price * item.quantity} />
                      </h5>
                    </div>
                    <div className="hidden md:block w-full md:w-2/3 pt-10 pb-5  items-center justify-center relative mt-5">
                      <ol className="flex items-center w-4/5 mx-auto mb-4 sm:mb-5">
                        <li
                          className={`flex w-full relative items-center text-black dark:text-black after:content-[''] after:w-full after:h-1 after:border-b ${
                            check_delivery_status(
                              "order_confirmed",
                              item.delivery_status
                            ) && "after:border-green-300"
                          } after:border-4 after:inline-block ${
                            check_delivery_status(
                              "order_confirmed",
                              item.delivery_status
                            ) && "dark:after:border-green-800"
                          }`}
                        >
                          <span
                            className={`absolute -top-5 -left-6 font-medium text-sm ${
                              check_delivery_status(
                                "order_confirmed",
                                item.delivery_status
                              ) && "text-green-500"
                            }`}
                          >
                            Order Confirm
                          </span>
                          {/* <span className="absolute -bottom-6 -left-6  text-xs text-gray-500">
                            {new Date(order.createdAt).toDateString()}
                          </span> */}
                          <div
                            className={`flex items-center justify-center w-5 h-5 ${
                              check_delivery_status(
                                "order_confirmed",
                                item.delivery_status
                              ) && "bg-green-300"
                            } rounded-full lg:h-8 lg:w-8 ${
                              check_delivery_status(
                                "order_confirmed",
                                item.delivery_status
                              ) && "dark:bg-green-800"
                            } shrink-0`}
                          >
                            <svg
                              aria-hidden="true"
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </li>
                        <li
                          className={`flex w-full relative items-center text-black dark:text-black after:content-[''] after:w-full after:h-1 after:border-b ${
                            check_delivery_status(
                              "shipped",
                              item.delivery_status
                            )
                              ? "after:border-green-300"
                              : "after:border-gray-200"
                          } after:border-4 after:inline-block ${
                            check_delivery_status(
                              "shipped",
                              item.delivery_status
                            )
                              ? "dark:after:border-green-800"
                              : "dark:after:border-gray-700"
                          }`}
                        >
                          <span
                            className={`absolute -top-5 -left-2 font-medium text-sm ${
                              check_delivery_status(
                                "shipped",
                                item.delivery_status
                              ) && "text-green-500"
                            }`}
                          >
                            Shipped
                          </span>
                          <div
                            className={`flex items-center justify-center w-5 h-5 ${
                              check_delivery_status(
                                "shipped",
                                item.delivery_status
                              )
                                ? "bg-green-300"
                                : "bg-gray-200"
                            } rounded-full lg:h-8 lg:w-8 ${
                              check_delivery_status(
                                "shipped",
                                item.delivery_status
                              )
                                ? "dark:bg-green-800"
                                : "dark:after:bg-gray-700"
                            } shrink-0`}
                          >
                            <svg
                              aria-hidden="true"
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </li>
                        <li
                          className={`flex w-full relative items-center text-black dark:text-black after:content-[''] after:w-full after:h-1 after:border-b ${
                            check_delivery_status(
                              "out_for_delivery",
                              item.delivery_status
                            )
                              ? "after:border-green-300"
                              : "after:border-gray-200"
                          } after:border-4 after:inline-block ${
                            check_delivery_status(
                              "out_for_delivery",
                              item.delivery_status
                            )
                              ? "dark:after:border-green-800"
                              : "dark:after:border-gray-700"
                          }`}
                        >
                          <span
                            className={`absolute -top-5 -left-7 font-medium text-sm ${
                              check_delivery_status(
                                "out_for_delivery",
                                item.delivery_status
                              ) && "text-green-500"
                            }`}
                          >
                            Out for delivery
                          </span>
                          <div
                            className={`flex items-center justify-center w-5 h-5 ${
                              check_delivery_status(
                                "out_for_delivery",
                                item.delivery_status
                              )
                                ? "bg-green-300"
                                : "bg-gray-200"
                            } rounded-full lg:h-8 lg:w-8 ${
                              check_delivery_status(
                                "out_for_delivery",
                                item.delivery_status
                              )
                                ? "dark:bg-green-800"
                                : "dark:after:bg-gray-700"
                            } shrink-0`}
                          >
                            <svg
                              aria-hidden="true"
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </li>
                        <li className="flex relative items-center ">
                          <span
                            className={`absolute -top-5 -left-3 font-medium text-sm ${
                              check_delivery_status(
                                "delivered",
                                item.delivery_status
                              ) && "text-green-500"
                            }`}
                          >
                            Delivered
                          </span>
                          <div
                            className={`flex items-center justify-center w-5 h-5 ${
                              check_delivery_status(
                                "delivered",
                                item.delivery_status
                              )
                                ? "bg-green-300"
                                : "bg-gray-200"
                            } rounded-full lg:h-8 lg:w-8 ${
                              check_delivery_status(
                                "delivered",
                                item.delivery_status
                              )
                                ? "dark:bg-green-800"
                                : "dark:after:bg-gray-700"
                            } shrink-0`}
                          >
                            <svg
                              aria-hidden="true"
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="md:hidden border-b-0 border-l-0 border-r-0 border border-gray-200 w-full">
                    <div
                      className="p-2 bg-gray-200 flex justify-between items-center"
                      onClick={(e) => setIsOpen(!isOpen)}
                    >
                      <h5 className="font-medium text-md">Track your order</h5>
                      {isOpen ? (
                        <RiArrowDropUpLine className="text-3xl" />
                      ) : (
                        <RiArrowDropDownLine className="text-3xl" />
                      )}
                    </div>
                    <ol
                      className={`${
                        isOpen ? "d-block" : "hidden"
                      } w-full  ml-8 relative my-5 text-black border-l border-green-400 dark:border-gray-700 dark:text-gray-400`}
                    >
                      <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-5 h-5 bg-green-200 rounded-full -left-2 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                          <svg
                            aria-hidden="true"
                            className="w-3 h-3 text-green-500 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                        <h3 className="font-medium leading-tight text-sm">
                          Order confirm
                        </h3>
                        <p className="text-sm">
                          {new Date(order.createdAt).toDateString()}
                        </p>
                      </li>
                      <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-5 h-5 bg-gray-200 rounded-full -left-2 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                          <svg
                            aria-hidden="true"
                            className="w-3 h-3 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                        <h3 className="font-medium leading-tight text-sm">
                          Shipped
                        </h3>
                        <p className="text-sm">Pending</p>
                      </li>
                      <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-5 h-5 bg-gray-200 rounded-full -left-2 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                          <svg
                            aria-hidden="true"
                            className="w-3 h-3 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                        <h3 className="font-medium leading-tight text-sm">
                          Out for delivery
                        </h3>
                        <p className="text-sm">Pending</p>
                      </li>
                      <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-5 h-5 bg-gray-200 rounded-full bottom-0 -left-2 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                          <svg
                            aria-hidden="true"
                            className="w-3 h-3 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                        <h3 className="font-medium leading-tight text-sm">
                          Delivered
                        </h3>
                        <p className="text-sm">Pending</p>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
