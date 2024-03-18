import { getSession } from "next-auth/react";
import Head from "next/head";
import dynamic from "next/dynamic";

const OrderCard = dynamic(() => import("../components/orderCard"), {
  ssr: false,
});

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  const data = await fetch(
    `${process.env.HOST}/api/orders/user/${session && session.user.id}`
  );
  const res = await data.json();

  return {
    props: {
      orders: res,
    },
  };
}

const myorders = ({ orders }) => {
  return (
    <>
      <Head>
        <title>My Orders</title>
      </Head>
      <OrderCard orders={orders} />
    </>
  );
};

export default myorders;
