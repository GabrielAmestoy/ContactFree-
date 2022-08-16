module.exports = (sequelize, dataTypes) => {
    let alias = 'Contacto';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45)
        },
        surname: {
            type: dataTypes.STRING(45)
        },
        telefono:{
            type: dataTypes.INTEGER,
        },
        email: {
            type: dataTypes.STRING(255)
        },
        address: {
            type: dataTypes.STRING(45)
        },
        work: {
            type: dataTypes.STRING(45)
        },
        birthday: {
            type: dataTypes.DATE,
        },
        userId:{
            type: dataTypes.INTEGER,
        }
    };
    let config = {
        tableName: 'contactos',
        timestamps: false
    };
    const Contacto = sequelize.define(alias, cols, config);

        /* Relaciones */
       Contacto.associate = models => {
        Contacto.belongsTo(models.User,{
            as :'user',
            foreignKey : 'userId'
        })
        }
        // User.associate = models => {
        //     User.hasMany(models.Tarjeta,{
        //         as :'tarjetas',
        //         foreignKey : 'userId'
        //     });
        // }

    return Contacto;
    }