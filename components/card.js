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
  let { id, image, category, title, price, MRP, rating, alt_text } = product;
  const [added, setAdded] = useState(false);
  const { data: session, status } = useSession();

  if(image == "") image = null;

  console.log(image)





  const addToBasketAnimation = () => {
    setAdded(!added);
    setTimeout(() => {
      setAdded(false);
    }, 5000);
  };

  const whishlisthandler = async () => {

    if(session){
    console.log("inside wishlisthandler")
    console.log(product.id)
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
  }
  else{
    toast.warning("Please sign in first")
  }
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
        toast.success("Product Added Successfully", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    }
  };
  return (
    <div className="border my-2  " style={{ backgroundColor: "white" }}>
      <div className="block bg-white overflow-hidden">
        <div className="min-h-[320px] relative" style={{ backgroundColor: "white" }}>
          <div className="h-[220px] relative overflow-hidden group transition">
            <div
              className="position-absolute z-1 top-2 end-5 heart"
              onClick={whishlisthandler}
              style={{ cursor: "pointer", backgroundColor: "red", borderRadius: "50%", padding: "8px" }}
            >
              <FaHeart size={12} style={{ color: "white" }} />
            </div>

            <div className="w-full h-full flex justify-center items-center cursor-pointer">
              <Link
                href={{
                  pathname: `/product-detail/[title]`,
                  query: { title: title, pid: id },
                }}
                passHref
              >
                <a target="_blank" rel="noopener noreferrer">
                  <div className="relative mx-auto  w-full h-full">
                    <img
                      src={image}
                      width={320}
                      height={240}
                      alt={alt_text}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={image}
                      
                      style={{
                      // Adjust the border radius as needed
                        overflow: "hidden",
                        minHeight:"200px",
                        maxHeight:"220px" // Clip content within the rounded corners
                      }}
                      />
                  </div>
                </a>
              </Link>
            </div>
          </div>

          {/* Category, Title, Rating, Price */}
          <div className="relative px-2 ">
            <div className="text-xs capitalize text-gray-500">
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
                <h2 className="lg:text-sm font-semibold mb-1 line-clamp-2" data-toggle="tooltip" data-placement="top" title={title}>
                  {title}
                </h2>
              </a>
            </Link>
            <div>
              <Rating size={"sm"}>
                {Array.from({ length: 5 }, (elem, index) => (
                  <div key={index}>
                    <Rating.Star filled={rating > index} />
                  </div>
                ))}
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
                <div className="text-green-500 text-xs z-10 bg-white-100 rounded-sm right-3">
                  <span>{calculateDiscount(MRP, price)}% OFF</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className=" bg-white my-3">
          <div className="d-flex justify-content-between button-wrapper px-2 bg-white ">
            <button
              onClick={(e) => {
                add(product);
              }}
              className="button"
            >
              <div className="button-content ">
                <FaShoppingCart />
                ADD TO CART
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Product;


