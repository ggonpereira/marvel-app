import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import useFavorite from "../../hooks/useFavorite.js";

import { Toaster } from 'react-hot-toast';

import Header from "../../components/Header/index";
import ItemMultiple from "../../components/ItemMultiple/index";

import "./styles.scss";

export default function Comic() {
  const { request } = useFetch();
  const [comicData, setComicData] = useState(null);
  const [charactersInData, setCharactersInData] = useState(null);
  const params = useParams();
  const comicId = params.id;

  const { handleAddFavorite, handleRemoveFavorite, favoritesList, verifyIfFavorited } = useFavorite();

  // Fetch the comic data
  useEffect(() => {
    async function fetchData() {
      const { json } = await request(`https://gateway.marvel.com/v1/public/comics/${comicId}?ts=stoneandmarvel&apikey=6cc659fd37766ed5726c0263c661550c&hash=22ccdb1acca211bae0b84188b1828d17`);
      const response = await json.data.results[0];

      setComicData(response);      
    }
    fetchData();
  }, [comicId, request]);

  // Fetch all the characters that the character is included
  useEffect(() => {
    async function fetchData() {
      const { json } = await request(`https://gateway.marvel.com/v1/public/comics/${comicId}/characters?ts=stoneandmarvel&apikey=6cc659fd37766ed5726c0263c661550c&hash=22ccdb1acca211bae0b84188b1828d17`);
      const response = await json.data.results;

      setCharactersInData(response);
    }

    fetchData();
  }, [comicId, request]);

  function makeFavoriteBtn(type) {
    if (verifyIfFavorited(favoritesList, "id", type.id)) {
      return <p onClick={() => handleRemoveFavorite(type.id)}>Remover favorito</p>
    }
    return <p onClick={() => handleAddFavorite(type)}>Favoritar</p>
  }

  return (
    <>
      <Header />
      <div id="comic-page">
      <Toaster />

      { comicData ? (
        <>
        <div className="content">
          <main>
            <h1>{comicData.title}</h1>
            <p>
              {comicData.description}
            </p>
            <img src={`https://images.weserv.nl/?url=${comicData.thumbnail.path}.${comicData.thumbnail.extension}`} alt={comicData.title} />
          </main>
          <aside>
            <strong>ID:</strong> {comicData.id}

            { makeFavoriteBtn(comicData) }
            {/* Verifying if the comic have a wiki page */}
            { comicData.urls[1] && <a href={comicData.urls[1].url} target="_blank" rel="noreferrer">Visitar Wiki</a> }
          </aside>
        </div>

        <section>
        { charactersInData ? (
          <>
          <h2>Personagens que aparecem na HQ:</h2>
          
          <div className="content-grid">
            {charactersInData && charactersInData.map((comic) => {
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
          </>
          ) : <p>Carregando dados...</p> }
        </section>
        </>
      ) : <p>Carregando dados...</p> }
      
    </div>
    </>
  );
}
