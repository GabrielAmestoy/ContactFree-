const bcrypt = require('bcryptjs');
const db = require('../src/database/models');
const {body} = require('express-validator');

module.exports = [
  body('username')
  .custom((value,{req}) => {
    console.log(req.body)
    return db.User.findOne({
        where :{
            username : value
        }
    }).then(user => {
        if(!user || !bcrypt.compareSync(req.body.password,user.password)){
            return Promise.reject()
        }
    }).catch( () => Promise.reject('Nombre de Usuario o contraseña incorrectas'))
})
]