const db = require("../src/database/models");
const { validationResult, body } = require('express-validator');

module.exports = {
    list : (req, res) =>{
        let contactos = db.Contacto.findAll()
        .then(contactos => {
            return res.render("/",{
                contactos
            })
        }).catch (err => console.log(err));
    },
    index : (req,res) => {
        // console.log("aaaaaaa");
        // console.log(res.locals.userLogin);  
        if(res.locals.userLogin != undefined){
            let contactos = db.Contacto.findAll({     
                where : {
                    userId : res.locals.userLogin.id,
                }, 
                }).then((contactos) => {
                    // console.log(users)
                // console.log(contactos);
                return res.render("home",{
                    contactos
                })
            }).catch (err => console.log(err));
        } else{
            return res.render("home")
        }
    },
    add : (req,res) => {

        let errores = validationResult(req);
        if (errores.isEmpty()) {
            let contactos = db.Contacto.findAll();
            const { name, surname, userId,telefono,email, address, work, birthday} = req.body;
            // console.log("eeeeee");
            // console.log(req.body);
            db.Contacto.create({
                name: name,
                surname: surname,
                userId: userId,
                telefono,
                email,
                address,
                work,
                birthday,
        })
        .then(() => 
            res.redirect("/home"))
        .catch(error => console.log(error))
        } else{
            let contactos = db.Contacto.findAll({     
                where : {
                    userId : res.locals.userLogin.id,
                }
            }).then(contactos =>{
                    res.render('home',{
                        contactos,
                        errores : errores.mapped(),
                        })
                }) 
        }
    },
    remove: (req, res) => {
        // console.log(req.params.id);
        db.Contacto.destroy({
            where: {
                id: req.params.id
            },
        }).then(() => res.redirect('/home'))
            .catch(error => console.log(error))
    },
    edit: (req,res) => {
        // console.log("edit---");
        // console.log(res.locals.userLogin);
        let contacto = db.Contacto.findByPk(req.params.id)
        .then(contacto => {
            return res.render("editContact",{
                contacto,
            })
        })

    },
    update : (req,res) => {
        const {name,surname, telefono, email, address,work, birthday} = req.body;
        // console.log(req.body);
        let errores = validationResult(req);
        if (errores.isEmpty()) {
            db.Contacto.update(
                {
                    name,
                    surname,
                    telefono,
                    email,
                    address,
                    work,
                    birthday
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            ).then(() => res.redirect('/home'))
            .catch(error => console.log(error))
        }else{
            let contacto = db.Contacto.findByPk(req.params.id)
        .then(contacto => {
            return res.render("editContact",{
                contacto,
                errores : errores.mapped(),
            })
        })
        }
    }
}