import "./App.css";
import Cards from "./components/Cards/Cards.jsx";
import About from "./components/About/About.jsx";
import Detail from "./components/Detatil/Detail.jsx";
import React from "react";
import NavBar from "./components/NavBar/NavBar.jsx";
import axios from "axios";
import Error from "./components/Error/Error";
import Form from "./components/Form/Form";
import { useLocation, useNavigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Favorites from "./components/Favorites/Favorites";
import Register from "./components/register/Register";

function App() {
  const [characters, setCharacters] = useState([]); //estado local incializado como un [] vacio
  const [containerHeight, setContainerHeight] = useState(0);

  const onSearch = async (id) => {
    try {
      const { data } = await axios(
        `http://localhost:3001/rickandmorty/character/${id}`
      );
      console.log(data); // la respuesta de axios es un objeto, la prop data de ese obj tiene al personaje
      if (data.name) {
        //verifica que se haya encontrado el personaje (si data.name existe, encontro el personaje correctamente)
        const alreadyExist = characters.find(
          (character) => character.id === data.id
        );
        if (!alreadyExist) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          window.alert("Ese personaje ya ha sido agregado");
        }
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  //ejercico extra boton random
  const [addedCharacterIds, setAddedCharacterIds] = useState([]);

  const addRandomCharacter = () => {
    const randomId = Math.floor(Math.random() * 826) + 1; // Hay 826 personajes en la API

    // Verificar si el personaje ya ha sido agregado
    if (!addedCharacterIds.includes(randomId)) {
      axios(`https://rickandmortyapi.com/api/character/${randomId}`).then(
        ({ data }) => {
          if (data.name) {
            setCharacters([...characters, data]);
            setAddedCharacterIds((oldIds) => [...oldIds, randomId]); //va guardando los id que agrego, asi en la linea 34 se pregunta si ya esta en el array.
          } // setAddedCharacterIds((valorActualDelEstado) => [...valorActualDelEstado, valorAgregado]
        }
      );
    } else {
      addRandomCharacter(); // Intentar agregar otro personaje si ya se agregó este ID
    }
  };

  //cruz para cerrar card
  const onClose = (id) => {
    const nuevoArray = characters.filter((character) => character.id !== id);
    setCharacters(nuevoArray);
  };

  //para que nav NO aparezca en pathname = '/'
  const location = useLocation();
  const navigate = useNavigate();
  //seguridad
  const [access, setAccess] = useState(false);

  //nueva fn login que agregue en express
  async function login(userData) {
    try {
      const { email, password } = userData;
      const URL = "http://localhost:3001/rickandmorty/login/";
      const { data } = await axios(
        URL + `?email=${email}&password=${password}`
      );
      const { access } = data;

      setAccess(data);
      access && navigate("/home");
    } catch (error) {
      window.alert(error.message);
    }
  }

  // useEffect(() => {
  //   access && navigate("/home");
  // }, [access]);

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  //logOut
  const logOut = () => {
    setAccess(false);
    navigate("/");
  };

  //backgroundimage distintos para cada ruta

  const backgroundStyle = {
    // "/home": {
    //   backgroundImage: "url('https://images4.alphacoders.com/133/1335396.png')",

    //   backgroundSize: "auto", // Cambiado de 'cover' a 'auto'
    //   minHeight: "100vh", // Corregido el nombre de la propiedad
    //   backgroundPosition: "center",
    //   backgroundRepeat: "repeat",
    // },
    // "/favorites": {
    //   backgroundImage: "url('https://images4.alphacoders.com/133/1335396.png')",
    //   backgroundSize: "cover",
    //   backgroundPosition: "center",
    //   height: "100vh",
    //   width: "100%",
    // },

    "/register": {
      backgroundImage: "url('https://images.alphacoders.com/936/936934.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      width: "100%",
    },
    "/": {
      backgroundImage: "url('https://images.alphacoders.com/936/936934.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      width: "100%",
    },
  };

  return (
    //renderiza..
    <div
      id="container"
      className="App"
      style={backgroundStyle[location.pathname] || {}}
    >
      {/* renderizado condicional de NavBar*/}
      {location.pathname !== "/" && location.pathname !== "/register" ? (
        <NavBar
          random={addRandomCharacter}
          onSearch={onSearch}
          logOut={logOut}
        />
      ) : (
        ""
      )}

      <Routes>
        <Route
          // style={backgroundStyle[location.pathname]}
          path="/register"
          element={<Register />}
        />
        <Route path="/" element={<Form login={login} />} />
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        />

        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<Error />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
