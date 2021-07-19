import { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import api from "../api";

import toast from "react-hot-toast";

export default function useFavorite() {
  const token = localStorage.getItem("token");
  const { userInfo } = useContext(AuthContext);

  const [favoritesList, setFavoritesList] = useState([]);

  const fetchData = useCallback(async () => {
    const { data } = await api.post("/getFavorites", {
      token: token ? token : "",
      userId: userInfo.id ? userInfo.id : "",
    });

    if (data) {
      setFavoritesList(data);
      return;
    }

    setFavoritesList([]);
  }, [token, userInfo.id]);

  // Effect to get the favorites list in the database
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Add new favorite into favoritesList state and save it into database (throught "postData")
  const handleAddFavorite = (obj) => {
    const toBeFavorited = obj;

    const newFavoritedList = [...favoritesList, toBeFavorited];
    const newArray = [
      ...new Map(
        newFavoritedList.map((item) => [JSON.stringify(item), item])
      ).values(),
    ];

    postData(newArray);
    toast.success("Adicionado aos favoritos!");
  };

  // Save the list of favorites into DB
  async function postData(newArray) {
    await api.post("/saveFavorites", {
      token: token,
      userId: userInfo.id,
      favorites: JSON.stringify(newArray),
    });

    await fetchData();
  }

  // Check in the favorites list if character/comic is already favorited
  function verifyIfFavorited(list, key, val) {
    if (list.length > 0) {
      for (let i in list) {
        if (list[i][key] === val) {
          return true;
        }
      }
    }
    return false;
  }

  // Remove the list of favorites into DB
  const handleRemoveFavorite = (id) => {
    const objIdToBeRemoved = id;

    const newArray = favoritesList.filter(function (favorite) {
      return favorite.id !== objIdToBeRemoved;
    });

    postData(newArray);

    toast.success("Removido dos favoritos!");
  };

  return {
    handleAddFavorite,
    handleRemoveFavorite,
    favoritesList,
    verifyIfFavorited,
  };
}
