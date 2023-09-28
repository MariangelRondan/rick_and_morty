// import data from "../../data";
import style from "./Card.module.css";
import React from 'react';
import { Link } from "react-router-dom";
import Detail from "../Detatil/Detail";
import {connect} from 'react-redux';
import { addFav, removeFav } from "../../redux/actions";
import { useState, useEffect } from "react";


function Card(props) {
  
   const handleClose = () => {
      props.onClose(props.id)
      // props.removeFav(props.id)
   };

 const [isFav, setIsFav] = useState(false);

 const handleFavorite = () =>{
  
  if(isFav === true) {
   setIsFav(false) 
   props.removeFav(props.id)
  }
  if(isFav === false){
   setIsFav(true)
   props.addFav(props)
  }
  
 }

 useEffect(() => {
   props.myFavorites.forEach((fav) => {
      if (fav.id === props.id) {
         setIsFav(true);
      }
   });
}, [props.myFavorites]);


   return (
      <div className={style.card} >
       {
         isFav ? (
            <button onClick={handleFavorite}>❤️</button>
         ) : (
            <button onClick={handleFavorite}>🤍</button>
         )
      }
         <img src={props.image} alt=''  className={style.imagen} />
         <button  onClick={()=>{handleClose()}} className={style.button}  >X</button>  
      <div className={style.info}>
         <Link to={`/detail/${props.id}`}>
         <h2 className={style.name}>{props.name}</h2>
         </Link>
         <h2>{props.status}</h2>
         <h2>{props.species}</h2>
         <h2>{props.gender}</h2>
         <h2>{props.origin}</h2>
         </div>

         <hr></hr>
        
 <hr></hr>
     </div>
    
 );
}

function mapDispatchToPorps(dispatch){
return {
addFav: (character) => {
   dispatch(addFav(character))
},
removeFav: (id) => {
dispatch(removeFav(id))
}
}
}

function mapStateToProps(state){
return {
   myFavorites: state.myFavorites,
}
}

export default connect(mapStateToProps, mapDispatchToPorps)(Card)








//usando DETRUCTURING
// let Card = ({name, species,status, gender, origin, image, onClose}) => {
//    return(
//       <div className={style.card}>
//          <img className={style.imagen} src={image} alt='' />

//          <div className={style.info}>
//          <h2 className={style.name}>{name}</h2>
//          <h2>{status}</h2>
//          <h2>{species}</h2>
//          <h2>{gender}</h2>
//          <h2>{origin.name}</h2>     
//          </div>
              
//          <hr></hr>
//          <button className={style.button} onClick={onClose}>X</button>
//          <hr></hr>
        
//       </div>
//    )
// }



