"use client";
import Link from "next/link";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { initialCart } from "../slices/cart";
import CurrencyFormatter from "../helper/currencyFormatter";
import { useSession } from "next-auth/react";

const CartItem = ({ item, clearCartFun, itemcount }) => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const { id, thumbnail, title, price, quantity } = item;

  const minus = async (id) => {
    const data = await fetch(`/api/cart/${session.user.id}/minus`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ product_id: id, quantity: 1 }),
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
  };

  const add = async (id) => {
    const data = await fetch(`/api/cart/${session.user.id}/add`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ product_id: id, quantity: 1 }),
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
  };

  const removeFromCartFun = async (id) => {
    if (itemcount == 1) {
      clearCartFun();
    } else {
      const data = await fetch(`/api/cart/${session.user.id}/removeItem`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "Delete",
        body: JSON.stringify({ product_id: id }),
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
    <div className="flex gap-x-4 py-1 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className=" w-full min-h-[120px] flex items-center gap-x-4">
        {/* thumbnail */}
        <div className="relative w-28 h-full">
          <Image
            src={thumbnail}
            alt="cart_img"
            layout="fill"
            objectFit="contain"
            loading="lazy"
            placeholder="blur"
            blurDataURL={thumbnail}
          />
        </div>
        <div className="w-full flex flex-col">
          {/* title & remove icon */}
          <div className="flex justify-between mb-2 ">
            {/* title */}
            <Link
              href={{
                pathname: `/product-detail/[title]`,
                query: { title: title, pid: id },
              }}
            >
              <div className="text-xs line-clamp-2 cursor-pointer uppercase font-medium max-w-[240px] text-primary hover:underline">
                <span>{title}</span>
              </div>
            </Link>
            {/* remove icon */}
            <div
              onClick={() => {
                removeFromCartFun(id);
              }}
              className="text-xl cursor-pointer"
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            {/* qty */}
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              {/* minus icon */}
              <div
                onClick={() => {
                  minus(id);
                }}
                className="flex-1 flex justify-center items-center cursor-pointer h-full"
              >
                <IoMdRemove />
              </div>
              {/* amount */}
              <div className="h-full flex justify-center items-center px-2">
                {quantity}
              </div>
              {/* plus icon */}
              <div
                onClick={() => {
                  add(id);
                }}
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
              >
                <IoMdAdd />
              </div>
            </div>
            {/* item price */}
            <div className="flex-1 flex items-center justify-around">
              <CurrencyFormatter price={price} />
              {/* &#8377;{price} */}
            </div>
            {/* final price */}
            {/* make the price at 2 decimals */}
            <div className="flex-1 flex justify-end items-center text-primary font-medium">
              <CurrencyFormatter price={price * quantity} />
              {/* &#8377;{price * quantity} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
