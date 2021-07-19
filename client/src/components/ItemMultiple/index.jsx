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

  function makeThumbnail(type) {
    if (type.thumbnail.path) {
      return `${type.thumbnail.path}.${type.thumbnail.extension}`;
    }
    return type.thumbnail;
  }

  function makeFavoriteBtn(type) {
    if (verifyIfFavorited(favoritesList, "id", type.id)) {
      return <p onClick={() => handleRemoveFavorite(type.id)}>Remover favorito</p>
    }
    return <p onClick={() => handleAddFavorite(type)}>Favoritar</p>
  }

  let actualComic;
  comicData && (
    actualComic = {
      id: comicData.id,
      title: comicData.title,
      thumbnail: makeThumbnail(comicData),
      prices: comicData.prices
    }
  );

  let actualCharacter;
  characterData && (
    actualCharacter = {
      id: characterData.id,
      name: characterData.name,
      thumbnail: makeThumbnail(characterData),
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
            {makeFavoriteBtn(actualComic)}
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
              {makeFavoriteBtn(actualCharacter)}
            </div>
          </div>
        )
      )
    )
  )
}
