function validateEmailFormat(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+)@([a-zA-Z0-9\-.]+))\.([a-zA-Z]{2,})$/;
    return regex.test(email);
  }
  
  const REGEX_UPPERCASE = /[A-Z]/;
  const REGEX_NUMBER = /^\w+\d/;
  const REGEX_SPECIAL_CHARACTER = /^\w+[!@#$%^&*]+/;
  
  function validatePasswordFormat(password) {
      const errors=[]
      if (password.length < 6) {
          errors.push("Password must be at least 6 characters long");
      }
  
      if (!REGEX_UPPERCASE.test(password)) {
          errors.push("Password must contain at least one uppercase") ;
      }
  
      if (!REGEX_NUMBER.test(password)) {
        errors.push( "Password must contain at least one number");
      
      }
  
      if (!REGEX_SPECIAL_CHARACTER.test(password)) {
          errors.push("Password must contain at least one special character") ;
      }
  
      return errors.length>0?  errors:true
  }

  module.exports = {
    validateEmailFormat,
    validatePasswordFormat
  };