import axios from "axios";
import Swal from 'sweetalert2';

export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";
export const FILTER = "FILTER";
export const ORDER = "ORDER";
export const RESET = "RESET";
const url = process.env.REACT_APP_BACK_URL;
export const GET_FAVORITES = "GET_FAVORITES";

export const addFav = (character, user) => {
  console.log("character:", character);
  console.log("user:", user);
  const endpoint = `${url}/rickandmorty/fav/`;
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, { ...character, user });
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Missing data. Please fill in all required fields.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text:`${error.message}`  ,
        });
      }
    }
  };
  }

export const getFav = (user) => {
  const endpoint = `${url}/rickandmorty/fav/${user}`;
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

  const endpoint = `${url}/rickandmorty/fav/${id}?user=${user}`;
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
