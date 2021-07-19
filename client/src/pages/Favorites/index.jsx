import useFavorite from "../../hooks/useFavorite.js"

import { Toaster } from 'react-hot-toast';

import Header from "../../components/Header/index";
import ItemMultiple from "../../components/ItemMultiple/index";

import "./styles.scss";

export default function Favorites() {
  const { handleAddFavorite, handleRemoveFavorite, favoritesList } = useFavorite();

  return (
    <>
      <Header />
      <div id="favorites-page">
      <Toaster />

      <main>
        <h2>Seus favoritos :)</h2>
    
        { favoritesList && favoritesList.length > 0 ? (
          <div className="content-grid">
            { favoritesList.map((favorite) => {
              return favorite && (
                <ItemMultiple 
                  key={favorite.id}
                  inputItem={favorite}
                  handleAddFavorite={handleAddFavorite} 
                  handleRemoveFavorite={handleRemoveFavorite} 
                  favoritesList={favoritesList} 
                />
              )
            })}     
          </div>
        ) : <h3 className="page-subtitle">Você ainda não favoritou nenhum personagem ou quadrinho :/</h3> }
      </main>
    </div>
    </>
  );
}