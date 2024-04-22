export function phoneValidation(values) {
  const errors = {};
  const phonePattern = /^[0-9]{11}$/;
  if (values.length === 0) {
    errors.user_id = "Phone number can not be empty!";
  } else if (!phonePattern.test(values)) {
    errors.user_id = "11 char long. Only numbers ex.(01100000000)";
  }
  return errors;
}

export function emailValidation(email) {
  var err = "";
  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.length === 0) {
    err = "Email can not be empty!";
  } else if (!emailPattern.test(email)) {
    err = "Please provide a valid email address.";
  }
  return err;
}
