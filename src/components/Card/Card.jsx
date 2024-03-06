import style from "./Card.module.css";
import React from 'react';
import {  NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { addFav, removeFav } from "../../redux/actions";
import { useState, useEffect } from "react";



function Card(props) {
   const {id, name, species, gender,  image, onClose, addFav, removeFav, myFavorites} = props;
   let user;
   user = localStorage.getItem("user") 
   const handleClose = () => {
      onClose(id)
   };

 const [isFav, setIsFav] = useState(false);

 const handleFavorite = () => {
   isFav ? removeFav(id, user) : addFav(props, user);
   setIsFav(!isFav);
  };


useEffect(()=> {
   myFavorites.forEach((fav)=> {
       if(fav.id === id){
           setIsFav(true)
       }
   })
}, [myFavorites])


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
<img src={image} alt=''  className={style.img} /> 
 <div className={style.textBox} >

 <NavLink to={`/detail/${props.id}`} className={`${style.text} ${style.head}`} style={{ textDecoration: 'none', color: '#e2d240  ', backgroundColor: "#4c4b30", fontSize: "1.5em", }}>

    <p className={style.name} >{name}</p>
    </NavLink>

    <span>Species</span>
         <p className={`${style.text} ${style.price}`}>{species}</p>
         <span>Gender</span>
         <p className={`${style.text} ${style.price}`}>{gender}</p>
  </div>

  <button  onClick={()=>{handleClose()}} className={style.button}  >X</button>  


  </div>
  
   
    
 );
}

function mapDispatchToPorps(dispatch){
return {
addFav: (character,user) => {
   dispatch(addFav(character,user))
},
removeFav: (id,user) => {
dispatch(removeFav(id,user))
}
}
}

function mapStateToProps(state){
return {
   myFavorites: state.myFavorites,
}
}

export default connect(mapStateToProps, mapDispatchToPorps)(Card)

