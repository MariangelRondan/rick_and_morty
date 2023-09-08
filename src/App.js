import "./App.css";
import Card from "./components/Card/Card.jsx";
import Cards from "./components/Cards/Cards.jsx";
import About from "./components/About/About.jsx";
import Detail from "./components/Detatil/Detail.jsx";
// import characters, { Rick } from './data.js';
import React from "react";
import { useState } from "react";
import NavBar from "./components/NavBar/NavBar.jsx";
import axios from "axios";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Error from "./components/Error/Error";
import Form from "./components/Form/Form";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Favorites from "./components/Favorites/Favorites";

function App() {
  //componente
  const [characters, setCharacters] = useState([]); //estado local incializado como un [] vacio

  const onSearch = (id) => {
    axios(`https://rickandmortyapi.com/api/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          //verifica que se haya encontrado el personaje (si data.name existe, encontro el personaje correctamente)
          const alreadyExist = characters.find(
            (character) => character.id === data.id
          );
          if (!alreadyExist) {
            setCharacters((oldChars) => [...oldChars, data]);
          }
        } else {
          window.alert("¡No hay personajes con este ID!");
        }
      }
    );
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
            setCharacters((oldChars) => [...oldChars, data]);
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
    const nuevoArray = characters.filter(
      (character) => character.id !== Number(id)
    );
    setCharacters(nuevoArray);
  };

  //para que nav NO aparezca en pathname = '/'
  const location = useLocation();

  //seguridad
  const [access, setAccess] = useState(false);

  const miEmail = "m";
  const miPassword = "m";
  const navigate = useNavigate();

  const login = (userData) => {
    if (userData.email === miEmail && userData.password === miPassword) {
      setAccess(true);
      navigate("/home");
    }
  };

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  //logOut
  const logOut = () => {
    setAccess(false);
    navigate("/");
  };

  return (
    //renderiza..
    <div className="App">
      {/* renderizado condicional de NavBar*/}
      {location.pathname !== "/" ? (
        <NavBar
          random={addRandomCharacter}
          onSearch={onSearch}
          logOut={logOut}
        />
      ) : (
        ""
      )}

      <Routes>
        <Route path="/" element={<Form permisos={login} />} />
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
