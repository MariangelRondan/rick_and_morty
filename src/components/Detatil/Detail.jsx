import React from "react";
import axios from "axios";
import { useParams} from "react-router-dom";
import { useState, useEffect} from "react";
import style from "./Detail.module.css"
const url = process.env.REACT_APP_BACK_URL;

export default function Detail() {
    const params = useParams();
    const [character, setCharacter] = useState({});
    const [isLoading, setIsLoading] = useState(true);
 

    useEffect(() => {
      axios(`${BACK_URL}/rickandmorty/character/${params.id}`).then(
        ({ data }) => {
          if (data.name) {
            setCharacter(data);
            setIsLoading(false); 
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
        <div className={style.card}>
          <div>
          <img className={style.image} src={character.image} alt="" />
          </div>
          <div className={style.text}>
          <p><strong>Name: </strong>{character.name}</p>
          <p> <strong>ID: </strong>{character.id}</p>
          <p><strong>Status: </strong> {character.status}</p>
          <p><strong>Species: </strong> {character.species}</p>
          <p><strong>Gender: </strong> {character.gender}</p>
          <p><strong>Origin: </strong> {character.origin.name}</p> 
          </div>
        </div>
      );
    } else {
      content = <p>No se encontraron datos para el personaje.</p>;
    }
  
    return <div className="App">
      {content}
      
      </div>;
  }
  