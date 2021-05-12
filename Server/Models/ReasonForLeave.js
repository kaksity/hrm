const Sequelize = require('sequelize');
const DbConnection = require('../Config/Db');

const ReasonForLeave = DbConnection.define('reason_for_leaves', {
    name: {
        type: Sequelize.STRING
    },
    is_deleted: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = ReasonForLeave;