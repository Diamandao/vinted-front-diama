import "./Offer.css"; // ou '../styles/Offer.css' selon où tu l’as mis
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css"; // ou un fichier spécifique comme Offer.css si tu veux affiner le style

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'offre :", error);
      }
    };

    fetchOffer();
  }, [id]);

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <div className="offer-page">
      <div className="offer-container">
        {/* Image du produit */}
        <div className="offer-image">
          <img src={offer.product_image.secure_url} alt={offer.product_name} />
        </div>

        {/* Détails du produit */}
        <div className="offer-details">
          <p className="price">{offer.product_price} €</p>

          <ul className="product-attributes">
            {offer.product_details.map((detail, index) => {
              const key = Object.keys(detail)[0];
              return (
                <li key={index}>
                  <span className="attribute-key">{key}</span>
                  <span className="attribute-value">{detail[key]}</span>
                </li>
              );
            })}
          </ul>

          <hr />

          <div className="offer-description">
            <h2>{offer.product_name}</h2>
            <p>{offer.product_description}</p>
            <div className="user-info">
              {offer.owner?.account?.avatar?.secure_url && (
                <img
                  src={offer.owner.account.avatar.secure_url}
                  alt={offer.owner.account.username}
                  className="avatar"
                />
              )}
              <span>{offer.owner.account.username}</span>
            </div>
          </div>

          <button className="buy-button">Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
