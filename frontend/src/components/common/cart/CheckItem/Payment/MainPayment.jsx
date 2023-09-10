"use client";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "@/components/common/cart/CheckItem/Payment/PaymentForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { SetClientOrderSecretKey } from "@/redux/order/orderSlice";
import { CREATEPAYMENTUSER } from "@/utils/Api";
const stripePromise = loadStripe(
  "pk_test_51NibsaSGleC9T2WLCy2FM29IZuQ5lAvBPtbgYPO2XR65R325AOoV1EbeFLOTsrMewfadGGmj42SVM8fnOitH4iTt00F8mMFQMa"
);

export default function MainPayment({ total }) {
  const [clientSecret, setclientSecret] = useState("");
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const { data } = await axios.post(CREATEPAYMENTUSER, { total });
      setclientSecret(data.clientSecret);
      dispatch(SetClientOrderSecretKey(data.clientSecret));
    } catch (er) {
      console.log(er);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm total={total} />
        </Elements>
      ) : (
        <div className="flex justify-center items-center h-[30rem]">
          <Spinner />
        </div>
      )}
    </>
  );
}
