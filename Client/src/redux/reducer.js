import { ADD_FAV, REMOVE_FAV, ORDER, FILTER } from "./actions";

const initialState = {
  myFavorites: [],
  allCharacters: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //cambié la logica de add_fav y remove_fav
    case ADD_FAV:
      return {
        ...state,
        myFavorites: action.payload,
        allCharacters: action.payload,
      };

    case REMOVE_FAV:
      return { ...state, myFavorites: action.payload };

    case FILTER:
      let copy3 = state.allCharacters.filter(
        (character) => character.gender === action.payload
      );
      return {
        ...state,
        myFavorites: copy3,
      };

    case ORDER:
      let copy4 = state.allCharacters;
      let order = copy4.sort((a, b) => {
        if (action.payload === "A") {
          return a.id - b.id;
        } else if (action.payload === "B") {
          return b.id - a.id;
        } else {
          return 0;
        }
      });
      return {
        ...state,
        myFavorites: order,
      };
    default:
      return state;
  }
};

export default rootReducer;
