import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import styles from './Form.module.css'
import Swal from 'sweetalert2';
import axios from 'axios';
import {validationLogin,validationRegister} from '../../validation'; 

import {validationLogin,validationRegister} from '../../validation'; 

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

const [formErrors, setformErrors] = useState({
  name: '',
  lastname: '',
  dateOfBirth: '',
  email: '',
  password: '',
})


const handleChangeR = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
  const registrationErrors = validationRegister(formData);
  setformErrors({ ...registrationErrors });
};

const handleSubmitR = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${url}/rickandmorty/register`, formData);

    if (response.status === 200) {
      Swal.fire('Successful registration!', '', 'success');
      navigate('/');
    }
  } catch (error) {
    Swal.fire('All fields must be completed', '', 'error');
  }
};


//fin funciones registro
    
    
const [userData, setUserData] = useState({
               email: '',
               password: '',
            });
      
const [loginErrors, setLoginErrors] = useState({
  email: "",
  password: "",
})

      
const handleChange = (event) => {
  const property = event.target.name;
  const value = event.target.value;
  setUserData({ ...userData, [property]: value });
  const loginErrors = validationLogin({ ...userData, [property]: value });
  setLoginErrors({ ...loginErrors });
};

const handleSubmit = (evento) => {
  evento.preventDefault();
  props.login(userData);
  localStorage.setItem('user', userData.email);
};
       
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
                  <p className="error">{formErrors.name}</p>

                  <p>{formErrors.name}</p>

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
                        <p className="error">{formErrors.lastname}</p>

                        <p>{formErrors.lastname}</p>

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
            <p className="error">{loginErrors.email}</p>

            <p>{loginErrors.email}</p>

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
            <p className="error">{loginErrors.password}</p>

            <p>{loginErrors.password}</p>

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