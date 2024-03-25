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
