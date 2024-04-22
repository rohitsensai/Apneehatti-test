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
  email: "",
  password: "",
};
const login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginDetails, setLoginDetails] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  //   Login
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    if (status == "authenticated") {
      router.push("/");
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="rounded flex flex-col items-center justify-center pb-40 pt-20 bg-white ">
        <div className="rounded w-8/12 lg:w-3/12 bg-blue-100 p-5 border shadow-sm ">
          <h1
            className="welcome fw-bold  text-3xl font-medium text-white px-4 rounded mb-3
        "
            style={{ fontFamily: "Ubuntu", }}
          >
            Welcome <br /> Back
          </h1>

          <form method="post" onSubmit={loginHandler}>
            <div className="pt-24 ">
              {loading && (
                <AnimatePresence>
                  <div className="border bg-white p-2 mb-6 overflow-hidden text-sm font-medium text-gray-500 flex gap-x-2 items-center shadow-sm">
                    <span className="flex gap-x-2 items-center">
                      <Spinner color={"success"} /> Please wait ...{" "}
                    </span>
                  </div>
                </AnimatePresence>
              )}
              <div className="mb-6">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginDetails.email}
                  onChange={inputHandler}
                  className="bg-gray-50 rounded border border-gray-300 text-gray-900 text-sm rounded-sm text-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-4 relative ">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={loginDetails.password}
                  onChange={inputHandler}
                  className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-md text-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
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
              </div>
             
              <div className="d-flex flex-row justify-content-end fw-bold mb-3 ">
              
                <a className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center p-3">
                <button type="submit"> <FaArrowRight />
                </button>
                </a>

              </div>
             

            </div>

            <div className="text-center mt-8">
              <div className="p-4 ">

                <div className="d-flex flex-row justify-content-between">
                  <a href="/register">
                    <div className="fw-bold cursor-pointer py-2 px-1 font-medium mt-2  position-relative">
                      Sign Up
                    
                    </div>
                   

                  </a>
                  <a href="/forget-password">
                    <div className="fw-bold cursor-pointer  py-2  px-1 font-medium mt-2  position-relative ">
                      <span className="">Forgot password</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default login;
