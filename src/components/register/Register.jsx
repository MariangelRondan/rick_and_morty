import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from "./Register.module.css"

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    dateOfBirth: '',
    email: '',
    password: '',
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    // Realiza la solicitud AJAX al servidor para registrar al usuario
    try {
        const response = await fetch('http://localhost:3001/rickandmorty/register', {
            method: 'POST', // Especifica el método HTTP que deseas utilizar (en este caso, POST)
            headers: {
              'Content-Type': 'application/json', // Especifica el tipo de contenido del cuerpo de la solicitud
            },
            body: JSON.stringify(formData)
          });
          
          // Maneja la respuesta del servidor
          if (response.ok) {
            const data = await response.json(); // Convierte la respuesta a un objeto JSON
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


  return (
    <div className={style.formContainer}>

    
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
      </label>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
      />
         <label>
        Apellido:
      </label>
       <input
        type="text"
        name="lastname"
        placeholder="Apellido"
        value={formData.lastname}
        onChange={handleChange}
      />
         <label>
         Fecha de nacimiento:
      </label>
       <input
        type="date"
        name="dateOfBirth"
        placeholder="Fecha"
        value={formData.dateOfBirth}
        onChange={handleChange}
      />
         <label>
        Correo electrónico:
      </label>
      <input
        type="email"
        name="email"
        placeholder="Correo Electrónico"
        value={formData.email}
        onChange={handleChange}
      />  
       <label>
      Contraseña:
    </label>
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
      />
      <button className={style.button} type="submit">Registrarse</button>
    </form>
    </div>
  );
}

export default Register;
