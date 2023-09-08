import React from 'react';
import {connect} from 'react-redux';
import Card from '../Card/Card';
import style from './Favorites.module.css'

const Favorites = (props) =>{

return(
    <div className={style.container}>

{props.myFavorites.map((character)=>{ //mapea el arreglo del estado global myFavorites
    return (

        <Card
        key={character.id}
        id={character.id}
        status={character.status} 
        species={character.species} 
        gender={character.gender}
        origin={character.origin.name} 
        image={character.image} 
   onClose = {props.onClose}
        />)
})}
        
    </div>
   
)


}

function mapStateToProps (state){
    return {
        myFavorites: state.myFavorites,
    }
    }

export default connect(mapStateToProps, null)(Favorites);