import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import Card from '../Card/Card';
import style from './Favorites.module.css'
import { useDispatch } from 'react-redux';
import { orderCards, filterCards,resetFav,getFav } from '../../redux/actions';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Favorites = () =>{
const dispatch = useDispatch()
const [aux, setAux] = useState(false)
const myFavorites = useSelector((state) => state.myFavorites);
let user;

user = localStorage.getItem("user")
useEffect(() => {
    dispatch(getFav(user));
  }, [dispatch]);


const handlerOrder = (e) => {
dispatch(orderCards(e.target.value))
setAux(!aux)
}
const handlerFilter = (e) => {
dispatch(filterCards(e.target.value))
}
const handleReset = () => {
    dispatch(resetFav())
}
return(
    <div className={style.container}>
<div>
<select   onChange={handlerOrder}>
<option value="" disabled selected>Select an option</option>

<option  value='A'>Ascendente</option>
<option value='B'>Descendente</option>
</select>

<select onChange={handlerFilter} >
<option value="" disabled selected>Select an option</option>

<option value='Male'>Male</option>
<option value='Female'>Female</option>
<option value='Genderless'>Genderless</option>
<option value='Unknown'>Unknown</option>
</select>

<button className={style.reset} onClick={handleReset}>Reset</button>

</div>
    <div className={style.containerCards}>
{myFavorites.map((character)=>{
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