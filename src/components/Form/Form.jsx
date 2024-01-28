
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import styles from './Form.module.css'
 import validation from "../../validation";
 import style from '../generalStyles.module.css'
 const url = process.env.REACT_APP_BACK_URL;

const Form =(props) => {

const [active, setActive] = useState("");
const [isRegisterVisible, setIsRegisterVisible] = useState(false);
 

const activateContainer = () => {
  setActive("active");
  setIsRegisterVisible(true);
}

const deactivateContainer = () => {
  setActive("");
  setIsRegisterVisible(false);
};


//funciones registro
const navigate = useNavigate();

const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    dateOfBirth: '',
    email: '',
    password: '',
})


const handleChangeR = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
}

const handleSubmitR = async (e) => {
    e.preventDefault();

    try{
        const response = await fetch(`${url}/rickandmorty/register`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json', // tipo de contenido del cuerpo de la solicitud
            },
            body: JSON.stringify(formData)
          });
          
          // Maneja la respuesta del servidor
          if (response.ok) {
            const data = await response.json(); 
            console.log(data)
            window.alert("Registro exitoso")
               navigate('/');
          } else {
            console.error('Error al realizar la solicitud');
          }
    } catch (error) {
      console.error('Error:', error);
    }
  };

//fin funciones registro
    
    
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
          props.login(userData);
          localStorage.setItem("user", userData.email)
           }
       
    return (
// register
<div className={styles.all}>



<div className={`${styles.container} ${isRegisterVisible ? styles.active : ""}`} id="container">
<div className={`${styles.formContainer} ${styles.signUp}`}>   
    <form  onSubmit={handleSubmitR}> 
    <h1>Create Account</h1>

<label>
        Name:
      </label>
      <input
        type="text"
        name="name"
        placeholder="Name..."
        value={formData.name}
        onChange={handleChangeR}
      />
         <label>
        Last name:
      </label>
       <input
        type="text"
        name="lastname"
        placeholder="Last name...."
        value={formData.lastname}
        onChange={handleChangeR}
      />
         <label>
         Date of birth:
      </label>
       <input
        type="date"
        name="dateOfBirth"
        placeholder="Fecha"
        value={formData.dateOfBirth}
        onChange={handleChangeR}
      />
         <label>
        Email:
      </label>
      <input
        type="email"
        name="email"
        placeholder="Correo Electrónico"
        value={formData.email}
        onChange={handleChangeR}
      />  
       <label>
      Password:
    </label>
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChangeR}
      />
      <button type="submit" >Sign Up</button>
     

</form>

    </div>
    

       
<div className={`${styles.formContainer} ${styles.signIn}`}>


<form onSubmit={handleSubmit}>
<h1>Sign in</h1>

    <input 
    type="text"
    value={userData.email}
    name="email"
    placeholder="Username..."
    onChange={handleChange}
    />

    <input 
    type='password'
    value={userData.password}
    name="password"
    placeholder="Password..."
    onChange={handleChange}
    />
{/* <a href="#">Forgot your password?</a> */}
<button  type="submit" >Sign In </button>
        </form>

</div>

<div className={styles.toggleContainer}>
    <div className={styles.toggle}>
    <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
            <h1>Welcome back!</h1>
            <p>Enter your personal details to start fun</p>
    <button className={styles.hidden} id="login" onClick={deactivateContainer}>
              Sign in  
</button>
        </div>

        <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
            <h1>Hey, friend!</h1>
            <p>Register your personal details to join the Rick and Morty party</p>
            <button className={styles.hidden} id="register" onClick={activateContainer}>
  Sign Up
</button>        </div>
    </div>
</div>

        
        </div>
        </div>
    )
}

export default Form;