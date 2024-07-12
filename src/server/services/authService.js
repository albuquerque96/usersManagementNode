const userService = require("./userService")
const {validateEmailFormat,validatePasswordFormat} = require("./credentialsFormatValidation");
const tokenActions = require("./tokenService");
const  axios = require("axios")
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

const login = async (email, password) => {
  return axios.post('/login', { email, password });
};

const register = async (email, password) => {
  return axios.post('/user', { email, password });
};


const verifyCredentials = async (email,password) => {                  
  
  if(!validateEmailFormat(email)) {
    return {message:"invalid email format"}
  }
  if(!validatePasswordFormat(password)) {
    return {message:"invalid password format"}
  }
  try {
    const user = await userService.findUserbyEmail(email)
    if (!user) {
      return { message: "Authentication failed: user not found" };
    }

    const isMatch = await tokenActions.isPasswordMatch(password, user.password);
    if (!isMatch) {
     return  { message: "Authentication failed: incorrect password" }
    }

    return user
  } catch (error) {
    console.log(error);
    return { message: "Internal server error" };
  }
};

module.exports = {verifyCredentials,login,register};
