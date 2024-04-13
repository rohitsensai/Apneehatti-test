import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const ImageCarousel = () => {
  const images = [
    '/images/banner/banner-9.jpg',
    '/images/banner/banner1.jpeg',
   
  ];

  return (
    <Carousel className='mx-4'
      autoPlay={true}
      interval={3000} // Auto-play interval in milliseconds (3 seconds)
      infiniteLoop={true} // Infinite loop
      showThumbs={false} // Hide thumbnail navigation
      showArrows={false} // Show navigation arrows
    >
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;

