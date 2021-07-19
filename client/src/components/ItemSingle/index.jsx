import React from 'react';
import useFavorite from '../../hooks/useFavorite.js';

import "../ItemMultiple/styles.scss"

export default function ItemSingle({inputItem, handleAddFavorite, handleRemoveFavorite, favoritesList}) {
  const name = inputItem.data.results[0].name;
  const title = inputItem.data.results[0].title;
  const id = inputItem.data.results[0].id;
  const thumbnail = `${inputItem.data.results[0].thumbnail.path}.${inputItem.data.results[0].thumbnail.extension}`;
  const prices = inputItem.data.results[0].prices;
  const {verifyIfFavorited} = useFavorite();

  let actualComic;
  title && (
    actualComic = {
      id,
      title,
      thumbnail,
      prices
    }
  );

  let actualCharacter;
  name && (
    actualCharacter = {
      id,
      name,
      thumbnail,
    }
  );  

  function makeFavoriteBtn(type) {
    if (verifyIfFavorited(favoritesList, "id", type.id)) {
      return <p onClick={() => handleRemoveFavorite(type.id)}>Remover favorito</p>
    }
    return <p onClick={() => handleAddFavorite(type)}>Favoritar</p>
  }

  return (
    inputItem && (
      // Using the "title" to verify if is a character or comic. if is a character, "title" will be undefined
      title ? (
        <div className="item-card single">   
          <a href={`/comic/${actualComic.id}`}>
            <img src={actualComic.thumbnail} alt={actualComic.title} />
            <h3>{actualComic.title}</h3>
          </a>
            <small><strong>ID:</strong> {actualComic.id}</small>
            {makeFavoriteBtn(actualComic)}
        </div>
      ) :
      (
        <div className="item-card single">   
          <a href={`/character/${actualCharacter.id}`}>
            <img src={actualCharacter.thumbnail} alt={actualCharacter.name} />
            <h3>{actualCharacter.name}</h3>
          </a>
            <small><strong>ID:</strong> {actualCharacter.id}</small>
            {makeFavoriteBtn(actualCharacter)}
        </div>
      )
    )
  );
}
