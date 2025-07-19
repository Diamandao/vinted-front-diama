import logoVinted from "../assets/logo.vinted-reacteur.svg";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ search }) => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setOffers(response.data.offers);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des offres :", error);
      }
    };

    fetchOffers();
  }, []);

  const filteredOffers = offers.filter((offer) => {
    const name = offer.product_name?.toLowerCase() || "";
    const brand =
      offer.product_details.find((d) => d.MARQUE)?.MARQUE.toLowerCase() || "";
    return (
      name.includes(search.toLowerCase()) ||
      brand.includes(search.toLowerCase())
    );
  });

  return (
    <div className="home-page">
      {/* HERO (bannière) */}
      <section className="hero">
        <div className="hero-content">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button>Commencer à vendre</button>
        </div>
      </section>

      {/* OFFRES */}
      <section className="offers">
        {isLoading ? (
          <p>Chargement des annonces...</p>
        ) : (
          <div className="offers-container">
            {filteredOffers.map((offer) => (
              <Link to={`/offer/${offer._id}`} key={offer._id} className="card">
                {/* Avatar + username */}
                <div className="card-header">
                  {offer.owner?.account?.avatar?.secure_url && (
                    <img
                      src={offer.owner.account.avatar.secure_url}
                      alt={offer.owner.account.username}
                      className="avatar"
                    />
                  )}
                  <span>{offer.owner?.account?.username}</span>
                </div>

                {/* Image du produit */}
                <img
                  src={offer.product_image.secure_url}
                  alt={offer.product_name}
                  className="product-image"
                />

                {/* Infos produit */}
                <div className="card-content">
                  <p>{offer.product_price} €</p>
                  <p>
                    {offer.product_details.find((d) => d.TAILLE)?.TAILLE || ""}
                  </p>
                  <p>
                    {offer.product_details.find((d) => d.MARQUE)?.MARQUE || ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
