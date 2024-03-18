import { Rating } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart, initialCart } from "../slices/cart";
import CurrencyFormatter from "../helper/currencyFormatter";
import calculateDiscount from "../helper/calculateDiscount";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { id, image, category, title, price, MRP, rating, alt_text } = product;
  const [added, setAdded] = useState(false);
  const { data: session, status } = useSession();

 

  const addToBasketAnimation = () => {
    setAdded(!added);
    setTimeout(() => {
      setAdded(false);
    }, 5000);
  };

  const add = async (product) => {
    if (!session) {
      toast.warning("Please SignIn First");
    } else {
      addToBasketAnimation();
      const data = await fetch(`/api/cart/${session.user.id}/add`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ product_id: product.id, quantity: 1 }),
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
        }
      }
    }
  };
  return (
    <div>
      <div className="block bg-white   overflow-hidden m-1">
        <div className="min-h-[445px] relative">
          <div className="h-[220px] mb-4 relative overflow-hidden group transition">
            {calculateDiscount(MRP, price) >= 1 && (
              <div
                className="
              text-green-500 text-xs absolute z-10 top-2 bg-green-100 rounded-sm  right-3"
              >
                <span>{calculateDiscount(MRP, price)}% OFF</span>
              </div>
            )}

            <div className="w-full h-full flex justify-center items-center cursor-pointer">
              {/* image */}
              <Link
                href={{
                  pathname: `/product-detail/[title]`,
                  query: { title: title, pid: id },
                }}
                passHref
              >
                <a target="_blank" rel="noopener noreferrer">
                  <div className="relative mx-auto">
                    <Image
                      src={image}
                      width={220}
                      height={220}
                      alt={alt_text}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={image}
                    />
                  </div>
                </a>
              </Link>
            </div>
          </div>
          {/* category & title & MRP */}
          <div className=" pb-4 relative" >
            <div className="text-xs capitalize text-gray-500 mb-1">
              {category}
            </div>
            <Link
              href={{
                pathname: `/product-detail/[title]`,
                query: { title: title, pid: id },
              }}
              passHref
            >
              <a target="_blank" rel="noopener noreferrer">
                <h2 className="lg:text-sm  font-semibold mb-1 line-clamp-2" data-toggle="tooltip" data-placement="top" title={title}>
                  {title}
                </h2>
              </a>
            </Link>
            <div>
              <Rating size={"sm"}>
                {Array.from({ length: 5 }, (elem, index) => {
                  return (
                    <div>
                      <Rating.Star
                        key={index}
                        filled={rating > index ? true : false}
                      />
                    </div>
                  );
                })}
              </Rating>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="font-semibold">
                <CurrencyFormatter price={price} />
              </div>
              <div className="text-sm line-through text-gray-700">
                <CurrencyFormatter price={MRP} />
              </div>
            </div>
          </div>
          {/* Add to cart button */}
          <div className=" absolute bottom-3 w-full" >
          <button className="btn1">
            <div>Buy Now
              </div>
            </button>

            <div >
              <button
                onClick={(e) => {
                  add(product);
                }}
                className="btn1"
              >
                {added ? (
                  <div className="flex gap-x-1 items-center justify-center">
                    added successfully{" "}
                    <svg
                      className="w-4 h-4 font-medium flex-shrink-0  "
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </div>
                ) : (
                  <div>add to basket</div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
