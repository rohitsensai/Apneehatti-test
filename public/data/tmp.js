const fs = require('fs');
const products = require('./handcrafts.json');  // Assuming handcrafts.json is in the same directory

// Map over each product and add main_image property
const productsWithMainImage = products.map(product => {
  // Check if images array exists and has at least one image
  if (product.images && product.images.length > 0) {
    // Add main_image as the first image in the images array
    product.main_image = product.images[0];
  } else {
    // Set main_image to an empty string if images array doesn't exist or is empty
    product.main_image = "";
  }
  
  
  return product;
});

// Optional: Save the updated products back to handcrafts.json
fs.writeFile('./handcrafts.json', JSON.stringify(productsWithMainImage, null, 2), err => {
  if (err) {
    console.error('Error saving products:', err);
  } else {
    console.log('Products updated and saved successfully.');
  }
});
