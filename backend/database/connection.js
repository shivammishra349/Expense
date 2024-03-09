let Sequelize = require('sequelize');

let sequelize = new Sequelize('security','root','shivam12',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize;