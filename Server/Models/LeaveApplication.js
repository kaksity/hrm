const Sequelize = require('sequelize');
const DbConnection = require('../Config/Db');
const Employee = require('./Employee');
const ReasonForLeave = require('./ReasonForLeave');

const LeaveApplication = DbConnection.define('leave_application', {
    employee_id: {
        type: Sequelize.UUID
    },
    reason_for_leave_id: {
        type: Sequelize.UUID
    },
    description: {
        type: Sequelize.TEXT
    },
    date_of_request: {
        type: Sequelize.DATE
    },
    start_leave_date: {
        type: Sequelize.DATE
    },
    status: {
        type: Sequelize.STRING
    },
    end_leave_date: {
        type: Sequelize.DATE
    },
    is_deleted: {
        type: Sequelize.BOOLEAN
    }
});

LeaveApplication.belongsTo(ReasonForLeave, {
    foreignKey: 'reason_for_leave_id'
});
LeaveApplication.belongsTo(Employee, {
    foreignKey: 'employee_id'
});

module.exports = LeaveApplication;