import main from "../../../database/conn";
import Order from "../../../model/orderSchema";
import User from "../../../model/userSchema";
import Product from "../../../model/productSchema";
import Coupon from "../../../model/couponSchema";
import Address from "../../../model/userAddressSchema";
import Cart from "../../../model/cartSchema";

import jwt from "jsonwebtoken";

const Create = async (req, res) => {
  // Connect to database
  await main().catch((err) => console.error(err));
  // Destructure the request body
  const {
    user_id,
    order_items,
    payment_method,
    shipping_price,
    shipping_address,
    total,
    transaction_id,
    coupon,
    courier_company_id,
    discount,
    total_weight,
  } = req.body;

  // Get user ID from token
  const token = req.headers.authorization.split(" ")[1];
  const token_data = await jwt.verify(token, process.env.JWT_KEY);
  console.log("tkoen",token,token_data)
  let coupon_data;
  // Check for valid token
  if (!token_data.id) {
    res.status(401).json({ error: "Invalid token" });
  } else {
    // Check for valid order
    console.log("shipping price",shipping_price)
    const cart = await Cart.find({ user_id: token_data.id });

    if (!cart) {
      console.log("invalid order !cart")
      res.status(500).json({ error: "Invalid order" });
    } else {
      let order_total = Number(cart[0].subtotal);
      if (coupon) {
        coupon_data = await Coupon.findById(coupon);
        if (coupon_data.discount_percent > 0) {
          const discount_price = Math.floor(
            (coupon_data.discount_percent * order_total) / 100
          );

          order_total = order_total - discount_price;
        } else {
          order_total = order_total - coupon_data.flat_discount;
        }
      }
    
      order_total += shipping_price;
      console.log("order total",order_total,total)
      if (total != order_total) {
        return res
          .status(400)
          .json({ message: "Invalid Order. Please try again." });
      }
      // Create order

      console.log("creating order...........")
      console.log("body",req.body)
      console.log(order_items)
      console.log(payment_method)
      console.log(payment_method)
      console.log(Number(cart[0].subtotal))
      console.log(discount)
      console.log(order_total)
      console.log(transaction_id)
      console.log(transaction_id)
      console.log(shipping_address)
      console.log(courier_company_id)
      console.log(coupon)
      // console.log()
      const order = await Order.create({
        user_id,
        order_items,
        payment_method,
        subtotal: cart[0].subtotal,
        discount,
        total: order_total,
        isPaid: transaction_id ? true : false,
        transaction_id,
        shipping_price,
        shipping_address,
        courier_company_id,
        coupon,
        total_weight,
      });
      console.log("order",order)
      const ordered_obj = await Order.findById(order._id)
        .populate("shipping_address")
        .populate({ path: "user_id", select: "fullname email mobile" })
        .populate("coupon")
        .populate("transaction_id");

      const authResponse = await fetch(
        "https://apiv2.shiprocket.in/v1/external/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: process.env.SHIPROCKET_API_EMAIL,
            password: process.env.SHIPROCKET_API_PASS,
          }),
        }
      );

      const auth = await authResponse.json();

      console.log("auth",auth)

      const initialDate = ordered_obj.createdAt;
      const dateObject = new Date(initialDate);

      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, "0");
      const day = String(dateObject.getDate()).padStart(2, "0");
      const hours = String(dateObject.getHours()).padStart(2, "0");
      const minutes = String(dateObject.getMinutes()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

      const shiprocket_order_raw = {
        order_id: ordered_obj._id.toString(),
        order_date: formattedDate,
        pickup_location: "Office",
        channel_id: "",
        comment: "Reseller: Apneehatti",
        billing_customer_name: ordered_obj.shipping_address.fullname,
        billing_last_name: "",
        billing_address: ordered_obj.shipping_address.address_line,
        billing_address_2: "",
        billing_city: ordered_obj.shipping_address.city,
        billing_pincode: ordered_obj.shipping_address.postal_code,
        billing_state: ordered_obj.shipping_address.state,
        billing_country: "India",
        billing_email: ordered_obj.shipping_address.email,
        billing_phone: ordered_obj.shipping_address.mobile,
        shipping_is_billing: true,
        shipping_customer_name: "",
        shipping_last_name: "",
        shipping_address: "",
        shipping_address_2: "",
        shipping_city: "",
        shipping_pincode: "",
        shipping_country: "",
        shipping_state: "",
        shipping_email: "",
        shipping_phone: "",
        order_items: ordered_obj.order_items.map((item) => ({
          name: item.title,
          sku: item.SKU,
          units: Number(item.quantity),
          selling_price: item.price,
        })),
        payment_method: ordered_obj.payment_method != "cod" ? "Prepaid" : "COD",
        shipping_charges: ordered_obj.shipping_price,
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: Number(ordered_obj.discount),
        sub_total: Number(ordered_obj.subtotal),
        length: 0.5,
        breadth: 0.5,
        height: 0.5,
        weight: Number(ordered_obj.total_weight),
      };

      const shiprocket_order = await fetch(
        `https://apiv2.shiprocket.in/v1/external/orders/create/adhoc`,
        {
          method: "POST",
          redirect: "follow",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(shiprocket_order_raw),
        }
      );

      // Update coupon useby field
      if (coupon != null) {
        await Coupon.updateOne({ _id: coupon }, { $push: { useby: user_id } });
      }
      const user = await User.findById(user_id, { fullname: 1, email: 1 });
      const shippingAddress = await Address.findById(shipping_address);

      // // Send confirmation email
      const sendConfirmationMail = fetch(
        `${process.env.HOST}/api/confirmation/email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shippingAddress,
            user: user.fullname,
            order,
            email: user.email,
          }),
        }
      );

      if (coupon) {
        const sendConfirmationMailToRefer = fetch(
          `${process.env.HOST}/api/confirmation/refer`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              referral_email: coupon_data.refer_by,
              coupon_code: coupon_data.coupon_code,
              discount:
                coupon_data.discount_percent > 0
                  ? coupon_data.discount_percent + "%"
                  : coupon_data.flat_discount,
              user: user.fullname,
            }),
          }
        );
      }

      console.log("order _ id")
      // Return order ID
      return res.status(201).json({
        id: order._id,
      });
    }
  }
};

export default Create;
