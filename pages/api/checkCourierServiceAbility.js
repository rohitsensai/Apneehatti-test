const check = async (req, res) => {
    try {
      const { pickupPincode, deliveryPincode, weight, cod } = req.body;
  
      const authResponse = await fetch(
        "https://apiv2.shiprocket.in/v1/external/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: process.env.SHIPROCKET_API_EMAIL,
            password: process.env.SHIPROCKET_API_PASS,
          }),
        }
      );
  
      const auth = await authResponse.json();
      const serviceabilityResponse = await fetch(
        `https://apiv2.shiprocket.in/v1/external/courier/serviceability?pickup_postcode=${pickupPincode}&delivery_postcode=${deliveryPincode}&cod=${cod}&weight=${weight}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
  
      if (!serviceabilityResponse.ok) {
        throw new Error("Network response was not ok");
      }
  
      const result = await serviceabilityResponse.json();
      res.status(200).json(result.data.available_courier_companies);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
  
  export default check;
  