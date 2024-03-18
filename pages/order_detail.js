import dynamic from "next/dynamic";
import Head from "next/head";

const OrderDetail = dynamic(() => import("../components/orderDetail"), {
  ssr: false,
});

export async function getServerSideProps(context) {
  const { id } = await context.query;

  const data = await fetch(`${process.env.HOST}/api/orders/${id}`);
  const res = await data.json();

  return {
    props: {
      order_id: id,
      order: res,
      user: res.user_id,
      shipping_address: res.shipping_address,
      payment: res.transaction_id ? res.transaction_id : null,
    },
  };
}

const OrderDetails = ({ order, shipping_address, user, order_id }) => {
  return (
    <>
      <Head>
        <title>Order Details</title>
      </Head>
      <div>
        <OrderDetail
          order={order}
          shipping_address={shipping_address}
          user={user}
        />
      </div>
    </>
  );
};

export default OrderDetails;
