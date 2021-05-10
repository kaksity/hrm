const Sequelize = require('sequelize');
const DbConnection = require('../Config/Db');

const Address = DbConnection.define('address', {
    bio_detail_id: {
        type: Sequelize.UUID
    },
    address: {
        type: Sequelize.STRING
    },
    is_deleted: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = Address;