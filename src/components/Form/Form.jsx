import React, { useState } from "react"
import validation from "../../validation";
import style from './Form.module.css'
import {  NavLink } from 'react-router-dom';
import styles from '../generalStyles.module.css'

const Form = (props) => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
      });

      const [errors, setErrors] = useState({})

      const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setUserData({...userData, [property]: value })
        setErrors(validation({...userData, [property]: value }))
      }

     const handleSubmit = (evento) => {
evento.preventDefault()
    // Llama a la función de inicio de sesión y pasa los datos del usuario
    props.login(userData);
     }

    return (
        <div className={style.formContainer}>
           <NavLink to='/register'>
                <button className={style.button}>Registrarse</button>
            </NavLink>
<form onSubmit={handleSubmit}>
            <div  className={style.email}>
            <label>Email:</label>
<input 
       type="text"
       name="email"
       value = {userData.email}
       onChange={handleChange} 
       />
<p>{errors.email}</p>
            </div>

            <div className={style.password}>
            <label>Contraseña:</label>
<input 
       type="password"
       name="password"
       value = {userData.password} 
       onChange={handleChange}
       />
<p>{errors.password}</p>
            </div>

<button type="submit">Submit</button>

        </form>
       
       </div>
    )
}


export default Form;