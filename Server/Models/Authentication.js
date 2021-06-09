const Sequelize = require('sequelize');
const DbConnection = require('../Config/Db');
const Employee = require('./Employee');
const UserType = require('./UserType');

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
Authentication.belongsTo(UserType, {
    foreignKey: 'user_type_id'
});
module.exports = Authentication;