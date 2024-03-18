import React from "react";

function currencyFormatter({ price }) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0, // Set maximumFractionDigits to 0 to round to nearest whole number
    style: "currency",
    currency: "INR",
  }).format(Math.round(price)); // Use Math.round() to round the price
}

export default currencyFormatter;
