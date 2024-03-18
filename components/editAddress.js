import { Modal } from "flowbite-react";
import React, { useState } from "react";

const EditAddressModal = ({
  editAddressModalOpen,
  setEditAddressModalOpen,
  savedAddress,
  savedAddressId,
  updateAddress,
  countryCode,
  countryState,
}) => {
  return (
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
                  <Button className="w-full" type="submit">
                    Update
                  </Button>
                </form>
              </div>
            ))}
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default EditAddressModal;
