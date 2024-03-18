const calculateDiscount = (originalPrice, discountedPrice) => {
    const discount = originalPrice - discountedPrice;
    const discountPercentage = (discount / originalPrice) * 100;
    return parseInt(discountPercentage);
  };
  
  export default calculateDiscount;
  