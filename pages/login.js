import { useEffect, useState } from "react";
import { useSession, signIn, getSession } from "next-auth/react";
import { Spinner, Toast } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { toast } from "react-toastify";
import { BsEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Image from "next/image";
import { FaArrowRight } from 'react-icons/fa';
import { BsFacebook, BsLinkedin, BsGoogle } from "react-icons/bs";

import { useDispatch } from "react-redux";

import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

import "intl-tel-input/build/css/intlTelInput.css";
import * as util from "intl-tel-input/build/js/utils";
import intlTelInput from "intl-tel-input";
import {

  BsInfoCircleFill,
} from "react-icons/bs";


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

const initialValues = {
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
  mobile: "",
};
const login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginDetails, setLoginDetails] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [retypePasswordVisible, setRetypePasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(initialValues);
  const [mobile, setMobile] = useState();
  const [validateMobile, setValidateMobile] = useState();
  const [isValidNumber, setIsValidNumber] = useState();

  const router = useRouter();

  const handleSignUpClick = () => {
    setIsSignUpActive(!isSignUpActive);
    console.log("issignupactive", isSignUpActive)
  };


  //   Login
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setUserDetails({
      ...userDetails,
      [id]: value,
    });
  };

  const { email, password } = loginDetails;
  const { data: session, status } = useSession();

  const loginHandler = async (e) => {
    setLoading(!loading);
    e.preventDefault();
    const REDIRECT_URL = process.env.HOST
    if (email && password) {
      await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: REDIRECT_URL,
      }).then((res) => {
        setLoading(false);
        console.log("res", res)
        if (!res.ok) {
          toast.error("Invalid credentials", {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
          });
        } else {
          toast.success("Sign-in successful", {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      });
    } else {
      setLoading(false);
      toast.warning("Please enter email id and password", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleRetypePasswordVisibility = () => {
    setRetypePasswordVisible(!retypePasswordVisible);
  };

  useEffect(() => {
    if (status == "authenticated") {
      router.push("/");
    }
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
  }, [status]);




  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="mybody">
        <div className={`container   ${isSignUpActive ? 'right-panel-active' : ''}`} id="container" >
          <div class="form-container sign-up-container">
            <form className="loginform" onSubmit={registerSubmitHandler}>
              <h1 className="myh1">Create Account</h1>
              <div class="social-container">
                <a href="#" className="social mya"><i class="fab fa-facebook-f"></i></a>
                <a href="#" className="social mya"><i class="fab fa-google-plus-g"></i></a>
                <a href="#" className="social mya"><i class="fab fa-linkedin-in"></i></a>
              </div>
              <span className="myspan">or use your email for registration</span>
              <input id="fullname" onChange={(e) => handleInputChange(e)} className="logininput rounded " type="text" placeholder="Name" pattern="^[a-zA-Z ]+$" required />
              <input id="email" onChange={(e) => handleInputChange(e)} required className="logininput rounded" type="email" placeholder="Email" />
              <input
                onBlur={(e) => validateNumber(e)}
                className="logininput rounded"
                id="mobile"
                placeholder="Mobile"
                pattern="^[0-9]{8,15$}"
                // title="Do not add country code"
                required
                style={{ width: '285px' }} // Adjust the width value as needed
              />

              {isValidNumber && (
                <h1 className="bg-red-100 border border-red-400 mt-1 mx-auto p-1 text-center text-red-400 text-sm w w-full">
                  {isValidNumber}
                </h1>
              )}
              <input className="logininput rounded"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                id="password"
                onChange={(e) => handleInputChange(e)}
                minLength={8}
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                required
              />
              {/* {passwordVisible ? (
                  <BsFillEyeSlashFill
                    onClick={togglePasswordVisibility}
                    className="text-lg text-gray-500 mr-2 cursor-pointer absolute right-0 top-3"
                  />
                ) : (
                  <BsEyeFill
                    onClick={togglePasswordVisibility}
                    className="text-lg text-gray-500 mr-2 cursor-pointer absolute right-0 top-3"
                  />
                )} */}
              {/* <div className="flex gap-x-1 justify-center items-start py-2">
                  <BsInfoCircleFill className="text-xl text-gray-600" />
                  <p className="text-xs font-medium text-gray-600  ">
                    Passwords should be a minimum of 8 characters with at least
                    one uppercase letter, one lowercase letter, and one digit.
                  </p>
                </div> */}
              <input className="logininput rounded"
                type={retypePasswordVisible ? "text" : "password"}
                id="confirmPassword"
                onChange={(e) => handleInputChange(e)}
                placeholder="Retype Password"
                minLength={8}
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                required
              />
              {/* {retypePasswordVisible ? (
                  <BsFillEyeSlashFill
                    onClick={toggleRetypePasswordVisibility}
                    className="text-lg text-gray-500 mr-2 cursor-pointer absolute right-0 top-3"
                  />
                ) : (
                  <BsEyeFill
                    onClick={toggleRetypePasswordVisibility}
                    className="text-lg text-gray-500 mr-2 cursor-pointer absolute right-0 top-3"
                  />
                )} */}
              <button className="loginbutton" type="submit">Sign Up</button>
            </form>
          </div>
          <div class="form-container sign-in-container">
            <form className="loginform" method="post" onSubmit={loginHandler}>
              <h1 className="myh1" >Sign in</h1>
              <div class="social-container">
                <a href="#" className="social mya"><i class="fab fa-facebook-f"></i></a>
                <a href="#" className="social mya"><i class="fab fa-google-plus-g"></i></a>
                <a href="#" className="social mya"><i class="fab fa-linkedin-in"></i></a>
              </div>
              <span className="myspan">or use your account</span>
              <input id="email" name="email" value={loginDetails.email} onChange={inputHandler} className="logininput rounded" required type="email" placeholder="Email" />
              {/* {passwordVisible ? (
                  <BsFillEyeSlashFill
                    onClick={togglePasswordVisibility}
                    className="text-lg text-gray-500 mr-2 cursor-pointer absolute right-0 top-3"
                  />
                ) : (
                  <BsEyeFill
                    onClick={togglePasswordVisibility}
                    className="text-lg text-gray-500 mr-2 cursor-pointer absolute right-0 top-3"
                  />
                )} */}
              <input className="logininput rounded" id="password" name="password" value={loginDetails.password} onChange={inputHandler} required type={passwordVisible ? "text" : "password"} placeholder="Password" />
              <a className="mya cursor-pointer" href="forgot-password">Forgot your password?</a>
              <button className="loginbutton " type="submit">Sign In</button>
            </form>
          </div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1 className="myh1">Welcome to Apneehatti!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="loginbutton" class="ghost" id="signIn" onClick={handleSignUpClick}>Sign In</button>
              </div>
              <div class="overlay-panel overlay-right">
                <h1 className="myh1">Welcome Back</h1>
                <p className="myp">Enter your personal details and start journey with us</p>
                <button className="loginbutton" class="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
