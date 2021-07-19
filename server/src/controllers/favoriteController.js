const Favorite = require("../models/Favorite");

exports.saveFavorites = async (req, res) => {
  const datas = {
    userId: req.body.userId,
    favorites: req.body.favorites,
  };

  // Checking if the user already has a favorite list by finding if he it's inserted in the table
  const user = await Favorite.findOne({
    where: {
      userId: datas.userId,
    },
  });

  if (user) {
    user
      .update({
        favorites: datas.favorites,
      })
      .then(() => {
        res.json({ favoriteSaved: true });
      })
      .catch((err) => {
        res.json({ favoriteSaved: false, error: err });
      });
  } else {
    await Favorite.create({
      userId: datas.userId,
      favorites: datas.favorites,
    })
      .then(() => {
        res.json({ favoriteSaved: true });
      })
      .catch((err) => {
        res.json({ favoriteSaved: false, error: err });
      });
  }
};

exports.getFavorites = async (req, res) => {
  const user = await Favorite.findOne({
    where: {
      userId: req.body.userId,
    },
  });

  if (user) {
    return res.send(user.favorites);
  }

  return res.send("[]");
};
