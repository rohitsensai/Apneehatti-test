"use client"
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

import "intl-tel-input/build/css/intlTelInput.css";
import * as util from "intl-tel-input/build/js/utils";
import intlTelInput from "intl-tel-input";
import { getSession } from "next-auth/react";
import { HiUserCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import SignOutConfirmation from "../components/signOutConfimation";
import Link from "next/link";


export async function getServerSideProps({ req }) {
  let session = await getSession({ req });



  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  } else {
    const data = await fetch(
      `${process.env.HOST}/api/users/id/${session && session.user.id}`
    );
    const res = await data.json();
    return {
      props: {
        profile: res,
        session: session,
      },
    };
  }
}

const myprofile = ({ profile, session }) => {
  const [userDetails, setUserDetails] = useState();
  const [validateMobile, setValidateMobile] = useState();
  const [isValidNumber, setIsValidNumber] = useState();

  const handleInputChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setUserDetails({
      ...userDetails,
      [id]: value,
    });
  };

  const profileSubmitHandler = async (e) => {
    e.preventDefault();

    if (!userDetails) {
      return; // Exit early if userDetails is not available
    }

    try {
      const response = await fetch(`/api/users/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session.user.accessToken}`,
        },
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
        toast.success("Profile updated successfully", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        throw new Error("Something went wrong"); // Throw an error for non-ok responses
      }
    } catch (error) {
      toast.error("Something went wrong, try to contact support", {
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
        <title>My Profile</title>
      </Head>
      <div className="min-h-screen container lg:w-2/5 mt-4  m-auto p-5 ">
        <h1 className="font-medium text-xl flex gap-2 mx-auto justify-center items-center">
          <HiUserCircle className="text-2xl" />
          My Profile
        </h1>
        <div>
          <form onSubmit={profileSubmitHandler} className="">
            <div className="p-4">
              <div className="mb-6">
                <input
                  type="text"
                  id="fullname"
                  defaultValue={profile?.fullname}
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
                  defaultValue={profile?.email}
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
                  className="bg-gray-50 border  w-full border-gray-300 text-gray-900 text-sm rounded-sm text-md focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Mobile"
                  pattern="^[0-9]{8,15}$"
                  title="Do not add country code"
                  defaultValue={profile.mobile}
                  required
                />
                {isValidNumber && (
                  <h1 className="bg-red-100 border border-red-400 mt-1 mx-auto p-1 text-center text-red-400 text-sm w w-full">
                    {isValidNumber}
                  </h1>
                )}
              </div>
              <div className="my-4">
                <button type="submit" className="mybtn text-bold  w-full">
                  Update Profile
                </button>
              </div>
              <div className="my-4">
               <Link className='mybtn w-full' href='/myorders'>
                  
               <button type="submit" className="mybtn text-bold  w-full">

                My Orders
                  </button>
                </Link>
              </div>
              <div className="w-full">
                <SignOutConfirmation className="p-2 w-full" signOut={signOut} />
              </div>
              </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default myprofile;
