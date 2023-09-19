import { ADD_FAV, REMOVE_FAV, ORDER, FILTER } from "./actions";

const initialState = {
  myFavorites: [],
  allCharacters: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAV:
      let copy1 = state.allCharacters;
      copy1.push(action.payload);
      return {
        ...state,
        myFavorites: copy1,
        allCharacters: copy1,
      };

    case REMOVE_FAV:
      let copy2 = state.myFavorites.filter(
        (favorite) => favorite.id != action.payload
      );
      return {
        ...state,
        myFavorites: copy2,
      };
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
