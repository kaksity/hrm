const Validator = require('validator');
const Authentication = require('../../Models/Authentication');
const Employee = require('../../Models/Employee');
const LeaveApplication = require('../../Models/LeaveApplication');
const ReasonForLeave = require('../../Models/ReasonForLeave');
exports.Single = async(req, res) => {
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
            },
            include: [{
                model: ReasonForLeave,
            }]
        });

        if (!LeaveApplicationQueryResult) {
            return res.status(400).json({
                success: false,
                message: 'Leave application was not found',
            });
        }

        const Data = {
            reason_for_leave: LeaveApplicationQueryResult.reason_for_leave.name,
            description: LeaveApplicationQueryResult.description,
            date_of_request: LeaveApplicationQueryResult.date_of_request,
            start_leave_date: LeaveApplicationQueryResult.start_leave_date,
            end_leave_date: LeaveApplicationQueryResult.end_leave_date,
            status: LeaveApplicationQueryResult.status,
        }

        return res.status(200).json({
            success: true,
            message: 'Leave Application was retrived successfully',
            data: Data,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again'
        });
    }
}
exports.AdminSingle = async(req, res) => {
    try {
        let LeaveApplicationId = req.params.id;

        if (Validator.isUUID(LeaveApplicationId) == false) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Leave Application'
            });
        }


        const LeaveApplicationQueryResult = await LeaveApplication.findOne({
            where: {
                id: LeaveApplicationId,
                is_deleted: 0
            },
            include: [{
                model: ReasonForLeave,
            }, {
                model: Employee
            }]
        });

        if (!LeaveApplicationQueryResult) {
            return res.status(400).json({
                success: false,
                message: 'Leave application was not found',
            });
        }

        const Data = {
            employee: `${LeaveApplicationQueryResult.employee.first_name} ${LeaveApplicationQueryResult.employee.middle_name} ${LeaveApplicationQueryResult.employee.last_name}`,
            reason_for_leave: LeaveApplicationQueryResult.reason_for_leave.name,
            description: LeaveApplicationQueryResult.description,
            date_of_request: LeaveApplicationQueryResult.date_of_request,
            start_leave_date: LeaveApplicationQueryResult.start_leave_date,
            end_leave_date: LeaveApplicationQueryResult.end_leave_date,
            status: LeaveApplicationQueryResult.status,
        }

        return res.status(200).json({
            success: true,
            message: 'Leave Application was retrived successfully',
            data: Data,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again'
        });
    }
}
exports.AllRecord = async(req, res) => {
    try {
        let AuthenticationId = req.User.id;

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


        const LeaveApplicationQueryResult = await LeaveApplication.findAll({
            where: {
                employee_id: AuthenticationQueryResult.employee.id,
                is_deleted: 0
            },
            include: [{
                model: ReasonForLeave,
            }]
        });

        const Data = [];
        LeaveApplicationQueryResult.forEach(item => {
            Data.push({
                id: item.id,
                reason_for_leave: item.reason_for_leave.name,
                description: item.description,
                date_of_request: item.date_of_request,
                start_leave_date: item.start_leave_date,
                end_leave_date: item.end_leave_date,
                status: item.status,
            });
        });

        return res.status(200).json({
            success: true,
            message: 'Leave Application List was retrived successfully',
            data: Data,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again'
        });
    }
}
exports.AdminAllRecord = async(req, res) => {
    try {

        // Check the Type of the Leave Application
        let TypeOfLeaveApplication = req.query.type;
        if (TypeOfLeaveApplication == undefined || TypeOfLeaveApplication == null) {
            return res.status(400).json({
                success: false,
                message: 'Type of Leave is required'
            });
        }

        if (TypeOfLeaveApplication != 'pending' && TypeOfLeaveApplication != 'approved' && TypeOfLeaveApplication != 'rejected') {
            return res.status(400).json({
                success: false,
                message: 'Type of Leave is invalid'
            });
        }

        const LeaveApplicationQueryResult = await LeaveApplication.findAll({
            where: {
                status: TypeOfLeaveApplication,
                is_deleted: 0
            },
            include: [{
                model: ReasonForLeave,

            }, {
                model: Employee
            }]
        });
        const Data = [];

        LeaveApplicationQueryResult.forEach(item => {
            Data.push({
                id: item.id,
                employee: `${item.employee.first_name} ${item.employee.middle_name} ${item.employee.last_name}`,
                reason_for_leave: item.reason_for_leave.name,
                description: item.description,
                date_of_request: item.date_of_request,
                start_leave_date: item.start_leave_date,
                end_leave_date: item.end_leave_date,
                status: item.status,
            });
        });

        return res.status(200).json({
            success: true,
            message: 'Leave Application List was retrived successfully',
            data: Data,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again'
        });
    }
}