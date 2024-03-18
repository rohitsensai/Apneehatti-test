import React from "react";
import CurrencyFormatter from "../helper/currencyFormatter"; // Import the CurrencyFormatter component
import Image from "next/image";

const CheckoutCartItem = ({ item }) => {
  return (
    <div className="p-4 flex justify-between">
      <div className="flex w-full gap-x-4 items-start">
        <div className=" bg-white  rounded p-2 flex justify-center items-center">
          <div className="relative h-16 w-24">
            <Image
              src={item.thumbnail}
              layout="fill"
              objectFit="contain"
              alt={item.alt_text}
              loading="lazy"
              placeholder="blur"
              blurDataURL={item.thumbnail}
            />
          </div>
        </div>
        <div className="px-2 py-1 w-full">
          <h5 className="capitalize line-clamp-2 font-medium text-sm mb-1">
            {item.title}
          </h5>
          <h5 className="text-sm font-light">Qty {item.quantity}</h5>
        </div>
        <div>
          <h4 className=" font-medium">
            <CurrencyFormatter price={item.price * item.quantity} />
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCartItem;
