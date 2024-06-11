import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const ImageCarousel = () => {
  const images = [
    '/images/banner/1.png',
    
   
  ];

  return (
    <a href='/' className=''>
            
    <Carousel className='mx-4'
    
      autoPlay={true}
      interval={3000} // Auto-play interval in milliseconds (3 seconds)
      infiniteLoop={true} // Infinite loop
      showThumbs={false} // Hide thumbnail navigation
      showArrows={true} // Show navigation arrows
    >
     
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} className='rounded' alt={`Slide ${index + 1}`} />
        </div>
      ))}
     
    </Carousel>
    </a>
  );
};

export default ImageCarousel;

