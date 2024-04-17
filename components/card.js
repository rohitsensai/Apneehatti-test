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
import { useRouter } from "next/router";
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
const Product = ({ product }) => {
  const router = useRouter();
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

  const whishlisthandler = () => {

    if (!session) {
      toast.warning("Please Sign In First");

    } else {
      router.push('/wishlist')
    }
  };
  const buynowhandler = async (product) => {



    if (!session) {
      toast.warning("Please Sign In First");

    } else {
      console.log("id", session.user.id)
      console.log(product.id)
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
        console.log("res", response)
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
      router.push('/placeorder')
    }
  };



  const add = async (product) => {
    if (!session) {
      toast.warning("Please SignIn First");
    } else {
      console.log("id", session.user.id)
      console.log(product.id)
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
        console.log("res", response)
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
    <div className="border border-blue m-1 " style={{ backgroundColor: "#DDFFDA" }}>
      <div className="block bg-white   overflow-hidden " style={{ backgroundColor: "#DDFFDA" }}>
        <div className="min-h-[400px] relative borde" style={{ backgroundColor: "#DDFFDA" }}>
          <div className="h-[220px]  relative overflow-hidden group transition ">
            <div className="position-absolute z-10 top-2 end-5" onClick={whishlisthandler} style={{ cursor: "pointer", backgroundColor: "#E42C16", borderRadius: "50%", padding: "8px" }}>
              <FaHeart size={20} style={{ color: "white" }} />
            </div>


            <div className="w-full h-full flex justify-center items-center cursor-pointer" style={{ backgroundColor: "#DDFFDA" }}>
              <Link
                href={{
                  pathname: `/product-detail/[title]`,
                  query: { title: title, pid: id },
                }}
                passHref
              >
                <a target="_blank" rel="noopener noreferrer">
                  <div className="relative mx-auto" style={{ width: "320px", height: "240px" }}>
                    <Image
                      src={image}
                      width={320}
                      height={240}
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
          <div className=" pb-4 relative" style={{ backgroundColor: "#DDFFDA" }}>
            <div className="text-xs capitalize text-gray-500 ">
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
              {calculateDiscount(MRP, price) >= 1 && (
                <div
                  className="
              text-green-500 text-xs z-10  bg-green-100 rounded-sm  right-3"
                >
                  <span>{calculateDiscount(MRP, price)}% OFF</span>
                </div>
              )}
            </div>

          </div>
          {/* Add to cart button */}
          <div className="">
            {/* Other content */}
            {/* Add to cart and Buy now buttons */}
            <div className="d-flex justify-content-between  button-wrapper">
              <button
                onClick={(e) => {
                  add(product);
                }}
                className="button"
              >
                <div className="button-content">
                  ADD TO CART
                  <FaShoppingCart />
                </div>
              </button>
              <div
                className="button button-buy-now"
                onClick={(e) => buynowhandler(e)}
              >
                <div className="button-content">
                  BUY NOW
                  <FaShoppingCart />
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Product;

