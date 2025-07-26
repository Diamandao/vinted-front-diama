import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "../components/CheckoutForm";

// Clé publique Stripe (à ne surtout pas confondre avec la clé secrète)
const stripePromise = loadStripe(
  "pk_test_51Rp6pqIfkIymsEce2iwvWzpRjSLQcLRChSSyB0ezoZol5xRv4vEhQR7P2EswerUDakRXStFGfniQwybWCAl4gSSE006n7GdWtT"
);

const Payment = () => {
  const location = useLocation();
  const { productName, productPrice } = location.state;

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post("http://localhost:3000/payment", {
          // tu pourrais passer d'autres infos ici plus tard
        });
        setClientSecret(response.data.client_secret);
      } catch (error) {
        console.error("Erreur lors de la création du PaymentIntent :", error);
      }
    };

    createPaymentIntent();
  }, []);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Paiement pour : {productName}</h1>
        <h2>Total : {productPrice} €</h2>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Payment;
