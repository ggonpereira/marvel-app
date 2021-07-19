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
          { verifyIfFavorited(favoritesList, "id", actualComic.id) ? (
            <p onClick={() => handleRemoveFavorite(actualComic.id)}>Remover favorito</p>
          ) : <p onClick={() => handleAddFavorite(actualComic)}>Favoritar</p> }
        </div>
      ) :
      (
        <div className="item-card single">   
          <a href={`/character/${actualCharacter.id}`}>
            <img src={actualCharacter.thumbnail} alt={actualCharacter.name} />
            <h3>{actualCharacter.name}</h3>
          </a>
            <small><strong>ID:</strong> {actualCharacter.id}</small>
            { verifyIfFavorited(favoritesList, "id", actualCharacter.id) ? (
              <p onClick={() => handleRemoveFavorite(actualCharacter.id)}>Remover favorito</p>
            ) : <p onClick={() => handleAddFavorite(actualCharacter)}>Favoritar</p> }
        </div>
      )
    )
  );
}
