var express = require("express");

var router = express.Router();

const {login,register, processRegister, processLogin, logout} = require("../controllers/usersControllers.js");

const loginValidator = require('../validations/loginValidator');
const userRegisterValidations = require('../validations/userRegisterValidations');
const usersCheck = require("../validations/usersCheck");



/*  contactos */
router.get("/login",usersCheck, login);
router.post("/login",loginValidator, processLogin);
router.get("/register",usersCheck, register);
router.post('/register',userRegisterValidations,processRegister);
router.get("/logout", logout);


module.exports = router;