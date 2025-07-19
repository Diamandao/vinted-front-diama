import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.vinted-reacteur.svg";

function Header({ search, setSearch }) {
  const [priceRange, setPriceRange] = useState(10);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container">
        {/* Haut du header */}
        <div className="header-top">
          {/* Logo cliquable vers la home */}
          <Link to="/">
            <img src={logo} alt="Logo Vinted" className="logo" />
          </Link>

          {/* Barre de recherche */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Recherche des articles"
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Boutons de navigation */}
          <div className="header-buttons">
            <button className="btn" onClick={() => navigate("/signup")}>
              S'inscrire
            </button>

            <button className="btn">Se connecter</button>
            <button className="btn highlight">Vends tes articles</button>
          </div>
        </div>

        {/* Filtres bas du header */}
        <div className="header-filters">
          <div className="filter-item">
            <label htmlFor="sort-price">Trier par prix :</label>
            <input type="checkbox" id="sort-price" />
          </div>

          <div className="filter-item">
            <label>Prix max : {priceRange} €</label>
            <div className="range-container">
              <span>10€</span>
              <input
                type="range"
                min="10"
                max="500"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                style={{ accentColor: "#2ecc71" }}
              />
              <span>500€</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
