const Sequelize = require('sequelize');
const DbConnection = require('../Config/Db');
const Position = require('./Position');

const Employee = DbConnection.define('employees', {
    authentication_id: {
        type: Sequelize.UUID
    },
    first_name: {
        type: Sequelize.STRING
    },
    middle_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    },
    phone_number: {
        type: Sequelize.STRING
    },
    position_id: {
        type: Sequelize.UUID
    },
    address: {
        type: Sequelize.STRING
    },
    is_deleted: {
        type: Sequelize.BOOLEAN
    }
});

Employee.belongsTo(Position, {
    foreignKey: 'position_id'
});

module.exports = Employee;