import React from "react";
import axios from "axios";
import { useParams} from "react-router-dom";
import { useState, useEffect} from "react";
import style from "./Detail.module.css"
import Swal from 'sweetalert2';



const url = process.env.REACT_APP_BACK_URL;

export default function Detail() {
    const params = useParams();
    const [character, setCharacter] = useState({});
    const [isLoading, setIsLoading] = useState(true);
 

    useEffect(() => {
      axios(`${url}/rickandmorty/character/${params.id}`).then(
        ({ data }) => {
          if (data.name) {
            setCharacter(data);
            setIsLoading(false); 
          } else {
            Swal.fire(
             ` No data Fouund for character with ID: ${params.id}!`,
              '',
              'error'
            )
          }
        }
      );
    }, [params.id]);
  
    let content;
  
    if (isLoading) {
      content = <div className="loader">
      <div className="loader_cube loader_cube--color"></div>
       <div className="loader_cube loader_cube--glowing"></div>
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
      content = <p>Character's info NOT FOUND</p>;
    }
  
    return <div className="App">
      {content}
      
      </div>;
  }
  