import React from 'react';
import {connect} from 'react-redux';
import Card from '../Card/Card';
import style from './Favorites.module.css'
import { useDispatch } from 'react-redux';
import { orderCards, filterCards } from '../../redux/actions';
import { useEffect } from 'react';

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
    <div onChange={style.container}>
<select onChange={handlerOrder}>
<option value='A'>Ascendente</option>
<option value='B'>Descendente</option>
</select>

<select onChange={handlerFilter} >
<option value='Male'>Ascendente</option>
<option value='Female'>Descendente</option>
<option value='Genderless'>Genderless</option>
<option value='Unknown'>Unknown</option>
</select>

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