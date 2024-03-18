import React from "react";
import CurrencyFormatter from "../helper/currencyFormatter"; // Import the CurrencyFormatter component
import CheckoutCartItem from "./checkoutCartItem";

const CartSummary = ({
  cartItems,
  subtotal,
  discount,
  shippingPrice,
  total,
}) => {
  return (
    <div className="hidden lg:block p-16">
      <div className="mb-3">
        <h5 className="mb-1 font-medium">Amount due</h5>
        <h2 className="text-3xl font-extrabold">
          <CurrencyFormatter price={total} />
        </h2>
      </div>
      <div
        className="mb-3 max-h-[500px] overflow-y-scroll"
        id="scrollbar_container"
      >
        {cartItems.length > 0 &&
          cartItems.map((item) => (
            <CheckoutCartItem key={item.id} item={item} />
          ))}
      </div>
      <div className="mt-6">
        <div className="py-4 leading-8 border-r-0 border-l-0 border border-black">
          <div className="flex justify-between items-center">
            <h5 className="">Subtotal</h5>
            <h5 className="">
              <CurrencyFormatter price={subtotal} />
            </h5>
          </div>
          <div className="flex justify-between items-center">
            <h5 className="">Discount</h5>
            <h5 className="">
              - &nbsp;
              <CurrencyFormatter price={discount} />
            </h5>
          </div>
          <div className="flex justify-between items-center">
            <h5 className="">Shipping</h5>
            <h5 className="">
              <CurrencyFormatter price={shippingPrice} />
            </h5>
          </div>
        </div>
        <div className="flex font-medium justify-between items-center mt-3">
          <h5 className="font-semibold">Total</h5>
          <h5 className="font-semibold">
            <CurrencyFormatter price={total} />
          </h5>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
