const axios = require("axios");
const URL = "https://rickandmortyapi.com/api/character/";

const getCharById = (req, res) => {
  const { id } = req.params; //req.params es un objeto
  console.log(id);
  axios(URL + id)
    .then(({ data }) => {
      const { name, gender, species, origin, image, status } = data;
      const char = { name, gender, species, origin, image, status, id };
      if (!char.name) {
        res.status(404).send("Not found");
      } else {
        res.status(200).json(char);
      }
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
};

module.exports = getCharById;
