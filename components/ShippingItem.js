import React from "react";
import CurrencyFormatter from "../helper/currencyFormatter";

const ShippingItem = ({
  id,
  name,
  estimate_delivery_date,
  charges,
  setAddress,
}) => {
  const shp = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0, // Set maximumFractionDigits to 0 to round to nearest whole number
    style: "currency",
    currency: "INR",
  }).format(Math.round(charges));
  return (
    <div className="flex p-3 border justify-between items-center" key={id}>
      <div className="flex">
        <div className="flex items-center h-5">
          <input
            id={`helper-radio-${id}`}
            aria-describedby={`helper-radio-text-${id}`}
            type="radio"
            name="shp"
            onChange={(e) =>
              setAddress((prev) => ({
                ...prev,
                shipping_price: Math.round(charges),
                courier_company_id: id,
              }))
            }
            value={Math.round(charges)}
            required
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="ml-2 text-sm">
          <label
            for={`helper-radio-${id}`}
            className="font-medium text-gray-900 dark:text-gray-300"
          >
            {name}
          </label>
          <p
            id={`helper-radio-text-${id}`}
            className="text-xs font-normal text-gray-500 dark:text-gray-300"
          >
            Estimate Delivery Date {estimate_delivery_date}
          </p>
        </div>
      </div>
      <div className="ml-2 text-sm">
        <p id={`helper-radio-text-${id}`} className="text-md font-bold ">
          {shp}
        </p>
      </div>
    </div>
  );
};

export default ShippingItem;
