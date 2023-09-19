import Form from "./components/Form/Form";

function validation(userData) {
  const validationEmail =
    /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

  const errors = {};

  if (
    !validationEmail.test(userData.email) ||
    userData.email.length === 0 ||
    userData.email.length > 35
  ) {
    errors.email = "Debe ingresar un mail válido";
  }

  if (
    userData.password.length === 0 ||
    userData.password.length < 6 ||
    userData.password.length > 10
  ) {
    errors.password = "Contraseña inválida";
  }

  return errors;
}

export default validation;
