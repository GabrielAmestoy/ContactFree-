module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: dataTypes.STRING(45)
        },
        password: {
            type: dataTypes.STRING(255)
        },
        email: {
            type: dataTypes.STRING(255)
        },
        avatar: {
            type: dataTypes.STRING(45)
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };
    const User = sequelize.define(alias, cols, config);

        /* Relaciones */
//        User.associate = models => {
 //           User.belongsTo(models.Address,{
   //             as :'address',
     //           foreignKey : 'addressId'
       //     });
         
        // User.associate = models => {
        //     User.hasMany(models.Tarjeta,{
        //         as :'tarjetas',
        //         foreignKey : 'userId'
        //     });
        // }

    return User;
    }