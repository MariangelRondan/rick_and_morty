import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Form.module.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { validationLogin, validationRegister } from '../../validation';

const url = process.env.REACT_APP_BACK_URL;

const Form = (props) => {
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const activateRegisterForm = () => {
    setIsRegisterVisible(true);
  }

  const activateLoginForm = () => {
    setIsRegisterVisible(false);
  }

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    dateOfBirth: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    lastname: '',
    dateOfBirth: '',
    email: '',
    password: '',
  });

  const handleChangeR = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const registrationErrors = validationRegister({ ...formData, [name]: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, ...registrationErrors }));
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
      // Swal.fire('All fields must be completed', '', 'error');
console.log(error.message)    }
  };

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });

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
    <div className={styles.all}>
      <div className={styles.container}>
        <div className={`${styles.formContainer} ${isRegisterVisible ? styles.active : ""}`}>
          <form onSubmit={handleSubmitR} style={{ display: isRegisterVisible ? 'block' : 'none' }}>
            <h1>Create Account</h1>
            <label>
              Name:
              <input
                type="text"
                name="name"
                placeholder="Name..."
                value={formData.name}
                onChange={handleChangeR}
              />
            </label>
            <p className="error">{formErrors.name}</p>

            <label>
              Last name:
              <input
                type="text"
                name="lastname"
                placeholder="Last name...."
                value={formData.lastname}
                onChange={handleChangeR}
              />
            </label>
            <p className="error">{formErrors.lastname}</p>

            <label>
              Date of birth:
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Fecha"
                value={formData.dateOfBirth}
                onChange={handleChangeR}
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={handleChangeR}
              />
            </label>
            <p className="error">{formErrors.email}</p>

            <label>
              Password:
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChangeR}
              />
            </label>
            <p className="error">{formErrors.password}</p>
            {/* Rest of the registration form */}

            <button type="submit">Sign Up</button>
          </form>

          <form onSubmit={handleSubmit} style={{ display: isRegisterVisible ? 'none' : 'block' }}>
            <h1>Sign in</h1>
            <label>
              Email:
              <input
                type="text"
                name="email"
                placeholder="Email..."
                value={userData.email}
                onChange={handleChange}
              />
            </label>
            <p className="error">{loginErrors.email}</p>

            <label>
              Password:
              <input
                type="password"
                name="password"
                placeholder="Password..."
                value={userData.password}
                onChange={handleChange}
              />
            </label>
            <p className="error">{loginErrors.password}</p>

            <button type="submit">Sign In</button>
          </form>
        </div>

        <div className={styles.toggleButtons}>
          <button className={!isRegisterVisible ? styles.activeButton : ""} onClick={activateLoginForm}>Sign In</button>
          <button className={isRegisterVisible ? styles.activeButton : ""} onClick={activateRegisterForm}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Form;
