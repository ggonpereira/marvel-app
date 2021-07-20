import React, { useState, useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext';

import Header from "../../components/Header/index";
import thor from "../../assets/images/thor.png";

import "./styles.scss";

export default function Login() {
  const [emailLog, setEmailLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [showPassword, setShowPassword] = useState(false);  
  const { handleLogin, errorMessage } = useContext(AuthContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(emailLog, passwordLog);
  }

  return (
    <>
      <Header />
      <div id="login-page">
      <main>
        <img src={thor} className="character-img" alt="" />
        <h1>Entre já e divirta-se!</h1>
        <p>Após fazer login você será redirecionado à página inicial<br/> para começar a utilizar nossa aplicação.</p>
      
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input 
              id="email" 
              type="email" 
              name="email" 
              required
              onChange={(e) => setEmailLog(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <div className="passwordInput">
              <input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                name="password"
                required
                onChange={(e) => setPasswordLog(e.target.value)}
              />
              <small onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Ocultar" : "Mostrar"}</small>
            </div>
          </div>

          <small>{errorMessage}</small>

          <button type="submit">Logar</button>
        </form>
      </main>
    </div>
    </>
  )
}
