const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //validation rules for name
  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "Username must be between 2 and 30 characters";
  }
  if (!Validator.isAlphanumeric(data.username, ["en-GB"])) {
    errors.username = "Username must contain only letters and numbers";
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  //validation rules for passwords
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must contain at least 8 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password confirmation is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
