function validation(userData) {
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
    userData.password.length < 6 ||
    userData.password.length > 10
  ) {
    errors.password = "Must be between 6 and 10 characters";
  }

  return errors;
}

export default validation;
