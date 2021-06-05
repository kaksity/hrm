const Validator = require('validator');
const Authentication = require('../../Models/Authentication');
const Employee = require('../../Models/Employee');
const LeaveApplication = require('../../Models/LeaveApplication');
const UUID = require('uuid');
module.exports = async(req, res) => {
    try {

        let ReasonForLeave = req.body.reason_for_leave;
        let Description = req.body.description;
        let StartLeaveDate = req.body.start_leave_date;
        let EndLeaveDate = req.body.end_leave_date;
        console.log(req.body);
        let AuthenticationId = req.User.id;

        if (Validator.isUUID(ReasonForLeave) == false) {
            return res.status(400).json({
                success: false,
                message: 'Reason for Leave is not valid',
                description: ''
            });
        }
        // if (Validator.isDate(StartLeaveDate) == false) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Start Leave date Must be a valid date'
        //     });
        // }
        // if (Validator.isDate(EndLeaveDate) == false) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'End Leave date Must be a valid date'
        //     });
        // }

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
        //console.log(AuthenticationQueryResult);
        console.log(AuthenticationQueryResult);
        let EmployeeId = AuthenticationQueryResult.employee.id;

        let LeaveApplicationUUID = UUID.v4();
        await LeaveApplication.create({
            id: LeaveApplicationUUID,
            employee_id: EmployeeId,
            reason_for_leave_id: ReasonForLeave,
            description: Description,
            date_of_request: new Date().toISOString().toString().substr(0, 10),
            start_leave_date: StartLeaveDate,
            status: "pending",
            end_leave_date: EndLeaveDate,
            is_deleted: 0
        });
        return res.status(201).json({
            success: true,
            message: 'Application for leave was successful'
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again',
            description: 'The Following Request Bodies were required. reason_for_leave, description, start_leave_date & end_leave_date'
        });
    }
}