import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--backend-leboncoincoin--nksmjkmnbqhd.code.run/user/login",
        // "http://localhost:3000/user/login",
        { email, password }
      );

      // console.log(response.data);
      if (response.data.token) {
        handleToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1>Se connecter</h1>
      <div>
        <form onSubmit={handleSubmit}>
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

          <button>Se connecter</button>
        </form>
      </div>
    </main>
  );
};

export default Login;
