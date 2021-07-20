import React, { useState } from 'react'
import api from "../../api";

import { useHistory } from "react-router-dom";

import Header from "../../components/Header/index";
import spiderMan from "../../assets/images/spider-man.png";

import "../Login/styles.scss";

export default function Register() {
  const [usernameReg, setUsernameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);  
  const history = useHistory();

  const registerUser = async () => {
    const request = await api.post("/register", {
      username: usernameReg, 
      email: emailReg, 
      password: passwordReg
    })

    if (request.data.message) {
      setErrorMsg(request.data.message);
    } else {
      history.push("/login")
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    registerUser();
  }

  return (
    <>
      <Header />
      <div id="register-page">
      <main>
        <img src={spiderMan} className="character-img" alt="" />
        <h1>Faça já seu registro em nossa aplicação!</h1>
        <p>Após se registrar, você poderá desfrutar de nossos serviços<br/> e divertir-se explorando o mundo da Marvel Comics.</p>
      
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nome</label>
            <input 
              id="name" 
              type="text" 
              name="name" 
              required
              onChange={(e) => setUsernameReg(e.target.value)} 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input 
              id="email" 
              type="email" 
              name="email" 
              required
              onChange={(e) => setEmailReg(e.target.value)} 
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
                onChange={(e) => setPasswordReg(e.target.value)}
              />
              <small onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Ocultar" : "Mostrar"}</small>
            </div>
          </div>

          <small>{errorMsg}</small>

          <button type="submit">Registrar</button>
        </form>
      </main>
    </div>
    </>    
  )
}
