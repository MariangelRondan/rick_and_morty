import axios from "axios";

export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";
export const FILTER = "FILTER";
export const ORDER = "ORDER";
export const RESET = "RESET";

export const GET_FAVORITES = "GET_FAVORITES";

export const addFav = (character, user) => {
  console.log("character:", character);
  console.log("user:", user);
  const endpoint = "http://localhost:3001/rickandmorty/fav";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, { ...character, user });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};
export const getFav = (user) => {
  const endpoint = `http://localhost:3001/rickandmorty/fav/${user}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: ADD_FAV,
        payload: data,
      });
    } catch (error) {}
  };
};

export const removeFav = (id, user) => {
  console.log(id);
  console.log(user);

  const endpoint = `http://localhost:3001/rickandmorty/fav/${id}?user=${user}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint);
      return dispatch({
        type: REMOVE_FAV,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const filterCards = (gender) => {
  return {
    type: FILTER,
    payload: gender,
  };
};

export const orderCards = (order) => {
  return {
    type: ORDER,
    payload: order,
  };
};
export const resetFav = () => {
  return {
    type: RESET,
  };
};
