const Sequelize = require('sequelize');
const DbConnection = require('../Config/Db');

const Position = DbConnection.define('position', {
    name: {
        type: Sequelize.STRING
    },
    is_deleted: {
        type: Sequelize.BOOLEAN
    }
});


module.exports = Position;