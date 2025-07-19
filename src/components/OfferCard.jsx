import { Link } from "react-router-dom";

const OfferCard = ({ offer }) => {
  const taille = offer.product_details.find((d) => d.TAILLE)?.TAILLE || "";
  const marque = offer.product_details.find((d) => d.MARQUE)?.MARQUE || "";

  return (
    <Link to={`/offer/${offer._id}`} className="card">
      {/* Header : avatar + username */}
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

      {/* Image produit */}
      <img
        src={offer.product_image.secure_url}
        alt={offer.product_name}
        className="product-image"
      />

      {/* Infos produit */}
      <div className="card-content">
        <p>{offer.product_price} €</p>
        {taille && <p>{taille}</p>}
        {marque && <p>{marque}</p>}
      </div>
    </Link>
  );
};

export default OfferCard;
