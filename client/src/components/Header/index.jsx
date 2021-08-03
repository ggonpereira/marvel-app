import { useContext } from "react";
import { Link } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext";

import signOut from "../../assets/images/sign-out.svg";
import siteLogo from "../../assets/images/logo.svg";
import "./styles.scss";

export default function Header() {
  const { authenticated, handleLogout } = useContext(AuthContext);

  return (
    <header>
      <Link to="/">
        <img src={siteLogo} alt="Site Logo" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Início</Link>
          </li>
          {!authenticated && (
            <>
            <li>
              <Link to="/register">Registrar</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            </>
          )}
          {authenticated && (
            <>
            <li>
              <Link to="/favorites">Favoritos</Link>
            </li>
            <li>
              <Link to="/profile">Perfil</Link>
            </li>
            <li>
              <button onClick={handleLogout}>
                <img src={signOut} alt="Sair" />
                Logout
              </button>
            </li>
            </>
          )}
          
        </ul>
      </nav>
    </header>
  );
}