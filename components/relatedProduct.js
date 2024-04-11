import Link from "next/link";
import Product from "./card";

const RelatedProduct = ({ relatedProducts, category }) => {
  return (
    <div className="">
      <h1 className="text-xl font-medium">
        <span className="border-b-4 inline-block w-48 pb-1 border-green-400">
          Related Products
        </span>
      </h1>
      <div>
        <div className="grid gap-2 xs:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-5">
          {relatedProducts?.length > 0 &&
            relatedProducts?.map((item, idx) => (
              <Product
                key={item._id + "related"}
                product={{
                  id: item._id,
                  title: item.name,
                  price: item.price,
                  MRP: item.MRP,
                  category: item.category_id.name,
                  image: item.images[0],
                  alt_text: item.alt_text,
                }}
              />
            ))}
        </div>
        {/* <div className="flex justify-end">
          <Link href={{ pathname: "/search", query: { category } }}>
            <button className="btn1 max-w-[200px]">Show more</button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default RelatedProduct;
