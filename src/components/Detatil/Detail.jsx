import React from "react";
import axios from "axios";
import { useParams} from "react-router-dom";
import { useState, useEffect} from "react";


export default function Detail() {
    const params = useParams();
    const [character, setCharacter] = useState({});
    const [isLoading, setIsLoading] = useState(true);
 

    //se ejecuta la callback de useEffect cada vez que cambia params.id
    useEffect(() => {
// dispatch(getCharacterDetail(params.id)) //guarda en el estado global
      axios(`http://localhost:3001/rickandmorty/character/${params.id}`).then(
        ({ data }) => {
          if (data.name) {
            setCharacter(data);
            setIsLoading(false); // Cambia el estado de isLoading cuando se obtienen los datos
          } else {
            window.alert("No hay personajes con ese ID");
          }
        }
      );
    }, [params.id]);
  
    let content;
  
    if (isLoading) {
      content = <div class="loader">
      <div class="loader_cube loader_cube--color"></div>
       <div class="loader_cube loader_cube--glowing"></div>
    </div>
    } else if (character.name) {
      content = (
        <div className="card">
          <h2>name={character.name}</h2>
          <h2>status={character.status}</h2>
          <h2>specie={character.species}</h2>
          <h2>gender={character.gender}</h2>
          <h2>origin={character.origin.name}</h2> 
          <img src={character.image} alt="" />
        </div>
      );
    } else {
      content = <p>No se encontraron datos para el personaje.</p>;
    }
  
    return <div className="App">
      {content}
      
      </div>;
  }
  