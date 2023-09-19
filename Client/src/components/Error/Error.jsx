import React from "react";
import { useParams } from "react-router-dom";
import { useMatch } from "react-router-dom";
import style from './Error.module.css'

export default function () {



    return(
        <div class="container">
        <p class="overlay-text">Error 404</p>
        <p class="overlay-text">This site doesn't exist</p>
        <img class='imagen' src="1366_2000.jpeg"/>
    </div>
        
    )
}