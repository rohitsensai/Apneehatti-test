import { Rating } from "flowbite-react";
import Link from "next/link";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import CurrencyFormatter from "../helper/currencyFormatter";
import { motion } from "framer-motion";
import Image from "next/image";

const wishlistCard = ({ product, removeFromWishlist }) => {
  const dispatch = useDispatch();
  const {
    _id: id,
    images,
    category,
    name: title,
    price,
    MRP,
    alt_text,
  } = product;

  return (
    <motion.div
      layout
      key={id}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white border border-gray-50 shadow group  overflow-hidden"
    >
      <div className="h-[220px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          {/* image */}
          <Link
            href={{
              pathname: `/product-detail/[title]`,
              query: { title: title, pid: id },
            }}
            passHref
          >
            <a target="_blank" rel="noopener noreferrer">
              <div className="relative w-40 h-40 mx-auto flex justify-center items-center">
                <Image
                  src={images[0]}
                  layout="fill"
                  objectFit="contain"
                  alt={alt_text}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={images[0]}
                />
              </div>
            </a>
          </Link>
        </div>
        {/* buttons */}
        <div className="absolute  top-2 -right-11 group-hover:right-1 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button>
            <div className="flex justify-center items-center text-red-500 font-bold w-12 h-12 bg-red-200 border-2 border-red-400">
              <BsTrash
                className="text-xl"
                onClick={() => removeFromWishlist(id)}
              />
            </div>
          </button>
        </div>
      </div>
      {/* category & title & MRP */}
      <div className="px-5 pb-4 relative">
        <div className="text-xs capitalize text-gray-500 mb-1">{category}</div>
        <Link
          href={{
            pathname: `/product-detail/[title]`,
            query: { title: title, pid: id },
          }}
          passHref
        >
          <a target="_blank" rel="noopener noreferrer">
            <h2 className="text-xs font-semibold mb-1 line-clamp-2">{title}</h2>
          </a>
        </Link>
        <div>
          <Rating>
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star filled={false} />
          </Rating>
        </div>
        <div className="font-semibold">
          <CurrencyFormatter price={MRP} />
        </div>
      </div>
    </motion.div>
  );
};

export default wishlistCard;
