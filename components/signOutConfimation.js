"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function SignOutConfirmation({ signOut }) {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  return (
    <>
      <li
        onClick={() => props.setOpenModal("pop-up")}
        style={{ fontSize: "15px", whiteSpace: "nowrap" }}
        className="block px-4 py-2 cursor-pointer mybtn"
      >
        Sign out
      </li>

      <Modal
        show={props.openModal === "pop-up"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-orange-400 dark:text-orange-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to sign out?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  props.setOpenModal(undefined);
                }}
              >
                Yes, I'm sure
              </Button>
              <Button
                color="gray"
                onClick={() => props.setOpenModal(undefined)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
