import Image from "next/image";
import CurrencyFormatter from "../../../helper/currencyFormatter";
import Head from "next/head";
import { clearCart } from "../../../slices/cart";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  const { order_id } = await context.query;
  const data = await fetch(`${process.env.HOST}/api/orders/${order_id}`);
  const res = await data.json();
  return {
    props: {
      order: res,
      user: res.user_id,
      payment: res.transaction_id ? res.transaction_id : null,
      socket_URL: process.env.SOCKET_URL,
    },
  };
}
const OrderPage = ({ order, user, payment, socket_URL }) => {
  const dispatch = useDispatch();
  const clearCartFun = async () => {
    const cart = await fetch(`/api/cart/${user._id}`);
    const cartData = await cart.json();
    if (!cartData) {
      dispatch(clearCart());
    }
  };
  useEffect(() => {
    clearCartFun();
  }, []);

  return (
    <>
      <Head>
        <title>Congratulations! Your order has been successfully placed.</title>
      </Head>
      <div className="w-screen p-2 md:p-5 mx-auto bg-white ">
        <h1 className="text-center text-lg pt-2 md:py-2 font-medium capitalize">
          Thank You ! It's on the way...
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="pb-5 pt-2 md:p-5 ">
            <div className="border-b-2 p-4 shadow">
              <h1 className="capitalize font-medium text-lg">
                Your Order was placed successfully.
              </h1>
              <h5 className="text-sm mb-1">
                check your email for your order confirmation.
              </h5>
              <div className=" leading-10 pl-3 pt-2">
                <h5 className="text-sm mb-1 text-gray-500">
                  Your Order : #{order._id}
                </h5>
                <h5 className="text-sm mb-1 text-gray-500">
                  Order Date : {new Date(order.createdAt).toDateString()}{" "}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </h5>
                <h5 className="text-sm mb-1 text-gray-500">
                  We have sent the order confirmation details to email
                </h5>
              </div>
            </div>
            <div className="border-b-2 p-4 shadow">
              <h1 className="capitalize font-medium text-lg">
                Shipping Details.
              </h1>
              <h5 className="text-sm mb-1 ">Shipping Address</h5>
              <div className="pl-3 pt-2">
                <h5 className="text-sm mb-1 text-gray-500 capitalize">
                  {order.shipping_address.fullname || user.fullname}
                </h5>
                <h5 className="text-sm mb-1 text-gray-500 capitalize">
                  {order.shipping_address?.address_line +
                    ", " +
                    order.shipping_address?.city +
                    ", " +
                    order.shipping_address?.postal_code +
                    ", " +
                    order.shipping_address?.state +
                    ", " +
                    order.shipping_address?.country}
                </h5>
                <h5 className="text-sm mb-1 text-gray-500">
                  {order.shipping_address?.email}
                </h5>
                <h5 className="text-sm mb-1 text-gray-500">
                  {order.shipping_address?.mobile}
                </h5>
              </div>{" "}
            </div>
            <div className="border-b-2 p-4 shadow">
              <h1 className="capitalize font-medium text-lg">
                Payment Details.
              </h1>
              <h5 className="text-sm mb-1 ">Payment Method</h5>
              <div className="pl-3 pt-2">
                <h5 className="text-sm mb-1 text-gray-500 capitalize">
                  {order.payment_method == "cod"
                    ? "cash on delivery"
                    : "Netbanking"}
                </h5>
                {payment && (
                  <div>
                    <h5 className="text-sm mb-1 text-gray-500">
                      Transaction ID : {payment?.order_id}
                    </h5>
                    <h5 className="text-sm mb-1 text-gray-500">
                      Payment ID : {payment?.payment_id}
                    </h5>
                    <h5 className="text-sm mb-1 text-gray-500">
                      Transaction Time :{" "}
                      {new Date(payment?.createdAt).toDateString()}{" "}
                      {new Date(payment?.createdAt).toLocaleTimeString()}
                    </h5>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="px-3 md:px-5 py-8 shadow">
            <h1 className="capitalize font-medium text-lg">Order Summary</h1>
            <h5 className="text-sm">Arrives between 5 to 6 days.</h5>
            {order &&
              order.order_items.map((item) => (
                <div className="py-1 md:p-4 flex justify-between" key={item.id}>
                  <div className="flex items-start">
                    <div className=" bg-white relative h-16 w-24 ">
                      <Image
                        src={item.image[0]}
                        layout="fill"
                        objectFit="contain"
                        alt="product img"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={item.image[0]}
                      />
                    </div>
                    <div className="w-3/4 px-2 py-1">
                      <h5 className="capitalize line-clamp-2 font-medium text-sm mb-1">
                        {item.title}
                      </h5>
                      <h5 className="text-sm font-light text-gray-500">
                        Qty {item.quantity}
                      </h5>
                    </div>
                  </div>
                  <div>
                    <h4 className=" font-medium">
                      <CurrencyFormatter price={item.quantity * item.price} />
                    </h4>
                  </div>
                </div>
              ))}

            <div className="border-b-2 pb-4 leading-7 text-gray-500 text-sm">
              <div className="flex justify-between">
                <h5 className="">Subtotal</h5>
                <h5 className="">
                  {<CurrencyFormatter price={order.subtotal} />}
                </h5>
              </div>
              <div className="flex justify-between">
                <h5 className="">Discount</h5>
                <h5 className="">
                  - {<CurrencyFormatter price={order.discount} />}
                </h5>
              </div>
              <div className="flex justify-between">
                <h5 className="">Shipping</h5>
                <h5 className="">
                  {" "}
                  {<CurrencyFormatter price={order.shipping_price || 0} />}
                </h5>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <h5 className=" font-medium">Order Total</h5>
              <h5 className=" font-medium">
                {<CurrencyFormatter price={order.total} />}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-screen  lg:w-3/5 mx-auto p-10 hidden">
        <div className=" leading-9 mb-6">
          <h5 className="text-sky-300 font-serif text-xl font-semibold">
            Thank you !
          </h5>
          <h5 className="text-4xl font-extrabold">It's on the way!</h5>
          <h6 className="text-md text-gray-500 font-light">
            Your order #{order._id} has shipped and will be with you soon.
          </h6>
        </div>
        <div>
          {order &&
            order.order_items.map((item) => (
              <div className="p-4 flex justify-between" key={item.id}>
                <div className="flex items-start">
                  <div className=" bg-white shadow rounded p-2 flex justify-center items-center">
                    <div className="relative h-14 w-24">
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
                  </div>
                  <div className="w-3/4 px-2 py-1">
                    <h5 className="capitalize line-clamp-2 font-medium text-sm mb-1">
                      {item.title}
                    </h5>
                    <h5 className="text-sm font-light">Qty {item.quantity}</h5>
                  </div>
                </div>
                <div>
                  <h4 className=" font-medium">
                    <CurrencyFormatter price={item.quantity * item.MRP} />
                  </h4>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default OrderPage;
