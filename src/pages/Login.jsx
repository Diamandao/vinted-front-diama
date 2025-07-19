import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Assure-toi que ce fichier existe

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        Cookies.set("token", response.data.token);
        setUser(response.data.token);
        navigate("/");
      }
    } catch (err) {
      setError("Identifiants incorrects ou problème serveur.");
    }
  };

  return (
    <div className="login-container">
      <h2>Se connecter</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Se connecter</button>
      </form>
      <div className="login-footer">
        <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
      </div>
    </div>
  );
};

export default Login;
