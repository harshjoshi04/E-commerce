"use client";
import React, { useEffect, useState } from "react";
import {
  useStripe,
  PaymentElement,
  useElements,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import {
  SetOrderId,
  SetOrderStatus,
  removeUserOrderDetail,
} from "@/redux/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import axios from "axios";
import { CONFIRMORDER } from "@/utils/Api";
import { DeleteCartsApi } from "@/redux/user/userSlice";

const PaymentForm = ({ total }) => {
  const [success, setsuccess] = useState(false);
  const [messgae, setmessgae] = useState("");
  const dispatch = useDispatch();
  const userOrder = useSelector((state) => state.orderDetail.userOrder);
  const userProduct = useSelector((state) => state.user.productList);
  const ClientPaymentId = useSelector(
    (state) => state.orderDetail.clientOrderSecret
  );
  const [load, setload] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    if (!stripe) return;
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) return;
    stripe.retrieveSetupIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setmessgae("Payment Success");
          break;
        case "processing":
          setmessgae("Your payment is processing.");
          break;
        case "requires_payment_method":
          setmessgae("Your payment was not successful, please try again.");
          break;
        default:
          setmessgae("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setload(true);
    if (!stripe && !elements) {
      return;
    }
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmPayment: {
          return_url: "/home",
        },
        redirect: "if_required",
      });
      if (error) {
        toast.error("Something wrong !");
        dispatch(removeUserOrderDetail());
      } else {
      }
      setload(false);
      let obj = {
        orderId: paymentIntent?.payment_method,
        ...userOrder,
        products: userProduct,
      };
      handleSendData(obj);
    } catch (error) {
      console.log(error);
    }
  };
  async function handleSendData(obj) {
    const token = getCookie("token");
    try {
      const { data } = await axios.post(CONFIRMORDER, obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(SetOrderStatus());
      dispatch(DeleteCartsApi(data?.removeItem));
      dispatch();
      dispatch(SetOrderId(data.id));
    } catch (er) {
      console.log(er);
    }
  }
  const paymentElementOptions = {
    layout: "tabs",
  };
  return (
    <>
      <div className="max-w-[80%] mx-auto flex justify-center items-center my-10  text-xl text-gray-600 font-semibold">
        {!success && (
          <>
            <form id="payment-form" onSubmit={handleSubmit}>
              <LinkAuthenticationElement
                options={{ defaultValues: { email: userOrder?.email } }}
                className="hidden"
              />
              <PaymentElement options={paymentElementOptions} />
              <Button
                type="submit"
                className="w-full bg-black text-white text-lg my-6 font-semibold"
                disabled={!stripe || !elements}
                id="submit"
                isLoading={load}
              >
                {!load && `Pay ${total}`}
              </Button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default PaymentForm;
