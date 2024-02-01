export function validationLogin(userData) {
  const validationEmail =
    /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

  const errors = {};

  if (
    !validationEmail.test(userData.email) ||
    userData.email.length === 0 ||
    userData.email.length > 35
  ) {
    errors.email = "Invalid email";
  }

  if (
    userData.password.length === 0 ||
    userData.password.length < 6 
  ) {
    errors.password = "Try a stronger password";
  }

  return errors;
}

export function validationRegister(formData) {
  const validationEmail =
    /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

  const errors = {};

  if (
    !validationEmail.test(formData.email) ||
    formData.email.length === 0 ||
    formData.email.length > 35
  ) {
    errors.email = "Invalid email";
  }

  if (
    formData.password.length === 0 ||
    formData.password.length < 6 ||
    formData.password.length > 10
  ) {
    errors.password = "Must be between 6 and 10 characters";
  }

  if (
    formData.name.length === 0 ||
    formData.name.length < 3 ||
    formData.name.length > 20
  ) {
    errors.name = "Must be between 6 and 20 characters";
  }
  if (
    formData.lastname.length === 0 ||
    formData.name.length < 3 ||
    formData.name.length > 20
    
  ) {
    errors.lastname = "Must be between 6 and 20 characters";
  }

  return errors;
}
