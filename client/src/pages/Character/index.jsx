import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import useFavorite from "../../hooks/useFavorite.js";

import { Toaster } from 'react-hot-toast';

import Header from "../../components/Header/index";
import ItemMultiple from "../../components/ItemMultiple/index";

import "../Comic/styles.scss";

export default function Character() {
  const { request } = useFetch();
  const [characterData, setCharacterData] = useState(null);
  const [comicsInData, setComicsInData] = useState(null);
  const params = useParams();
  const characterId = params.id;

  const { handleAddFavorite, handleRemoveFavorite, favoritesList, verifyIfFavorited } = useFavorite();

  // Fetch the character data
  useEffect(() => {
    async function fetchData() {
      const { json } = await request(`https://gateway.marvel.com/v1/public/characters/${characterId}?ts=stoneandmarvel&apikey=6cc659fd37766ed5726c0263c661550c&hash=22ccdb1acca211bae0b84188b1828d17`);
      const response = await json.data.results[0];

      setCharacterData(response);      
    }
    fetchData();
  }, [characterId, request]);

  // Fetch all the comics that the character is included
  useEffect(() => {
    async function fetchData() {
      const { json } = await request(`https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=stoneandmarvel&apikey=6cc659fd37766ed5726c0263c661550c&hash=22ccdb1acca211bae0b84188b1828d17`);
      const response = await json.data.results;

      setComicsInData(response);
    }

    fetchData();
  }, [characterId, request])

  function makeFavoriteBtn(type) {
    if (verifyIfFavorited(favoritesList, "id", type.id)) {
      return <p onClick={() => handleRemoveFavorite(type.id)}>Remover favorito</p>
    }
    return <p onClick={() => handleAddFavorite(type)}>Favoritar</p>
  }

  return (
    <>
      <Header />
      <div id="character-page">
      <Toaster />

      { characterData ? (
        <>
        <div className="content">
          <main>
            <h1>{characterData.name}</h1>
            <p>
              {characterData.description}
            </p>
            <img src={`https://images.weserv.nl/?url=${characterData.thumbnail.path}.${characterData.thumbnail.extension}`} alt={characterData.name} />
          </main>
          <aside>
            <strong>ID:</strong> {characterData.id}
            { makeFavoriteBtn(characterData) }
            {/* Verifying if the character have a wiki page */}
            { characterData.urls[1] && <a href={characterData.urls[1].url} target="_blank" rel="noreferrer">Visitar Wiki</a> }
          </aside>
        </div>

        <section>
          <h2>HQs em que o personagem aparece:</h2>

          { comicsInData ? (
            <div className="content-grid">
              {comicsInData && comicsInData.map((comic) => {
                return (
                  <ItemMultiple 
                    inputItem={comic} 
                    key={comic.id} 
                    handleAddFavorite={handleAddFavorite} 
                    handleRemoveFavorite={handleRemoveFavorite} 
                    favoritesList={favoritesList} 
                  />
                )
              })}
            </div>
          ) : <p>Carregando dados...</p> }
        </section>
        </>
      ) : <p>Carregando dados...</p> }
    </div>
    </>
    
  );
}
