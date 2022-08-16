const db = require("../src/database/models");
const bcrypt = require("bcryptjs");
const { validationResult, body } = require('express-validator');

module.exports = {
    login : (req,res) =>{
        res.render("login")
    },
    register : (req,res) =>{
        res.render("register")
    },
    processRegister : (req,res) => {
        let errores = validationResult(req);
        if (errores.isEmpty()) {
        const {username, email, password} = req.body;
            db.User.create({
                username,
                password: bcrypt.hashSync(password, 15),
                email,
                avatar : "anc",
            })
            res.redirect("login");
        }else{
            res.render("register",{
                errores : errores.mapped(),
            })
            }
    },
    processLogin : (req,res) => {
        let errores = validationResult(req);
        console.log(errores);
        const {username, password, id} = req.body;
        if (errores.isEmpty()) {
            let user = db.User.findOne({
                where : {
                    username
                }
            }).then( user => {
    
                // console.log("ESTE:",user);
                req.session.userLogin = {
                    id: user.id,
                    username: username,
                    passwword: password,
                }
                // console.log(user)
                const contactos = db.Contacto.findAll({  
                    where : {
                        userId : user.id,
                    },
                    include : [
                        {
                            association : 'user',
                        }
                    ]
        
                })
                .then( contactos => {
                // console.log(req.session.userLogin);
                    // console.log("contactos del ususario------------",contactos);
                    // console.log("--------------");
                    // console.log("aca", req.session.userLogin);
    
                    res.locals.userLogin = req.session.userLogin;
                    // console.log("aca", locals.userLogin);
                    res.redirect("/home")
                }).catch (err => console.log(err));
            })
        } else{
            return res.render('login',{
                errores : errores.mapped(),
            })
        }
        
    },
    logout :(req,res) =>{
        req.session.destroy();
        return res.redirect("/users/login")
    }
}