const Sequelize = require('sequelize');
const DbConnection = require('../Config/Db');
const Employee = require('./Employee');

const Authentication = DbConnection.define('authentication', {
    email_address: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    user_type_id: {
        type: Sequelize.UUID
    },
    is_deleted: {
        type: Sequelize.BOOLEAN
    }
});

Authentication.hasOne(Employee, {
    foreignKey: 'authentication_id'
});
module.exports = Authentication;