import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Load Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51PLlWk04ex3Ui1JlZAO8ZRN2sBG7k7Oqag4GFBPKZGmL5T5tLF9OVwTBtsPbeZiJ2uyh5vtz63KnerVuGujmGFf0004JWFWuMp"
);

// Button Component
const Button = ({ children, ...props }) => (
  <button
    {...props}
    style={{
      backgroundColor: "#1D4ED8", // blue-600
      color: "#FFFFFF",
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
    }}
  >
    {children}
  </button>
);

// Input Component
const Input = ({ type, value, onChange, placeholder, ...props }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #E5E7EB", // gray-300
      width: "100%",
      fontSize: "16px",
    }}
    {...props}
  />
);

// Card Component for UI
const Card = ({ children, style, ...props }) => (
  <div
    style={{
      border: "1px solid #E5E7EB", // gray-300
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#FFFFFF",
      padding: "20px",
      width: "350px",
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

// Header of the Payment Card
const CardHeader = ({ title, description }) => (
  <div style={{ marginBottom: "20px" }}>
    <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#111827" }}>
      {title}
    </h2>
    <p style={{ fontSize: "14px", color: "#6B7280" }}>{description}</p>
  </div>
);

// Footer of the Payment Card
const CardFooter = ({ children }) => (
  <div
    style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}
  >
    {children}
  </div>
);

// Main Stripe Payment Form Component
const StripePaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Extract amount and orderId from URL (optional)
    const params = new URLSearchParams(window.location.search);
    const urlAmount = params.get("amount");
    const urlOrderId = params.get("orderId");

    if (urlAmount) setAmount(urlAmount);
    if (urlOrderId) setOrderId(urlOrderId); // Store orderId but not used further
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setIsLoading(false);
      return;
    }

    // Create the PaymentIntent
    const response = await fetch("http://localhost:8095/stripe/charge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: parseFloat(amount) * 100, // Convert to cents
      }),
    });

    const result = await response.json();

    if (result.error) {
      console.error("Payment failed:", result.error);
      setIsLoading(false);
      return;
    }

    // Confirm the PaymentIntent using the client secret from backend
    const { clientSecret } = result;

    const confirmResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmResult.error) {
      console.error("Payment failed:", confirmResult.error.message);
    } else if (
      confirmResult.paymentIntent &&
      confirmResult.paymentIntent.status === "succeeded"
    ) {
      console.log("Payment successful!");
    }

    setIsLoading(false);
  };

  return (
    <Elements stripe={stripePromise}>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader
            title="Stripe Payment"
            description="Enter your card details to make a payment"
          />
          <div style={{ marginBottom: "20px" }}>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <CardElement
              style={{
                padding: "10px",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
              }}
            />
          </div>
          <CardFooter>
            <Button type="submit" disabled={!stripe || isLoading}>
              {isLoading ? "Processing..." : "Pay"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Elements>
  );
};

export default StripePaymentForm;
