const express = require("express");
const router = express.Router();
const userController = require("./src/controllers/userController");
const favoriteController = require("./src/controllers/favoriteController");
const { validateToken } = require("./src/utils/JWT");

// Authentication routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Edit user data route
router.post("/editUser", validateToken, userController.editUser);

// Favorite routes
router.post("/getFavorites", validateToken, favoriteController.getFavorites);
router.post("/saveFavorites", validateToken, favoriteController.saveFavorites);

module.exports = router;
