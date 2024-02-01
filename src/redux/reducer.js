import { ADD_FAV, REMOVE_FAV, ORDER, FILTER, GET_FAVORITES, RESET } from "./actions";

const initialState = {
  myFavorites: [],
  allCharacters: [],
  allFavorites: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAV:
      return {
        ...state,
        myFavorites: action.payload,
        allCharacters: action.payload,
      };

    case REMOVE_FAV:
      return { ...state, myFavorites: action.payload };

    case GET_FAVORITES:
      return { allFavorites: action.payload };

    case FILTER:
      let genderFilter = state.allCharacters.filter(
        (character) => character.gender === action.payload
      );
      return {
        ...state,
        myFavorites: genderFilter,
      };

    case ORDER:
      const allCharactersCopy = [...state.allCharacters]
      return {
        ...state,
        myFavorites:
        action.payload === "A"
        ? allCharactersCopy.sort((a, b)=> a.id - b.id)
        : allCharactersCopy.sort((a, b)=> b.id - a.id)
      }       

      case RESET:
        return{
          ...state,
          myFavorites: state.allCharacters
      }

    default:
      return state;
  }
};

export default rootReducer;
