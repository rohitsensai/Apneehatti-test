import { getSession } from "next-auth/react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import dynamic from "next/dynamic";

const WishlistCard = dynamic(() => import("../components/wishlistCard"), {
  ssr: false,
});

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const data = await fetch(`${process.env.HOST}/api/users/wishlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session && session.user.accessToken}`,
    },
  });
  const res = await data.json();
  return {
    props: {
      wishlistPro: res,
    },
  };
}

const Wishlist = ({ wishlistPro }) => {
  const { data: session, status } = useSession();

  const [wishlistProduct, setWishlistProduct] = useState(wishlistPro);
  const removeFromWishlist = async (id) => {
    const data = await fetch(`/api/users/product/removefromwishlist`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session && session.user.accessToken}`,
      },
      body: JSON.stringify({ id }),
    });
    const res = await data.json();
    setWishlistProduct(res);
  };

  return (
    <>
      <Head>
        <title>Wishlist</title>
      </Head>
      <div className="container p-4 mx-auto">
        <h1 className="text-xl font-semibold">Wishlist</h1>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 p-5">
          {wishlistProduct.map((product) => (
            <WishlistCard
              key={product._id}
              product={product}
              removeFromWishlist={removeFromWishlist}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
