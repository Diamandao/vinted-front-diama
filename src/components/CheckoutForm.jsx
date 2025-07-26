import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import "./CheckoutForm.css"; // à créer pour le style

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    if (!elements || !stripe) {
      setIsLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/payment");
      const clientSecret = response.data.client_secret;

      const stripeResponse = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "http://localhost:5173/", // ou ton URL front
        },
        redirect: "if_required",
      });

      if (stripeResponse.error) {
        setErrorMessage(stripeResponse.error.message);
      } else if (stripeResponse.paymentIntent.status === "succeeded") {
        setIsSuccess(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <p className="success-message">✅ Paiement effectué avec succès !</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements || isLoading}>
        {isLoading ? "Paiement en cours..." : "Payer"}
      </button>
      {errorMessage && <p className="error-message">❌ {errorMessage}</p>}
    </form>
  );
};

export default CheckoutForm;
