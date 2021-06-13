const Sequelize = require('sequelize');
const DbConnection = require('../Config/Db');

const NoticeBoard = DbConnection.define('notice_board', {
    title: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.TEXT
    },
    date_posted: {
        type: Sequelize.DATE
    },
    is_deleted: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = NoticeBoard;