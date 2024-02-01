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
import Swal from 'sweetalert2';

const url = process.env.REACT_APP_BACK_URL;



function App() {
  const [characters, setCharacters] = useState([]);

  const onSearch = async (id) => {
    try {
      const { data } = await axios(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      if (data.name) {
        const alreadyExist = characters.find(
          (character) => character.id === data.id
        );
        if (!alreadyExist) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else{
          Swal.fire(
            'Character already added!',
            '',
            'warning'
          )
        }
      }
    } catch (error) {
      Swal.fire(
        ` Character with ID: ${id} was not found!`,
         '',
         'error'
       )   }
  };

  const [addedCharacterIds, setAddedCharacterIds] = useState([]);

  const addRandomCharacter = () => {
    const randomId = Math.floor(Math.random() * 826) + 1; // Hay 826 personajes en la API

    if (!addedCharacterIds.includes(randomId)) {
      axios(`https://rickandmortyapi.com/api/character/${randomId}`).then(
        ({ data }) => {
          if (data.name) {
            setCharacters([...characters, data]);
            setAddedCharacterIds((oldIds) => [...oldIds, randomId]);
          }
        }
      );
    } else {
      addRandomCharacter();
    }
  };

  const onClose = (id) => {
    const nuevoArray = characters.filter((character) => character.id !== id);
    setCharacters(nuevoArray);
  };

  const location = useLocation();
  const navigate = useNavigate();

  const [access, setAccess] = useState(localStorage.getItem('access') || null);

  async function login(userData) {
    try {
      const { email, password } = userData;
      const URL = `${url}/rickandmorty/login/`;
      const { data } = await axios(
        URL + `?email=${email}&password=${password}`
      );
      const { access } = data;
      setAccess(data);
      localStorage.setItem('access', access);
      access && navigate("/home");
    } catch (error) {
      Swal.fire(
        'Login error, try again!',
        '',
        'error'
      )
    }
  }

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  //logOut
  const logOut = () => {
    setAccess(false);
    navigate("/");
  };

  const backgroundStyle = {
    "/": {
      backgroundImage: "url('login.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      width: "100%",
    },
  };

  return (
    <div
      id="container"
      className="App"
      style={backgroundStyle[location.pathname] || {}}
    >
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
