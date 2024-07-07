import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartTotal, clearCart, initialCart } from "../slices/cart";
import CartItem from "./cartItem";
import CurrencyFormatter from "../helper/currencyFormatter";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import EmptyCart from "./emptyCart";

const Cart = ({ isOpen, setIsOpen, session, status }) => {
  const dispatch = useDispatch();
  const { cartItems, total, subtotal, shipping } = useSelector(
    (state) => state.cart
  );
  const router = useRouter();

  const checkout = () => {
    setIsOpen(!isOpen);
    if (session && session.user.accessToken) {
      router.push("/placeorder");
    } else {
      router.push("/login");
    }
  };

  const initialCartLoad = async () => {
    const data = await fetch(`/api/cart/${session.user.id}`);
    console.log(data);
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
  };

  const clearCartFun = async () => {
    const data = await fetch(`/api/cart/${session.user.id}/clear`, {
      method: "Delete",
    });
    if (data.ok) {
      dispatch(clearCart());
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (session) {
      initialCartLoad();
    }
  }, [status]);
  return (
    <>
      <div
        className={`${
          isOpen ? "right-0" : "-right-full"
        }  w-full bg-white fixed top-0 bottom-0 shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-40 px-4 lg:px-[20px]`}
      >
        <div className="flex flex-col  h-[75%] overflow-y-auto overflow-x-hidden ">
          <div className="flex items-center py-3 justify-between   border-b">
            <div className="uppercase text-sm font-semibold">
              Shopping Bag {<CurrencyFormatter price={total} />}
            </div>
            {/* icon */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer w-8 h-8 flex justify-center items-center"
            >
              <IoMdArrowForward className="text-2xl" />
            </div>
          </div>
          {total == 0 && <EmptyCart />}
          <div
            className="flex flex-col  overflow-y-auto overflow-x-hidden "
            id="scrollbar_container"
          >
            {cartItems.length > 0 &&
              cartItems.map((item) => {
                return (
                  <CartItem
                    itemcount={cartItems.length}
                    clearCartFun={clearCartFun}
                    item={item}
                    key={item._id}
                  />
                );
              })}
          </div>
        </div>
        {cartItems.length > 0 && (
          <div className="flex flex-col h-[25%] gap-y-1 overflow-hidden  z-10 w-full border-t ">
            <div className="flex w-full leading-6 pt-4 justify-between items-center">
              {/* total */}
              <div className="uppercase font-medium">
                {/* <div className="flex  items-center">
                  {" "}
                  <span className="mr-2 lg:w-[100px] text-sm">Shipping</span>
                  <div className="text-left">
                    <span className="mx-1">:</span>
                    {<CurrencyFormatter price={shipping} />}
                  </div>
                </div> */}
                <div className="flex items-center">
                  {" "}
                  <span className="mr-2 lg:w-[100px] text-sm">Subtotal</span>
                  <div className="text-left">
                    <span className="mx-1">:</span>
                    <CurrencyFormatter price={subtotal} />
                  </div>
                </div>
{/* 
                <div className="flex  items-center">
                  <span className="mr-2 lg:w-[100px] text-sm">Total</span>
                  <div className="text-left">
                    <span className="mx-1">:</span>
                    <CurrencyFormatter price={total} />
                  </div>
                </div> */}
              </div>
              {/* clear cart icon */}
              <button
                onClick={() => clearCartFun()}
                className=" p-2  uppercase transition-all duration-300 hover:bg-red-500 text-red-500 hover:text-white text-2xl font-bold  mt-2 border-2 border-red-500"
              >
                <FiTrash2 />
              </button>
            </div>

            <button
              onClick={() => checkout()}
              className=" p-2 my-2 uppercase transition-all duration-300 text-sm font-bold w-full mt-2 "
              disabled={total == 0 ? true : false}
              style={{border:"2px solid black"}}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
