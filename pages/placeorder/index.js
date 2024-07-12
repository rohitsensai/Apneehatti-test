import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormatter from "../../helper/currencyFormatter";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useRazorpay from "react-razorpay";
import { getSession } from "next-auth/react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Button, Modal } from "flowbite-react";
import { toast } from "react-toastify";
import countryState from "../../database/country-states.json";
import Head from "next/head";
import { clearCart } from "../../slices/cart";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { initialCart } from "../../slices/cart";


export async function getServerSideProps({ req }) {
  // Check if the user is authenticated, if not redirect to login page
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  // Fetch user's saved addresses from the database
  const res = await fetch(
    `${process.env.HOST}/api/address/user/${session.user.id}`
  );
  let saved_address = await res.json();
  const checkSavedAddress = saved_address instanceof Array;
  if (!checkSavedAddress) {
    saved_address = [];
  }
  // Filter the enabled addresses and set the Razorpay key

  const RAZORPAY_KEY = process.env.RAZORPAY_KEY_ID;

  // Return the fetched data as props
  return {
    props: {
      saved_address: saved_address,
      RAZORPAY_KEY: RAZORPAY_KEY,
    },
  };
}

const PlaceOrder = ({ saved_address, RAZORPAY_KEY }) => {
  const { cartItems, total, subtotal } = useSelector(
    (state) => state.cart
  );
  const [shipping, setShipping] = useState(0)

  const { data: session, status } = useSession();
  const router = useRouter();
  const Razorpay = useRazorpay();
  const dispatch = useDispatch();

  const initialValues = {
    token: session && session.user.accessToken,
    user_id: session && session.user.id,
    fullname: "",
    address_line: "",
    mobile: "",
    state: "",
    country: "",
    city: "",
    postal_code: "",
    email: session && session.user.email,
    payment_method: "netbanking",
    shipping_price: shipping,
    order_items: cartItems,
    total: total,
    transaction_id: null,
    shipping_address: "",
    coupon: "",
    discount: 0,
  };
  const [address, setAddress] = useState(initialValues);
  const [pickedaddress, setPickedaddress] = useState("");
  const [coupon_code, setCoupon_code] = useState("");
  const [discount, setDiscount] = useState(0);
  const [savedAddress, setSavedAddress] = useState(saved_address);
  const [savedAddressId, setSavedAddressId] = useState();
  const [editAddressModalOpen, setEditAddressModalOpen] = useState(false);
  const [countryCode, setCountryCode] = useState(countryState.states["IN"]);
  const [toggleAddNewAddress, setToggleAddNewAddress] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showCouponField, setShowCouponField] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const handleInputChange = (e) => {
    e.preventDefault();
    const formElement = e.target.closest("form");
    const form_data = new FormData(formElement);
    const formData = Object.fromEntries(form_data);
    setAddress((prevAddress) => ({
      ...prevAddress,
      ...formData,
    }));
    setFormSubmitted(true);
  };

  const clearCartFun = async () => {
    const data = await fetch(`/api/cart/${session.user.id}/clear`, {
      method: "Delete",
    });
  };


  const minus = async (id) => {
    console.log("id=", id)
    const data = await fetch(`/api/cart/${session.user.id}/minus`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ product_id: id, quantity: 1 }),
    });

    if (data.ok) {
      const response = await data.json();
      if (response) {
        const savedcart = response.items;
        const initialCartObj = {
          savedcart,
          shipping: response.shipping,
          subtotal: response.subtotal,
          total: response.total,
        };
        dispatch(initialCart(initialCartObj));
      }
    }
  };

  const add = async (id) => {
    const data = await fetch(`/api/cart/${session.user.id}/add`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ product_id: id, quantity: 1 }),
    });
    if (data.ok) {
      const response = await data.json();
      if (response) {
        const savedcart = response.items;
        const initialCartObj = {
          savedcart,
          shipping: response.shipping,
          subtotal: response.subtotal,
          total: response.total,
        };
        dispatch(initialCart(initialCartObj));
      }
    }
  };


  const createOrderFun = async (address) => {
    console.log("transaction id", address.transaction_id)
    console.log("shippingprice", address.shipping_price)
    try {
      const res = await fetch(`/api/orders/create`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session && session.user.accessToken}`,
        },
        method: "POST",
        body: JSON.stringify({
          user_id: address.user_id,
          order_items: cartItems,
          payment_method: address.payment_method,
          shipping_price: address.shipping_price,
          total: address.total + address.shipping_price,
          transaction_id: address.transaction_id,
          shipping_address: address.shipping_address,
          coupon: address.coupon ? address.coupon : null,
          discount: discount,
        }),
      });
      const response = await res.json();
      console.log("response", response)
      if (response.status == "ok" || response.id != undefined) {
        toast.success("Thank you for placing your order");
        clearCartFun();
        router.push(`/placeorder/ordered/${response.id}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("error", error)
      toast.error("Something went wrong, try again");
    }
  };

  // Razorpay integration
  const razorpayHandler = useCallback(
    async (address, accessToken) => {
      const res = await fetch(`/api/payment/createPaymentOrder`, {
        headers: {
          "Content-Type": "application/json",
        },
        Authorization: `Bearer ${accessToken}`,
        method: "POST",
        body: JSON.stringify({ total: address.total }),
      });
      const data = await res.json();
      if (data) {
        const options = {
          key: RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
          amount: data.amount,
          currency: "INR",
          name: "Apneehatti Pvt Ltd",
          description: "Test Transaction",
          image: "https://apneehatti.com/images/logo/apneehatti_logo.svg",
          order_id: data.id,
          handler: async function (paymentResults) {
            if (paymentResults) {
              const res = await fetch("/api/payment/validation", {
                headers: {
                  "Content-Type": "application/json",
                },
                Authorization: `Bearer ${accessToken}`,
                method: "POST",
                body: JSON.stringify(paymentResults),
              });
              const data = await res.json();
              if (data.transaction) {
                const transcationId = data.transaction._id;
                address.transaction_id = await transcationId;
                createOrderFun(address);
              }
            }
          },
          prefill: {
            name: address.fullname,
            email: "",
            contact: address.mobile,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
      }
    },
    [Razorpay]
  );
  const createOrder = async () => {
    toast.info("Order processing in progress");
    setDisableBtn(!disableBtn);
    const data = await fetch("/api/address/create", {
      method: "POST",
      body: JSON.stringify(address),
    });
    const response = await data.json();
    if (response) {
      try {
        var shipping_add = await response.shipping_address;
        address.shipping_address = await shipping_add;
        if (address.payment_method === "netbanking") {
          razorpayHandler(address, session && session.user.accessToken);
        } else {
          createOrderFun(address);
        }
        setDisableBtn(!disableBtn);
      } catch (error) {
        toast.success({ error });
        setDisableBtn(!disableBtn);
      }
    }
  };

  const createOrderWithoutAddress = async () => {
    // address.shipping_address = await savedAddressId;
    if (address.shipping_address) {
      if (address.payment_method === "netbanking") {
        razorpayHandler(address, session && session.user.accessToken);
      } else {
        createOrderFun(address);
      }
    } else {
      toast.warning("Please add address");
    }
  };

  const deleteAddressById = async (id) => {
    const data = await fetch(`/api/address/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ enable: false }),
    });
    const res = data.json();
    if (res.error) {
      toast.error(res.error);
    } else {
      setSavedAddress(savedAddress.filter((item) => item._id !== id));
      toast.success("Address deleted successfully");
    }
  };

  const updateAddress = async (id, e) => {
    e.preventDefault();
    setEditAddressModalOpen(false);
    const formData = new FormData(e.target);
    formData.append("user_id", address.user_id);
    formData.append("email", address.email);
    const form_data = Object.fromEntries(formData);

    const data = await fetch(`/api/address/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form_data),
    });
    const res = await data.json();
    if (res.error) {
      toast.error(res.error);
    } else {
      setSavedAddress([...res]);
      toast.success("Address updated successfully");
    }
  };

  const couponHandler = (e) => {
    const val = e.target.value;
    if (!val) {
      setShowCouponField(false);
    }
  };

  const isCouponValid = async () => {
    const orderIds = await cartItems.map((x) => x.id);
    const orderQty = await cartItems.map((x) => ({
      id: x.id,
      quantity: x.quantity,
    }));

    const data = await fetch(`/api/coupon/validateCoupon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session && session.user.accessToken}`,
      },
      body: JSON.stringify({
        order_qty: orderQty,
        order_items: orderIds,
        shipping_price: address.shipping_price,
        coupon_code: coupon_code,
        subtotal: subtotal,
      }),
    });

    const res = await data.json();
    if (res._id) {
      setAddress({
        ...address,
        total: res.discounted_price,
        discount: res.discount,
        coupon: res._id,
      });
      setDiscount(res.discount);
    }

    if (res.message) {
      toast.error(res.message);
      setShowCouponField(false);
      document.getElementById("discount").value = "";
    } else {
      toast.success("Coupon is applied");
    }
  };

  useEffect(() => {
    if (total == 0) {
      router.push("/search?category=all");
    }
    setAddress({
      ...address,
      total:
        total != 0 && total - subtotal !== shipping ? total + shipping : total,
      discount: 0,
      order_items: cartItems,
    });
    setDiscount(0);
  }, [total]);

  useEffect(() => {
    if (formSubmitted) {
      savedAddress.length > 0 && toggleAddNewAddress
        ? createOrderWithoutAddress()
        : createOrder();
      setFormSubmitted(false);
    }


  }, [formSubmitted]);

  useEffect(() => {
    const state = pickedaddress.state;
    const pincode = pickedaddress.postal_code
    const newShippingPrice = (state === 'Himachal Pradesh') ? 50 : 70;
    setAddress(prevAddress => ({
      ...prevAddress,
      shipping_price: newShippingPrice
    }));
  }, [pickedaddress])
  console.log("picked=", pickedaddress)

  useEffect(() => {
    if (session === null) {
      router.push('/');
    }
  }, [session])


  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <div className="lg:grid grid-cols-2 bg-white border mx-0 mx-sm-40 rounded">
        <div className="mx-5 my-5 lg:mx-20 lg:my-15 relative   rounded ">
          <form onSubmit={(e) => handleInputChange(e)}>
            {savedAddress && savedAddress.length > 0 && toggleAddNewAddress ? (
              <div className="">
                <div className="flex justify-between items-center">
                  <div className="text-lg  py-5 w-full  md:flex justify-between items-baseline">
                    <h1> Choose shipping address </h1>
                    <button
                      className="text-green-500 font-medium block md:inline-block text-sm top-6 capitalize  right-2"
                      type="button"
                      onClick={() =>
                        setToggleAddNewAddress(!toggleAddNewAddress)
                      }
                    >
                      {savedAddress &&
                        savedAddress.length > 0 &&
                        !toggleAddNewAddress
                        ? "Back to saved address"
                        : "Add new address"}
                    </button>
                  </div>
                </div>

                <div className="p-2 mb-2 grid grid-cols-1 md:grid-cols-2 gap-2 items-start ">
                  {savedAddress.map((item) => (
                    <label
                      htmlFor={item._id}
                      key={item._id}
                      className="border shadow-lg p-5 focus:outline-none focus:ring focus:ring-green-300 focus:bg-green-100 text-justify w-full rounded"
                      onClick={() => setPickedaddress(item)}
                    >
                      <div className="flex justify-between items-center text-sm font-extrabold ">
                        <h5 className="flex gap-x-2 items-center">
                          <input
                            id={item._id}
                            type="radio"
                            name="shipping_address"
                            value={item._id}
                          />
                          Address
                        </h5>{" "}
                        <div className="flex items-center">
                          <MdEdit
                            className="text-lg mr-2"
                            onClick={() => {
                              setEditAddressModalOpen(true);
                              setSavedAddressId(item._id);
                            }}
                          />
                          <MdDelete
                            className="text-lg"
                            onClick={() => deleteAddressById(item._id)}
                          />
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 p-2 leading-6">
                        <h6>{item?.fullname}</h6>
                        <h6>{item.email}</h6>
                        <h6 className=" text-justify ">
                          {item.address_line +
                            ", " +
                            item.city +
                            ", " +
                            item.postal_code +
                            ", " +
                            item.country}
                        </h6>
                        <h6>{item.mobile}</h6>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="">
                  <h4 className="text-lg  py-5 md:flex justify-between items-baseline">
                    Contact Information{" "}
                    <button
                      className="text-green-500 font-medium block md:inline-block text-sm top-6 capitalize  right-2"
                      type="button"
                      onClick={() =>
                        setToggleAddNewAddress(!toggleAddNewAddress)
                      }
                    >
                      {!toggleAddNewAddress
                        ? "Back to saved address"
                        : "Add new address"}
                    </button>
                  </h4>
                  <div className="mb-6">
                    <label
                      htmlFor="fullname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="mobile_number"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Mobile number
                    </label>
                    <input
                      pattern="^\+\d{1,2}\d{3,}\d{3,}\d{3,}$"
                      title="Please enter a valid phone number."
                      type="number"
                      id="mobile_number"
                      name="mobile"
                      className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                      required
                    />
                  </div>
                </div>
                <div className="">
                  <h4 className="text-lg  py-5">Shipping address</h4>
                  <div className="mb-6">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address_line"
                      className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5 mb-6">
                    <div className="">
                      <label
                        htmlFor="city"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                        required
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="state"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        State / Province
                      </label>
                      <select
                        id="state"
                        name="state"
                        required
                        className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                      >
                        {countryCode.map((item, index) => (
                          <option key={item.code} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="">
                      <label
                        htmlFor="postal_code"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Postal code
                      </label>
                      <input
                        type="number"
                        name="postal_code"
                        id="postal_code"
                        className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                        required
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="country"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Country
                      </label>
                      <select
                        name="country"
                        id="country"
                        onChange={(e) => {
                          var country_code = e.target.value;
                          setCountryCode(
                            countryState.states[country_code.split(",")[0]]
                          );
                        }}
                        required
                        className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                      >
                        {Object.entries(countryState.country).map(
                          (value, index) => (
                            <option
                              value={`${value}`}
                              key={value.splice(0, 2)[0]}
                            >
                              {value.splice(0, 2)[1]}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="bg-white">
            <div >Add Promotional Code</div>
            <div className="relative flex">
              <input
                onBlur={(e) => couponHandler(e)}
                onClick={() => setShowCouponField(true)}
                type="text"
                name="discount"
                onChange={(e) => setCoupon_code(e.target.value)}
                id="discount"
                className="text-center text-sm rounded-l-lg focus:ring-green-500 focus:shadow focus:border-none border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-none"
              />

              <button
                type="button"
                onClick={isCouponValid}
                className="w-auto px-5 flex items-center justify-center rounded-r-lg text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium border-2 border-green-700 text-sm dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
              >
                Apply
              </button>
            </div>
            </div>


            <div className="rounded shadow px-5 py-2 ">
              <h4 className="text-lg py-4 ">Payment Details</h4>
              <div className="grid grid-cols-1 space-y-3 md:space-y-0 md:grid-cols-2">
                <div className="flex items-center ">
                  <input
                    id="online"
                    type="radio"
                    value="netbanking"
                    name="payment_method"
                  />
                  <label
                    htmlFor="online"
                    className="ml-2 flex items-center cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    <svg
                      aria-hidden="true"
                      className="mr-2 -ml-1 w-10 h-3"
                      viewBox="0 0 660 203"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M233.003 199.762L266.362 4.002H319.72L286.336 199.762H233.003V199.762ZM479.113 8.222C468.544 4.256 451.978 0 431.292 0C378.566 0 341.429 26.551 341.111 64.604C340.814 92.733 367.626 108.426 387.865 117.789C408.636 127.387 415.617 133.505 415.517 142.072C415.384 155.195 398.931 161.187 383.593 161.187C362.238 161.187 350.892 158.22 333.368 150.914L326.49 147.803L319.003 191.625C331.466 197.092 354.511 201.824 378.441 202.07C434.531 202.07 470.943 175.822 471.357 135.185C471.556 112.915 457.341 95.97 426.556 81.997C407.906 72.941 396.484 66.898 396.605 57.728C396.605 49.591 406.273 40.89 427.165 40.89C444.611 40.619 457.253 44.424 467.101 48.39L471.882 50.649L479.113 8.222V8.222ZM616.423 3.99899H575.193C562.421 3.99899 552.861 7.485 547.253 20.233L468.008 199.633H524.039C524.039 199.633 533.198 175.512 535.27 170.215C541.393 170.215 595.825 170.299 603.606 170.299C605.202 177.153 610.098 199.633 610.098 199.633H659.61L616.423 3.993V3.99899ZM551.006 130.409C555.42 119.13 572.266 75.685 572.266 75.685C571.952 76.206 576.647 64.351 579.34 57.001L582.946 73.879C582.946 73.879 593.163 120.608 595.299 130.406H551.006V130.409V130.409ZM187.706 3.99899L135.467 137.499L129.902 110.37C120.176 79.096 89.8774 45.213 56.0044 28.25L103.771 199.45L160.226 199.387L244.23 3.99699L187.706 3.996"
                        fill="#0E4595"
                      />
                      <path
                        d="M86.723 3.99219H0.682003L0 8.06519C66.939 24.2692 111.23 63.4282 129.62 110.485L110.911 20.5252C107.682 8.12918 98.314 4.42918 86.725 3.99718"
                        fill="#F2AE14"
                      />
                    </svg>
                    Net-banking
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="offline"
                    type="radio"
                    value="cod"
                    name="payment_method"
                  />
                  <label
                    htmlFor="offline"
                    className="flex items-center cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Cash on delivery
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex items-end justify-end py-4">
              <div className="d-flex  flex-row justify-center align-items-center">
                <button
                  type="submit"
                  disabled={disableBtn}
                  className="flex items-center text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium border-2 border-green-700 text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                >
                  Checkout
                  <svg
                    aria-hidden="true"
                    className="ml-2 -mr-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>{" "}
                  </svg>
                </button>

              </div>
            </div>

          </form>

        </div>


        <div className="hidden lg:block p-16 ">

          <div
            className="mb-3 max-h-[500px] overflow-y-scroll shadow"
            id="scrollbar_container"
          >
            {cartItems.length > 0 &&
              cartItems.map((item) => (
                <div className="py-2 flex justify-between bg-white border-2 border-black my-2 rounded" key={item.id}>
                  <div className="flex w-full justify-between items-start">
                    <div className=" bg-white  rounded  flex justify-between ">
                      <div className="relative h-16 w-24 ">
                        <Image
                          src={item.thumbnail}
                          layout="fill"
                          objectFit="contain"
                          alt={item.alt_text}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={item.thumbnail}
                        />
                      </div>
                    </div>
                    <div className="px-2 py-1 w-full d-flex flex-column ">
                      <h5 className="capitalize line-clamp-2 font-medium text-sm mb-1">
                        {item.title}
                      </h5>
                      <h4 className="d-flex justify-content-start flex-row  w-full font-medium">
                        <CurrencyFormatter price={item.price * item.quantity} />
                      </h4>
                    </div>
                    <div className="flex flex-1   items-center h-full text-primary font-medium  mx-2">
                      {/* Minus icon */}
                      <div
                        onClick={() => minus(item.id)}
                        className="flex justify-center items-center cursor-pointer rounded-full bg-gray-300"
                        style={{ width: '30px', height: '30px' }}
                      >
                        <IoMdRemove style={{ color: 'black', fontSize: '20px' }} />
                      </div>

                      {/* Quantity display */}
                      <div className="mx-2">
                        {item.quantity}
                      </div>
                      {/* Plus icon */}
                      <div
                        onClick={() => add(item.id)}
                        className="flex justify-center items-center cursor-pointer rounded-full bg-gray-300"
                        style={{ width: '30px', height: '30px' }}
                      >
                        <IoMdAdd style={{ color: 'black', fontSize: '20px' }} />
                      </div>
                    </div>


                  </div>
                </div>
              ))}
          </div>
          <div className="mt-6 shadow rounded bg-white  border-2 border-black px-2">
            <h2 style={{ fontWeight: "800" }}>Payment Details</h2>
            <div className="py-2 leading-8">
              <div className="flex justify-between items-center ">
                <h5 className="">Subtotal</h5>
                <h5 className="">
                  <CurrencyFormatter price={subtotal} />
                </h5>
              </div>
              <div className="flex justify-between items-center ">
                <h5 className="">Discount</h5>
                <h5 className="">
                  &nbsp;
                  <CurrencyFormatter price={discount} />
                </h5>
              </div>
              <div className="flex justify-between items-center ">
                <h5 className="">Shipping</h5>
                <h5 className="">
                  {" "}
                  <CurrencyFormatter price={address.shipping_price} />
                </h5>
              </div>
            </div>
            <div className="flex font-medium justify-between items-center ">
              <h4 className="font-semibold">Total</h4>
              <h4 className="font-bold">
                {" "}
                <CurrencyFormatter price={address.total + address.shipping_price} />
              </h4>
            </div>

          </div>


        </div>

        <Modal
          show={editAddressModalOpen}
          size="2xl"
          popup={true}
          onClose={() => setEditAddressModalOpen(false)}
        >
          <div className="p-5">
            <Modal.Header>Edit address</Modal.Header>
            <Modal.Body>
              {savedAddress
                .filter((address) => address._id == savedAddressId)
                .map((address) => (
                  <div key={address._id}>
                    <form onSubmit={(e) => updateAddress(address._id, e)}>
                      <div>
                        <div className="">
                          <h4 className="text-lg  py-4">Contact Information</h4>
                          <div className="grid grid-cols-2 gap-x-2">
                            <div className="">
                              <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Fullname
                              </label>
                              <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                defaultValue={address.fullname}
                                className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                required
                              />
                            </div>
                            <div className="">
                              <label
                                htmlFor="mobile_number"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Mobile number
                              </label>
                              <input
                                type="number"
                                id="mobile_number"
                                pattern="^\+\d{1,2}\d{3,}\d{3,}\d{3,}$"
                                title="Please enter a valid phone number."
                                name="mobile"
                                defaultValue={address.mobile}
                                className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <h4 className="text-lg  py-4">Shipping address</h4>
                          <div className="mb-6">
                            <label
                              htmlFor="address"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              id="address"
                              name="address_line"
                              defaultValue={address.address_line}
                              className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-5 mb-6">
                            <div className="">
                              <label
                                htmlFor="city"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                City
                              </label>
                              <input
                                type="text"
                                id="city"
                                defaultValue={address.city}
                                name="city"
                                className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                required
                              />
                            </div>
                            <div className="">
                              <label
                                htmlFor="state"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                State / Province
                              </label>
                              <select
                                id="state"
                                name="state"
                                required
                                defaultValue={address.state}
                                className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                              >
                                {countryCode.map((item, index) => (
                                  <option key={item.code} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="">
                              <label
                                htmlFor="postal_code"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Postal code
                              </label>
                              <input
                                type="number"
                                name="postal_code"
                                defaultValue={address.postal_code}
                                id="postal_code"
                                className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                required
                              />
                            </div>
                            <div className="">
                              <label
                                htmlFor="country"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Country
                              </label>
                              <select
                                name="country"
                                id="country"
                                onChange={(e) => {
                                  var country_code = e.target.value;
                                  setCountryCode(
                                    countryState.states[
                                    country_code.split(",")[0]
                                    ]
                                  );
                                }}
                                required
                                className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                              >
                                {Object.entries(countryState.country).map(
                                  (value, index) => (
                                    <option
                                      value={`${value}`}
                                      key={value.splice(0, 2)[0]}
                                    >
                                      {value.splice(0, 2)[1]}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full" type="submit">
                        Update
                      </Button>
                    </form>
                  </div>
                ))}
            </Modal.Body>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default PlaceOrder;
