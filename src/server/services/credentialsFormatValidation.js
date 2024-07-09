function validateEmailFormat(email) {
  const sanitizedEmail = email.replace(/[^a-zA-Z0-9._@-]/g, '');
    const regex = /^(([^<>()[\]\\.,;:\s@"]+)@([a-zA-Z0-9\-.]+))\.([a-zA-Z]{2,})$/;
    return regex.test(sanitizedEmail);
  }
  
  const REGEX_UPPERCASE = /[A-Z]/;
  const REGEX_NUMBER = /^\w+\d/;
  const REGEX_SPECIAL_CHARACTER = /^\w+[!@#$%^&*]+/;
  
  function validatePasswordFormat(password) {
    const sanitizedPassword = password.replace(/[^a-zA-Z0-9!@#$%^&*()_+-=|{}[]\\<>\/?.,:\s]/g, '');

      const errors=[]
      if (sanitizedPassword.length < 6) {
          errors.push("Password must be at least 6 characters long");
      }
  
      if (!REGEX_UPPERCASE.test(sanitizedPassword)) {
          errors.push("Password must contain at least one uppercase") ;
      }
  
      if (!REGEX_NUMBER.test(sanitizedPassword)) {
        errors.push( "Password must contain at least one number");
      
      }
  
      if (!REGEX_SPECIAL_CHARACTER.test(sanitizedPassword)) {
          errors.push("Password must contain at least one special character") ;
      }
  
      return errors.length>0?  errors:true
  }

  module.exports = {
    validateEmailFormat,
    validatePasswordFormat
  };