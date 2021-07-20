import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/index";
import Input from "../../components/Input/index";
import ItemSingle from "../../components/ItemSingle/index";

import { Toaster } from 'react-hot-toast';

import useFetch from "../../hooks/useFetch.js";
import useFavorite from "../../hooks/useFavorite.js";
import { AuthContext } from "../../contexts/AuthContext";

import ironMan from "../../assets/images/iron-man.png";
import hq from "../../assets/images/hq.png";
import hulk from "../../assets/images/hulk.png";
import "./styles.scss";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState(null);
  const { request, loading, error } = useFetch();
  
  const { handleAddFavorite, handleRemoveFavorite, favoritesList } = useFavorite();

  const { authenticated } = useContext(AuthContext);

  function handleInputChange({target}) {
    const text = target.value;

    setInputValue(text);  
  }

  async function handleSearchData(type, id) {
    const { json } = await request(`
      https://gateway.marvel.com/v1/public/${type}/${id}?ts=stoneandmarvel&apikey=6cc659fd37766ed5726c0263c661550c&hash=22ccdb1acca211bae0b84188b1828d17
    `);

    function verifyType(receivedType, receivedJson) {
      receivedType === "characters" ? setCharacter(receivedJson) : setComics(receivedJson);
    }

    if (json) {
      verifyType(type, json);
    } else {
      console.log("Ocorreu um erro.")
    }
  }

  return (
    <>
      <Header />
      <div id="home-page">
      <Toaster />

      { !authenticated ? (
        <section>
          <h2>Por favor, <Link to="/register">registre-se</Link> ou <Link to="/login">faça login</Link> para utilizar a aplicação</h2>
          <img src={hulk} alt="Hulk" />
        </section>
      ) : (
        <main>
          <div className="characters">
            <h2>Buscar personagens</h2>
            <img src={ironMan} alt="Homem de Ferro" className="spotlight-img" />
            <small>Confira a lista com o ID dos personagens <a href={`https://gateway.marvel.com/v1/public/characters?ts=stoneandmarvel&apikey=6cc659fd37766ed5726c0263c661550c&hash=22ccdb1acca211bae0b84188b1828d17`}>nesse link</a></small>
            <Input 
              inputFunc={handleInputChange} 
              buttonFunc={handleSearchData} 
              type="characters" 
              id={inputValue} 
            />
            { loading && <p>Carregando...</p>}
            { error && <p>Ocorreu um erro.</p>}

            { character && (
              <div className="character-result">
                {/* Verifications to show the searched character */}
                { !loading && !error && character && (
                  character.code === 200 
                    ? <ItemSingle 
                        inputItem={character} 
                        handleAddFavorite={handleAddFavorite} 
                        handleRemoveFavorite={handleRemoveFavorite} 
                        favoritesList={favoritesList} 
                      /> 
                    : <p style={{textAlign: "center"}}>Ocorreu um erro. Busque o personagem pelo<br/> ID que você pode encontrar <a href={`https://gateway.marvel.com/v1/public/characters?ts=stoneandmarvel&apikey=6cc659fd37766ed5726c0263c661550c&hash=22ccdb1acca211bae0b84188b1828d17`}>nesse link</a></p>
                ) }
              </div>
            )} 
        </div>

        <div className="comics">
          <h2>Buscar quadrinhos</h2>
          <img src={hq} alt="Quadrinho da Marvel" className="spotlight-img" />
          <small>Confira a lista com o ID dos quadrinhos <a href={`https://gateway.marvel.com/v1/public/comics?ts=stoneandmarvel&apikey=6cc659fd37766ed5726c0263c661550c&hash=22ccdb1acca211bae0b84188b1828d17`}>nesse link</a></small>
          <Input 
            inputFunc={handleInputChange} 
            buttonFunc={handleSearchData} 
            type="comics"
            id={inputValue} 
          />
          { loading && <p>Carregando...</p>}
          { error && <p>Ocorreu um erro.</p>}

          <div className="comics-result">
            {/* Verifications to show the searched comic */}
            { !loading && !error && comics && (
              comics.code === 200 
                ? <ItemSingle 
                    inputItem={comics} 
                    handleAddFavorite={handleAddFavorite} 
                    handleRemoveFavorite={handleRemoveFavorite} 
                    favoritesList={favoritesList} 
                  /> 
                : <p style={{textAlign: "center"}}>Ocorreu um erro. Busque o personagem pelo<br/> ID que você pode encontrar <a href={`https://gateway.marvel.com/v1/public/comics?ts=stoneandmarvel&apikey=6cc659fd37766ed5726c0263c661550c&hash=22ccdb1acca211bae0b84188b1828d17`}>nesse link</a></p>
            ) }
          </div>
        </div>
      </main>
      ) }
    </div>
    </>
  )
}