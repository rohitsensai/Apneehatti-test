import main from "../../../database/conn";
import crypto from "crypto";
import Payment from "../../../model/paymentSchema";

const validation = async (req, res) => {
  // Connect to database
  await main().catch((err) => console.error(err));
  const sign = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (req.body.razorpay_signature == generated_signature) {
    const transaction = new Payment({
      order_id: req.body.razorpay_order_id,
      payment_id: req.body.razorpay_payment_id,
      signature: req.body.razorpay_signature,
      status: true,
    });
    transaction.save(function (err, savedtransac) {
      if (err) {
        return res.status(500).send("Some Problem Occured");
      }
      res.send({ transaction: savedtransac });
    });
  } else {
    return res.send("failed");
  }
};

export default validation;
