import style from "./Card.module.css";
import React from 'react';
import { Link, NavLink } from "react-router-dom";
import {connect} from 'react-redux';
import { addFav, removeFav } from "../../redux/actions";
import { useState, useEffect } from "react";


function Card(props) {

 


   const handleClose = () => {
      props.onClose(props.id)
   };

 const [isFav, setIsFav] = useState(false);

 const handleFavorite = () =>{
  
   if (isFav) {
      props.removeFav(props.id);
    } else {
      props.addFav(props);
    }
    setIsFav(!isFav);
 }

 useEffect(() => {
   props.myFavorites.forEach((fav) => {
      if (fav.id === props.id) {
         setIsFav(true);
      }
   });
}, [props.myFavorites]);


   return (

<div className={style.card}>
<div className={style.fav}>
         {
         isFav ? (
            <button className={style.button} onClick={handleFavorite}>❤️</button>
         ) : (
            <button className={style.button} onClick={handleFavorite}>🤍</button>
         )
      }
         </div>
<img src={props.image} alt=''  className={style.img} /> 
 <div className={style.textBox} >

 <NavLink to={`/detail/${props.id}`} className={`${style.text} ${style.head}`} style={{ textDecoration: 'none', color: '#e2d240  ', backgroundColor: "#4c4b30", fontSize: "1.5em", }}>

    <p style={{padding: "3px"}}>{props.name}</p>
    </NavLink>

    <span>Species</span>
  
         <p className={`${style.text} ${style.price}`}>{props.species}</p>
         <span>Gender</span>
         <p className={`${style.text} ${style.price}`}>{props.gender}</p>
  </div>

  <button  onClick={()=>{handleClose()}} className={style.button}  >X</button>  


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

