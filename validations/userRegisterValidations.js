const { check,body } = require('express-validator'); //Destructuring

module.exports = [
    check("username")
        .notEmpty().withMessage("Debes ingresar el nombre de Usuario"),
    body("email")
        .notEmpty().withMessage("Debes ingresar un Email"),
    check("password")
        .notEmpty().withMessage("Debes una constraseña")
        .isLength({min:8, max:15}).withMessage("La contraseña debe tener entre 8 y 15 caracteres"),

    body("password2")
        .notEmpty().withMessage("Debes ingresar una contraseña")
        .custom((value,{req}) => {
            if (value === req.body.password) {
                return true
            }
            return false
        }).withMessage("Las contraseñas no coinciden"),

]