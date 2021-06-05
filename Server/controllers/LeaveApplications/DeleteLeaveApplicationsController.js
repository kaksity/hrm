const Validator = require('validator');
const Authentication = require('../../Models/Authentication');
const Employee = require('../../Models/Employee');
const LeaveApplication = require('../../Models/LeaveApplication');

module.exports = async(req, res) => {
    try {
        let AuthenticationId = req.User.id;
        let LeaveApplicationId = req.params.id;

        if (Validator.isUUID(LeaveApplicationId) == false) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Leave Application'
            });
        }

        //Get the Employee Id
        let AuthenticationQueryResult = await Authentication.findOne({
            where: {
                id: AuthenticationId,
                is_deleted: 0
            },
            include: [{
                model: Employee,
                attributes: ['id']
            }]
        });


        const LeaveApplicationQueryResult = await LeaveApplication.findOne({
            where: {
                id: LeaveApplicationId,
                employee_id: AuthenticationQueryResult.employee.id,
                is_deleted: 0
            }
        });

        if (!LeaveApplicationQueryResult) {
            return res.status(400).json({
                success: false,
                message: 'Leave application was not found',
            });
        }

        LeaveApplicationQueryResult.is_deleted = 1;
        await LeaveApplicationQueryResult.save();

        return res.status(200).json({
            success: true,
            message: 'Leave Application was deleted successfully'
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again'
        });
    }
}