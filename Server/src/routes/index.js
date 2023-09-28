const getCharById = require("../controller/getCharById");
const { postFavs, deleteFavs } = require("../controller/handleFavorites");
const login = require("../controller/login");
const express = require("express");

const router = express.Router();

router.get("/character/:id", getCharById);

router.get("/login", login);

router.post("/fav", postFavs);

router.delete("/fav/:id", deleteFavs);

module.exports = router;
