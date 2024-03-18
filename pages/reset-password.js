import { getSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { toast } from "react-toastify";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { token } = await context.query;
  let res;

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  } else {
    const data = await fetch(
      `${process.env.HOST}/api/reset-password/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": JSON.stringify({ token }).length.toString(),
        },
        body: JSON.stringify({ token }),
      }
    );
    res = await data.json();
  }
  return {
    props: {
      valid: res.message ? true : false,
      token: token,
    },
  };
}

const resetPassword = ({ valid, token }) => {
  const [passwordChange, setPasswordChange] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form_data = Object.fromEntries(formData);
    const { password, confirmPassword } = form_data;
    if (password == "") {
      toast.error("Please enter password");
    } else if (password != confirmPassword) {
      toast.error("Password and confirm password not match");
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
    ) {
      toast.error("Please enter a valid password");
    } else {
      const data = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      });
      const res = await data.json();
      if (res.message) {
        setPasswordChange(true);
      } else {
        toast.error(res.error);
      }
      // You can use a library like nodemailer or sendgrid to send the email
    }
  };

  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <div className="flex flex-col items-center justify-center pb-40 pt-20">
        <div className=" w-10/12 lg:w-1/3 bg-gray-100 p-4 border shadow-sm ">
          <h1
            className="text-center pb-3 text-4xl font-medium
          "
            style={{ fontFamily: "fantasy" }}
          >
            Reset Password
          </h1>
          {!valid ? (
            <p className="text-center text-gray-500 bg-white border border-gray-300  p-4">
              Token is expired.
            </p>
          ) : passwordChange ? (
            <p className="text-center text-gray-500 bg-white border border-gray-300  p-4">
              Your password is successfully changed, please try to login
            </p>
          ) : (
            <div className="p-4">
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-sm text-md focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                  />
                  <input
                    className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-sm text-md focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                  />
                  <p className="p-3 border border-300 text-gray-500 text-xs bg-white">
                    Passwords should be a minimum of 8 characters with at least
                    one uppercase letter, one lowercase letter, and one digit.
                  </p>
                </div>
                <button className="btn2 mb-3" type="submit">
                  Reset Password
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default resetPassword;
