const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('world', 'root', 'QwErty123!',{
    host: 'localhost',
    port: 3306,
    dialect:'mysql'
});

const  dbConnection = async () =>{
    try {
        await sequelize.authenticate();
        console.log('FB connected')
    } catch (error) {
        console.log(('Unable to conect db', error))
    }

}



module.exports = { dbConnection, sequelize};