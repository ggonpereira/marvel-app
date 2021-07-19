import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import api from "../../api";

import toast, { Toaster } from 'react-hot-toast';

import Header from "../../components/Header/index";
import capitainAmerica from "../../assets/images/capitain-america.png";

import "./styles.scss";

export default function Profile() {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const { errorMsg, setErrorMsg } = useState("");
  const [usernameLog, setUsernameLog] = useState("");
  const [emailLog, setEmailLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  async function changeUserDatas() {
    const token = localStorage.getItem("token");

    const { data: userData, message } = await api.post("/editUser", {
      userId: userInfo.id,
      token,
      newUsername: usernameLog,
      newEmail: emailLog,
      newPassword: passwordLog,
    });

    if (message) {
      setErrorMsg(message);
      toast.error('Ocorreu um erro ao atualizar seus dados!');
    } else {
      setUserInfo(userData);
      localStorage.setItem("data", JSON.stringify(userData));
      toast.success('Dados atualizados com sucesso!');
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    changeUserDatas();
  }

  return (
    <>
      <Header />
      <div id="profile-page">
      <Toaster />

      <main>
        <img src={capitainAmerica} className="character-img" alt="" />

        <h1>Olá, {userInfo.username}! Como vai?</h1>
        <p>Aqui você pode alterar seus dados.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Novo nome de usuário</label>
            <input 
              id="username" 
              type="text" 
              name="newUsername" 
              onChange={(e) => setUsernameLog(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Novo e-mail</label>
            <input 
              id="email" 
              type="email" 
              name="newEmail" 
              onChange={(e) => setEmailLog(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Nova senha</label>
            <input 
              id="password" 
              type="password" 
              name="newPassword" 
              onChange={(e) => setPasswordLog(e.target.value)}
            />
          </div>

          <small>{errorMsg}</small>

          <button type="submit">Alterar dados</button>
        </form>
      </main>
    </div>
    </>
  )
}
