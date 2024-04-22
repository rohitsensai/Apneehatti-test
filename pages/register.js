import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import "intl-tel-input/build/css/intlTelInput.css";
import * as util from "intl-tel-input/build/js/utils";
import intlTelInput from "intl-tel-input";
import {
  BsEyeFill,
  BsFillEyeSlashFill,
  BsInfoCircleFill,
} from "react-icons/bs";
import Head from "next/head";
import { toast } from "react-toastify";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return { props: {} };
}

const register = () => {
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [retypePasswordVisible, setRetypePasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(initialValues);
  const [mobile, setMobile] = useState();
  const [validateMobile, setValidateMobile] = useState();
  const [isValidNumber, setIsValidNumber] = useState();

  const router = useRouter();

  const handleInputChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setUserDetails({
      ...userDetails,
      [id]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleRetypePasswordVisibility = () => {
    setRetypePasswordVisible(!retypePasswordVisible);
  };

  // Mobile
  const registerSubmitHandler = (e) => {
    e.preventDefault();
    if (
      userDetails.fullname &&
      userDetails.email &&
      userDetails.mobile &&
      userDetails.password &&
      userDetails.confirmPassword
    ) {
      if (userDetails.password == userDetails.confirmPassword) {
        fetch(`/api/users/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: userDetails.fullname,
            email: userDetails.email,
            mobile: userDetails.mobile,
            password: userDetails.password,
          }),
        })
          .then((res) => res.json())
          .then(function (response) {
            if (response.error) {
              toast.error(response.error, {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
              });
            } else {
              toast.success(
                "Registration Successful! Welcome to apnnehatti. Explore and enjoy!",
                {
                  position: "top-right",
                  autoClose: 3000,
                  closeOnClick: true,
                  pauseOnHover: true,
                }
              );
              router.push("/");
            }
          })
          .catch(function (error) {
            console.log({ error });
            toast.error("Something went wrong", {
              position: "top-right",
              autoClose: 3000,
              closeOnClick: true,
              pauseOnHover: true,
            });
          });
      } else {
        toast.error(
          "Please check password and confirm password should be same",
          {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
          }
        );
      }
    } else {
      toast.warning("Fill all the fields", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
  var iti;

  const validateNumber = (e) => {
    setIsValidNumber(!validateMobile.isValidNumber() && "Invalid Number");
    if (isValidNumber !== "Invalid Number") {
      setUserDetails({
        ...userDetails,
        mobile: Number(
          validateMobile.selectedCountryData.dialCode + e.target.value
        ),
      });
    }
  };

  useEffect(() => {
    const intlTelInputScriptLoad = (iti) => {
      const input = document.querySelector("#mobile");
      iti = intlTelInput(input, {
        initialCountry: "in",
        // separateDialCode: true,
        utilsScript: util,
      });
      setValidateMobile(iti);
    };
    intlTelInputScriptLoad(iti);
  }, []);
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex flex-col items-center justify-center pb-40 pt-10 bg-white">
        <div className=" w-10/12 lg:w-1/3 p-5 border shadow-sm bg-blue-100">
          <h1
            className=" text-center pb-3 text-4xl font-medium
        "
            style={{ fontFamily: "fantasy",color:"white" }}
          >
            Create account
          </h1>

          <form onSubmit={registerSubmitHandler} className="">
            <div className="p-4">
              <div className="mb-6">
                <input
                  type="text"
                  id="fullname"
                  onChange={(e) => handleInputChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm text-md focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Name"
                  pattern="^[a-zA-Z ]+$"
                  title="Please enter only alphabets and spaces."
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  id="email"
                  onChange={(e) => handleInputChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm text-md focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  onBlur={(e) => validateNumber(e)}
                  id="mobile"
                  className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-sm text-md focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Mobile"
                  pattern="^[0-9]{8,15}$"
                  title="Do not add country code"
                  required
                />
                {isValidNumber && (
                  <h1 className="bg-red-100 border border-red-400 mt-1 mx-auto p-1 text-center text-red-400 text-sm w w-full">
                    {isValidNumber}
                  </h1>
                )}
              </div>

              <div className="mb-3 relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  onChange={(e) => handleInputChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm text-md focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Password"
                  minLength={8}
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                  required
                />
                {passwordVisible ? (
                  <BsFillEyeSlashFill
                    onClick={togglePasswordVisibility}
                    className="text-lg text-gray-500 mr-2 cursor-pointer absolute right-0 top-3"
                  />
                ) : (
                  <BsEyeFill
                    onClick={togglePasswordVisibility}
                    className="text-lg text-gray-500 mr-2 cursor-pointer absolute right-0 top-3"
                  />
                )}
                <div className="flex gap-x-1 justify-center items-start py-2">
                  <BsInfoCircleFill className="text-xl text-gray-600" />
                  <p className="text-xs font-medium text-gray-600  ">
                    Passwords should be a minimum of 8 characters with at least
                    one uppercase letter, one lowercase letter, and one digit.
                  </p>
                </div>
              </div>

              <div className="mb-6 relative">
                <input
                  type={retypePasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm text-md focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Retype Password"
                  minLength={8}
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                  required
                />
                {retypePasswordVisible ? (
                  <BsFillEyeSlashFill
                    onClick={toggleRetypePasswordVisibility}
                    className="text-lg text-gray-500 mr-2 cursor-pointer absolute right-0 top-3"
                  />
                ) : (
                  <BsEyeFill
                    onClick={toggleRetypePasswordVisibility}
                    className="text-lg text-gray-500 mr-2 cursor-pointer absolute right-0 top-3"
                  />
                )}
              </div>
              <div className="">
                <button type="submit" className=" btn2">
                  Register new account
                </button>
              </div>
            </div>

            <div className=" space-y-3 mt-3 bg-white p-5 border">
              <label
                htmlFor="terms"
                className=" block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Already have an account?
                <Link href="/login">
                  <span className="text-blue-500 hover:underline dark:text-blue-500">
                    &nbsp;Sign in.
                  </span>
                </Link>
              </label>
              <div className="flex items-start mb-6">
                <p className="text-sm font-medium">
                  By continuing, you agree to Apneehatti's{" "}
                  <a href="#" className="text-blue-500 underline">
                    conditions of use
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-500 underline">
                    privacy notice.
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default register;
