const { body } = require('express-validator'); //Destructuring

module.exports = [
    body("name")
        .notEmpty().withMessage("Debes ingresar el nombre"),
        // .isLength({ min:5 }).withMessage("El nombre del producto debe tener al menos 5 caracteres"),

    body("telefono")
        .notEmpty().withMessage("Debes ingresar el numero de telefono")
        .isNumeric().withMessage("Debes ingresar solo numeros")
        .isLength({ min: 10 ,max : 100}).withMessage("el numero debe tener 10 caracteres como mínimo"),

    //  body('images')
    // .custom((value,{req}) => {
      
    //     if(req.files[0]){
    //         return true
    //     }else{
    //         return false
    //     }
    // })
    // .withMessage('No ha subido ningun archivo!'),
    
    body("birthday")
        .notEmpty().withMessage("Debes seleccionar su fecha de nacimiento"),

    // body("price")
    //     .notEmpty().withMessage("Debes ingresar un precio"),

    // body("cuotas")
    //     .notEmpty().withMessage("Debes ingresar un numero"),

    // body("stock")
    //     .notEmpty().withMessage("Debes seleccionar un numero"),


]