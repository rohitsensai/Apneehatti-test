import { toast } from "react-toastify";

export default function toastifyFetch(url, data, session) {
  const toastId = toast.loading("Please wait...");

  fetch(url, {
    body: JSON.stringify(data),
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session && session.user.accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) =>
      data.error
        ? toast.update(toastId, {
            render: "Coupon code already exist",
            autoClose: 1000,
            type: "error",
            isLoading: false,
          })
        : toast.update(toastId, {
            render: "Coupon is created",
            autoClose: 1000,
            type: "success",
            isLoading: false,
          })
    );
}
