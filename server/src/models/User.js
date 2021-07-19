const Sequelize = require("sequelize");
const connection = require("./Database");

const Users = connection.define("users", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// IMPORTANT! ONLY UNCOMMENT THIS LINE ABOVE IF YOU WANT CREATE A NEW TABLE!
// Users.sync({ force: true });

module.exports = Users;
