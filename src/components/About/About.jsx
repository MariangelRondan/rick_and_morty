import React from "react";
import style from './About.module.css'

export default function About(){
    return (
        <div className={style.container} >
<h1>Welcome to my Rick and Morty App</h1>

<p className={style.description}>

Hello, I'm Mariangel Rondan, 23 years old, residing in Uruguay.</p> <p>I developed a Single Page Application (SPA) that collects data from characters through an external API and presents them in various ways. You can search for characters by ID, click the "Random" button to display characters randomly, and you also have the option to add them to your favorites.

Clicking on a character takes you to a detailed section where you'll find more comprehensive information about each one. The SPA is connected to an SQL database where registered users are stored. 
</p> <p>The authentication system allows registered users stored in the database to log in, and their favorites are also stored in the database.

Additionally, favorites are rendered in a specific section that offers sorting options alphabetically by name and a filter by gender.

</p> <p>The technologies I used in this project include JavaScript, HTML, React, Redux, Node.js, Express, PostgreSQL, Supertest, and Jest.</p>
<br/>

<img className={style.img} src="IMG_9305.jpg"/> 



       </div>

    )
}