const calculateAverageRating = (reviews) => {
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
      const averageRating = totalRating / reviews.length;
      return parseInt(averageRating);
    } else {
      return 0;
    }
  };
  
  export default calculateAverageRating;
  