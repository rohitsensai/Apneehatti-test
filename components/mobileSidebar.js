"use client";
import { Accordion } from "flowbite-react";
import Link from "next/link";
import { BsPersonCircle } from "react-icons/bs";
import { HiHome, HiOutlineLogout } from "react-icons/hi";
import { CiShoppingBasket } from "react-icons/ci";
import { SiWish } from "react-icons/si";
import Image from "next/image";

const MobileSidebar = ({
  setCloseSidebar,
  closeSidebar,
  categories,
  session,
  status,
  signOut,
}) => {
  return (
    <>
      <div
        className={`fixed top-0 bottom-0 left-0 bg-gray-400 z-40 min-h-screen h-full overflow-y-scroll transition-transform ${
          closeSidebar && "-translate-x-full"
        } bg-opacity-40`}
      >
        <div
          id="drawer-navigation"
          className="block z-30 w-3/4  p-4 overflow-y-auto max-h-full transition-transform   bg-white dark:bg-gray-800"
          tabIndex="-1"
          aria-labelledby="drawer-navigation-label"
        >
          <div className="flex justify-between items-center border-b pb-4">
            <div className="relative h-14 w-14">
              <Image
                src="/images/logo/ApneeHatti_light.png"
                alt="logo"
                layout="fill"
                objectFit="contain"
                loading="lazy"
                placeholder="blur"
                blurDataURL="/images/logo/apneehatti_logo.svg"
              />
            </div>
            <button
              onClick={() => setCloseSidebar(!closeSidebar)}
              type="button"
              className="btn3"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <div className="">
            <h6 className=" uppercase mb-2 font-medium bg-gray-50 p-2  shadow-lg">
              Welcome
            </h6>
            <div>
              <Link href="/">
                <h6 className=" text-gray-500 flex items-center gap-x-2 m-0 capitalize p-2 border-b">
                  <HiHome className="mb-1" /> Home
                </h6>
              </Link>
              {status != "authenticated" ? (
                <Link href="/login">
                  <h6
                    onClick={() => setCloseSidebar(!closeSidebar)}
                    className=" text-gray-500 capitalize p-2 border-b"
                  >
                    Sign In
                  </h6>
                </Link>
              ) : (
                <div className="space-y-2">
                  <Link href="/myprofile">
                    <h6 className=" text-gray-500 flex items-center gap-x-2 m-0 capitalize p-2 border-b">
                      <BsPersonCircle className="mb-1" />{" "}
                      {session && session.user.name}
                    </h6>
                  </Link>

                  <Link href="/myorders">
                    <h6
                      onClick={() => setCloseSidebar(!closeSidebar)}
                      className=" text-gray-500 flex items-center gap-x-2 m-0 capitalize p-2 border-b"
                    >
                      <CiShoppingBasket className="mb-1 text-lg" /> My Orders
                    </h6>
                  </Link>
                  <Link href="/wishlist">
                    <h6
                      onClick={() => setCloseSidebar(!closeSidebar)}
                      className=" text-gray-500 flex items-center gap-x-2 m-0 capitalize p-2 border-b"
                    >
                      <SiWish className="mb-1 text-lg" /> My Wishlist
                    </h6>
                  </Link>
                  <h6
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className=" text-gray-500 flex items-center gap-x-2 m-0 capitalize p-2 border-b"
                  >
                    <HiOutlineLogout className="mb-1 text-lg" /> Logout
                  </h6>
                </div>
              )}
            </div>
          </div>
          <div className=" overflow-y-auto">
            <h6 className=" uppercase mb-2 font-medium bg-gray-50 p-2  shadow-lg">
              Categories
            </h6>
            <Accordion collapseAll={true} alwaysOpen={true} flush={true}>
              <Link
                href={{
                  pathname: "/search",
                  query: { category: "all" },
                }}
              >
                <h6
                  onClick={() => setCloseSidebar(!closeSidebar)}
                  className="mb-2 text-gray-500 capitalize p-2"
                >
                  All
                </h6>
              </Link>
              {categories.map((item) => {
                if (item.children.length > 0) {
                  return (
                    <Accordion.Panel key={item._id}>
                      <Accordion.Title>{item.name}</Accordion.Title>
                      <Accordion.Content>
                        {item.children.map((child) => (
                          <Link
                            key={item._id}
                            className=""
                            href={{
                              pathname: "/search",
                              query: { category: child.slug },
                            }}
                          >
                            <h6
                              onClick={() => setCloseSidebar(!closeSidebar)}
                              className="mb-2 text-gray-500 capitalize p-2"
                            >
                              {child.name}{" "}
                            </h6>
                          </Link>
                        ))}
                      </Accordion.Content>
                    </Accordion.Panel>
                  );
                } else {
                  return (
                    <Link
                      key={item._id}
                      href={{
                        pathname: "/search",
                        query: { category: item.slug },
                      }}
                    >
                      <h6
                        onClick={() => setCloseSidebar(!closeSidebar)}
                        className="mb-2 text-gray-500 capitalize p-2"
                      >
                        {item.name}{" "}
                      </h6>
                    </Link>
                  );
                }
              })}
            </Accordion>
            <h6 className=" uppercase mb-2 font-medium bg-gray-50 p-2  shadow-lg">
              Help
            </h6>
            <div className="py-1 overflow-y-auto">
              <Link href="/policy">
                <h6
                  onClick={() => setCloseSidebar(!closeSidebar)}
                  className="mb-2 text-gray-500 capitalize p-2 border-b"
                >
                  Shipping Policy
                </h6>
              </Link>
              <Link href="/policy">
                <h6
                  onClick={() => setCloseSidebar(!closeSidebar)}
                  className="mb-2 text-gray-500 capitalize p-2 border-b"
                >
                  Return Policy
                </h6>
              </Link>
              <Link href="/policy">
                <h6
                  onClick={() => setCloseSidebar(!closeSidebar)}
                  className="mb-2 text-gray-500 capitalize p-2 border-b"
                >
                  Cancellation Policy
                </h6>
              </Link>
              <Link href="/FAQs">
                <h6
                  onClick={() => setCloseSidebar(!closeSidebar)}
                  className="mb-2 text-gray-500 capitalize p-2 border-b"
                >
                  FAQ
                </h6>
              </Link>
            </div>
            <h6 className=" uppercase mb-2 font-medium bg-gray-50 p-2  shadow-lg">
              Support
            </h6>
            <div className="p-4 text-sm space-y-2 text-center overflow-y-auto bg-gradient-to-br shadow-md border">
              <h6 className="font-medium">
                FOR ANY HELP, YOU MAY CALL US AT +917876752516
              </h6>
              <h6 className="bg-gray-50 p-2 border border-green-500 ">
                ( Monday To Saturday, 8AM To 10PM And Sunday, 10AM To 7PM )
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
