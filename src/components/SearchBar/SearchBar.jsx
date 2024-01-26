import style from './SearchBar.module.css'
import React from 'react';
import { useState } from 'react';

export default function SearchBar({onSearch}) { 
   const [id, setId] = useState("");

const handleChange = (event) => {
setId(event.target.value);
}

   return (
      
 
      <div className={style.agregar}>
         <input className={style.input}
          onChange={handleChange}
           type='search' 
           placeholder='Add characters by ID...' 
           value={id}/>

         <button className={style.button} onClick={() => {onSearch(id)}}>Agregar</button> 
     {/* recibe la funcion onSearch como prop desde el componente nav. La funcion onSearch    
    se pasa commo prop desde App.js, a traves del coponente intermedio Nav, y finalmente a SearchBar. */}

      </div>
   );
}
 