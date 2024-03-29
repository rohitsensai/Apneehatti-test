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
    const REDIRECT_URL = "https://localhost:3000"
    if (email && password) {
      await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: REDIRECT_URL,
      }).then((res) => {
        setLoading(false);
        console.log("res",res)
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
      <div className="flex flex-col items-center justify-center pb-40 pt-20">
        <div className=" w-10/12 lg:w-1/3 bg-gray-100 p-5 border shadow-sm ">
          <h1
            className="text-center pb-3 text-4xl font-medium
        "
            style={{ fontFamily: "fantasy" }}
          >
            Sign In
          </h1>

          <form method="post" onSubmit={loginHandler}>
            <div className="p-4">
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm text-md focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={loginDetails.password}
                  onChange={inputHandler}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm text-md focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
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
              <button type="submit" className="btn2 mb-3">
                Sign in
              </button>
            </div>

            <div className="flex items-start mb-6 mt-3">
              <p className="text-sm font-medium">
                By continuing, you agree to Apneehatti's{" "}
                <a href="#" className="text-blue-500 underline cursor-pointer">
                  conditions of use
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-500 underline cursor-pointer">
                  privacy notice.
                </a>
              </p>
            </div>
            <div className="text-center mt-8">
              <div className="p-4 bg-white border">
                <div className="flex items-center">
                  <hr className="w-full border-black" />
                  <p className="text-sm font-medium whitespace-nowrap px-4">
                    New to apneehatti ?
                  </p>
                  <hr className="w-full border-black" />
                </div>

                <Link href="/register">
                  <div className="border cursor-pointer border-black py-2 w-full text-xs uppercase font-medium mt-2 hover:text-white hover:bg-black hover:shadow-md transition-all duration-300">
                    <span className="">Create account</span>
                  </div>
                </Link>
                <Link href="/forgot-password">
                  <div className="border cursor-pointer border-black py-2 w-full text-xs uppercase font-medium mt-2 hover:text-white hover:bg-black hover:shadow-md transition-all duration-300">
                    <span className="">Forgot password</span>
                  </div>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default login;
