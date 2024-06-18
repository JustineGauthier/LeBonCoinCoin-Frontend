import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://site--backend-leboncoincoin--nksmjkmnbqhd.code.run/user/signup",
        // "http://localhost:3000/user/signup",
        { username, email, password, newsletter }
      );
      if (response.data.token) {
        handleToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email est déjà utilisé");
      } else if (error.response.data.message === "Missing parameters") {
        // Si je reçois le message Missing parameters
        setErrorMessage("Veuillez remplir tous les champs");
      }
    }
  };

  return (
    <main>
      <h1>S'inscrire</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            placeholder="Nom d'utilisateur"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            value={password}
            placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <input
            type="checkbox"
            checked={newsletter}
            onChange={() => {
              setNewsletter(!newsletter);
            }}
          />
          <label>Abonnez-vous à la newsletter</label>
          <button>S'inscrire</button>
        </form>
        <div>{errorMessage && <p>{errorMessage}</p>}</div>
      </div>
    </main>
  );
};

export default Signup;
