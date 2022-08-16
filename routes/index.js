var express = require('express');
var router = express.Router();

const {index, add, remove, edit, update} = require('../controllers/contactosControllers.js')

const contactAdd = require("../validations/contactAdd");
const contactEditValidations = require("../validations/contactEditValidations");
const usersNotCheck = require("../validations/usersNotCheck");

/* GET home page. */
router.get('/', index);
router.get ('/home', index)
router.post('/',contactAdd, add);
router.delete('/remove/:id',remove)
router.get('/editContact/:id',usersNotCheck, edit)
router.put('/editContact/:id',contactEditValidations, update)



module.exports = router;