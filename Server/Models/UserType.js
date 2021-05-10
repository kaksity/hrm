const Sequelize = require('sequelize');
const DbConnection = require('../Config/Db');

const UserType = DbConnection.define('user_type', {
    name: {
        type: Sequelize.STRING
    },
    is_deleted: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = UserType;