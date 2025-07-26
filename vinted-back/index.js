require("dotenv").config(); // Charge les variables .env

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Route de création d'un PaymentIntent
app.post("/payment", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000, // 💶 Montant en centimes (ici 20€)
      currency: "eur",
      description: "Paiement Vinted React",
      payment_method_types: ["card"], // nécessaire pour éviter les erreurs
    });

    res.status(200).json({
      client_secret: paymentIntent.client_secret, // ce que Stripe attend côté frontend
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🚀 Lancer le backend
app.listen(3000, () => {
  console.log("✅ Serveur backend lancé sur http://localhost:3000");
});
