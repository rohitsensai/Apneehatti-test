import React from 'react'
import ProductSkeleton from './cardSkeleton'
import Image from 'next/image';
import { HiArrowCircleLeft } from 'react-icons/hi';
import { HiArrowCircleRight } from 'react-icons/hi';
import Slider from 'react-slick';
import Product from './card';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';

function BannerandProduct({slider,products,image,name}) {
    
    let { loading } = useSelector((state) => state.products);

    var settings = {
        arrows: false,
        dots: false,
        // pauseOnHover:true,
        infinite: true,
        speed: 300,
        autoplay: true,
        autoplaySpeed: 6000,
        slidesToShow: 5,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
              // autoplay:true,
              // speed: 8000
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
    
    

    useEffect(() => {
        slider.current.slickPlay();
       
    
        // Call the fetchData function when the component mounts
      }, []);
  return (
    <div>
          <div className="w-full ">
            <Image
              src={image}
              layout="responsive"
              width={1840} // Use the actual width of your image
              height={400} // Use the actual height of your image
              alt=" banner"
              loading="lazy"
              blurDataURL={image}
              placeholder="blur"
            />
          </div>

          <div className="relative">
     
            <div className="py-2 px-2 md:p-8 rounded my-sm-4 bg-white  mx-sm-4 ">
              <div className="flex justify-between items-center ">
                <div className="py-4" style={{ width: "100%" }}>
                  <h3 className="text-center text-2xl font-semibold uppercase mb-2">
                    {name}
                  </h3>

                  <h3 className="text-center text-gray-500" style={{ fontSize: "14px" }}>
                    Grab It Fast | Sale Is Live
                  </h3>

                </div>
                <div className="md:hidden d-none w-20 flex justify-between items-center">
                  <button onClick={() => slider.current.slickPrev()}>
                    <HiArrowCircleLeft className="text-3xl" />
                  </button>

                  <button onClick={() => slider.current.slickNext()}>
                    <HiArrowCircleRight className="text-3xl" />
                  </button>
                </div>
              </div>

              <div className="w-10/12 md:w-full  mx-auto" >
                <Slider
                  ref={(slider)}
                  {...settings}
                >
                  {!loading && products.length > 0
                    ? [...products, ...products].map((item) => (
                      <Product
                        key={item._id}
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
                    ))
                    : Array.from({ length: 5 }, (_, i) => i + 2).map((i) => (
                      <ProductSkeleton key={i} />
                    ))}

                </Slider>
              </div>
            </div>
          
          </div>
    </div>
  )
}

export default BannerandProduct
