import React, { useEffect, useState } from 'react'
import useFavorite from '../../hooks/useFavorite.js';

import "./styles.scss"

export default function ItemMultiple({inputItem, handleAddFavorite, handleRemoveFavorite, favoritesList}) {
  const [comicData, setComicData] = useState(null);
  const [characterData, setCharacterData] = useState(null);
  const {verifyIfFavorited} = useFavorite();

  useEffect(() => {
    if (inputItem.prices) {
      setComicData(inputItem);
    } else {
      setCharacterData(inputItem);
    }
  }, [inputItem]);

  let actualComic;
  comicData && (
    actualComic = {
      id: comicData.id,
      title: comicData.title,
      thumbnail: (comicData.thumbnail.path ? `${comicData.thumbnail.path}.${comicData.thumbnail.extension}` : comicData.thumbnail),
      prices: comicData.prices
    }
  );

  let actualCharacter;
  characterData && (
    actualCharacter = {
      id: characterData.id,
      name: characterData.name,
      thumbnail: (characterData.thumbnail.path ? `${characterData.thumbnail.path}.${characterData.thumbnail.extension}` : characterData.thumbnail),
    }
  );

  return (
    inputItem && (
      comicData ? (
        <div className="content">
          <div className="item-card">
            <a href={`/comic/${actualComic.id}`}>
              <img src={actualComic.thumbnail} alt={actualComic.title} />
              <h3>{actualComic.title}</h3>
            </a>
              <small><strong>ID:</strong> {actualComic.id}</small>
            { verifyIfFavorited(favoritesList, "id", comicData.id) ? (
              <p onClick={() => handleRemoveFavorite(comicData.id)}>Remover favorito</p>
            ) : <p onClick={() => handleAddFavorite(actualComic)}>Favoritar</p> }
          </div>
        </div>
      ) 
      : (
        characterData && (
          <div className="content">
            <div className="item-card">
              <a href={`/character/${actualCharacter.id}`}>
                <img src={`${actualCharacter.thumbnail}`} alt={actualCharacter.name} />
                <h3>{actualCharacter.name}</h3>
              </a>
                <small><strong>ID:</strong> {actualCharacter.id}</small>
              { verifyIfFavorited(favoritesList, "id", actualCharacter.id) ? (
                <p onClick={() => handleRemoveFavorite(actualCharacter.id)}>Remover favorito</p>
              ) : <p onClick={() => handleAddFavorite(actualCharacter)}>Favoritar</p> }
            </div>
          </div>
        )
      )
    )
  )
}
