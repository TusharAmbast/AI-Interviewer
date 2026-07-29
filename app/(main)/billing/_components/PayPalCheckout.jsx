"use client";

import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalCheckout({ amount }) {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  // 1. Creates the order on PayPal's side
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "Interview Platform Subscription",
          amount: {
            currency_code: "USD",
            value: amount, // e.g., "19.99"
          },
        },
      ],
    }).then((orderID) => {
      setOrderID(orderID);
      return orderID;
    });
  };

  // 2. Handles what happens after the user approves the payment
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      // The payment was successful!
      const { payer } = details;
      console.log("Transaction completed by", payer.name.given_name);
      setSuccess(true);
      
      // TODO: Here you would typically send an API request to your backend
      // to update the user's database record (e.g., mark them as a premium user)
    });
  };

  // 3. Handles any errors during the transaction
  const onError = (data, actions) => {
    setErrorMessage("An error occurred with your payment. Please try again.");
  };

  return (
    <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
      <div className="w-full max-w-md mx-auto mt-8 p-6 bg-card border border-border rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center text-card-foreground">Complete Your Purchase</h2>
        
        {success ? (
          <div className="bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 p-4 rounded-md text-center">
            Payment Successful! Thank you for your purchase.
          </div>
        ) : (
          <>
            <div className="mb-6 text-center text-muted-foreground">
              Total Amount: <span className="font-bold text-foreground">${amount}</span>
            </div>
            
            {errorMessage && (
              <div className="bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 p-3 rounded-md mb-4 text-sm">
                {errorMessage}
              </div>
            )}

            <PayPalButtons
              style={{ layout: "vertical", shape: "rect", color: "blue" }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            />
          </>
        )}
      </div>
    </PayPalScriptProvider>
  );
}