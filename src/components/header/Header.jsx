import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ token, handleToken }) => {
  return (
    <div className="navBar">
      <Link to="/">Accueil</Link>
      <div className="right-buttons">
        {token ? (
          <Link
            onClick={() => {
              handleToken(null);
            }}
          >
            Se déconnecter
          </Link>
        ) : (
          <>
            <Link to="/login">Se connecter</Link>
            <Link to="/signup">S'inscrire</Link>
          </>
        )}

        <Link to={token ? "/publish" : "/login"} className="publish-button">
          Vends un article !
        </Link>
      </div>
    </div>
  );
};

export default Header;
