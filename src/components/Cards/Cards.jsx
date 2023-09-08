import Card from '../Card/Card';
import style from './Cards.module.css'
import React from 'react';

export default function Cards(props) {
   return <div className={style.container}>
       {props.characters.map(( character)=>{
        return (
<Card 
key={character.id} 
     id={character.id} 
     name={character.name} 
     status={character.status} 
     species={character.species} 
     gender={character.gender}
     origin={character.origin.name} 
     image={character.image} 
onClose = {props.onClose}
/>)
})}
   </div>;  }
   
//de la propiedad characters, que es un arreglo de objetos (en data.js), en app.js le mando todo el arreglo a characters, y cards, 
//trae todo ese arreglo y lo itera con un map

//usando DETRUCTURING
// export default function Cards({characters}) {
//         return <div>
//                 {
//             characters.map(({id, name, status, species, gender, image}) =>
//      <Card
//           key={id} 
//           name={name} 
//           status={status} 
//           species={species} 
//           gender={gender}
//           origin={origin.name} 
//           image={image} 
//           onClose = {()=>window.alert("Emulamos que se cierra la card")}
//      />
//              )
//                 }
//         </div>;
//      }