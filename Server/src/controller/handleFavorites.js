let myFavorites = [];

const postFavs = (req, res) => {
  const { character } = req.body;
  myFavorites.push(character);

  res.json(myFavorites);
};

const deleteFavs = (req, res) => {
  const { id } = req.params;

  myFavorites = myFavorites.filter((fav) => {
    return fav.id !== id;
  });

  return res.json(myFavorites);
};

module.exports = { postFavs, deleteFavs };
