const Sequelize = require("sequelize");
const connection = require("./Database");

const Favorites = connection.define("favorites", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  favorites: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

// IMPORTANT! ONLY UNCOMMENT THIS LINE ABOVE IF YOU WANT CREATE A NEW TABLE!
// Favorites.sync({ force: true });

module.exports = Favorites;
