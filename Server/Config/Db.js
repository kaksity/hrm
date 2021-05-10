const Sequelize = require('sequelize');

const DbConnection = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: 'mariadb'
});

module.exports = DbConnection;