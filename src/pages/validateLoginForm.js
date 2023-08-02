const validateLoginForm = (username, password) => {
    const errors = [];
  
    if (username.trim() === "") {
      errors.push("Username is required");
    }
  
    if (password.trim() === "") {
      errors.push("Password is required");
    }
  
    return errors;
  };
  
  module.exports = validateLoginForm;