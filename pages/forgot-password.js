import { getSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
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

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === "") {
      setError("Please enter your email address");
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
    } else {
      // Send a password reset email to the user's email address
      const data = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const res = await data.json();
      if (res.message) {
        setEmailSent(true);
      } else {
        toast(res.error);
      }
      // You can use a library like nodemailer or sendgrid to send the email
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError("");
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <div className=" flex flex-col items-center justify-center pb-40 pt-20">
        <div className="bg-blue-100 rounded w-10/12 lg:w-1/3 p-4 border shadow-sm ">
          <h1
            className="text-center pb-3 text-4xl font-medium text-white
          "
            style={{ fontFamily: "fantasy" }}
          >
            Forgot Password
          </h1>
          {emailSent ? (
            <p className="text-center text-gray-500 bg-white border border-gray-300  p-4">
              Check your email for otp (one time password) on how to reset your
              password.
            </p>
          ) : (
            <div className="p-4">
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm text-md focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleEmailChange}
                  />
                  {error ? <p>{error}</p> : null}
                </div>
                <button className="btn2 mb-3" type="submit">
                  Reset Password
                </button>
                <div className="fw-bold cursor-pointer  py-2  px-1 font-medium mt-2  position-relative ">
            <a href="/login">
              SignIn
            </a>
          </div>
              </form>
            </div>
          )}
         
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
