import React from 'react';
import {connect} from 'react-redux';
import Card from '../Card/Card';
import style from './Favorites.module.css'
import { useDispatch } from 'react-redux';
import { orderCards, filterCards } from '../../redux/actions';
import { useState } from 'react';
import styles from "../NavBar/NavBar.module.css"

const Favorites = (props) =>{
const dispatch = useDispatch()
const [aux, setAux] = useState(false)

const handlerOrder = (e) => {
dispatch(orderCards(e.target.value))
setAux(!aux)
}
const handlerFilter = (e) => {
dispatch(filterCards(e.target.value))
}

return(
    <div className={style.container}>

<select   onChange={handlerOrder}>
<option  value='A'>Ascendente</option>
<option value='B'>Descendente</option>
</select>

<select onChange={handlerFilter} >
<option value='Male'>Male</option>
<option value='Female'>Female</option>
<option value='Genderless'>Genderless</option>
<option value='Unknown'>Unknown</option>
</select>
    <div className={style.containerCards}>

{props.myFavorites.map((character)=>{ //mapea el arreglo del estado global myFavorites
    return (
        <Card
        key={character.id}
        id={character.id}
        status={character.status} 
        species={character.species} 
        gender={character.gender}
        origin={character.origin} 
        image={character.image} 
        />)
})}
        
    </div>
    </div>
   
)


}

function mapStateToProps (state){
    return {
        myFavorites: state.myFavorites,
    }
    }

export default connect(mapStateToProps, null)(Favorites);