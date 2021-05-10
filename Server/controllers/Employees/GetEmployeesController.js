const Validator = require('validator');
const Authentication = require('../../Models/Authentication');
const Employee = require('../../Models/Employee');
const Position = require('../../Models/Position');

exports.SingleRecord = async(req, res) => {
    try {
        let AuthenticationID = req.params.id;


        if (Validator.isUUID(AuthenticationID) == false) {
            return res.status(400).json({
                success: false,
                message: 'Employee ID must be a valid UUID'
            });
        }

        let AuthenticationEmployeeQueryResult = await Authentication.findOne({
            where: {
                is_deleted: 0,
                id: AuthenticationID
            },
            include: [{
                model: Employee,
                include: [{
                    model: Position
                }]
            }]
        });

        const Data = {
            id: AuthenticationID,
            first_name: AuthenticationEmployeeQueryResult.employee.first_name,
            middle_name: AuthenticationEmployeeQueryResult.employee.middle_name,
            last_name: AuthenticationEmployeeQueryResult.employee.last_name,
            email_address: AuthenticationEmployeeQueryResult.email_address,
            phone_number: AuthenticationEmployeeQueryResult.employee.phone_number,
            gender: {
                value: AuthenticationEmployeeQueryResult.employee.gender,
                text: (AuthenticationEmployeeQueryResult.employee.gender == 'M') ? 'MALE' : 'FEMALE',
            },
            position: {
                id: AuthenticationEmployeeQueryResult.employee.position_id,
                text: AuthenticationEmployeeQueryResult.employee.position.name,
            },
            address: AuthenticationEmployeeQueryResult.employee.address,
        };

        res.send(Data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again'
        });
    }
}

exports.GetAll = async(req, res) => {
    try {
        let AuthenticationEmployeeQueryResult = await Authentication.findAll({
            where: {
                is_deleted: 0,
            },
            include: [{
                model: Employee,
                include: [{
                    model: Position
                }]
            }]
        });

        const Data = [];

        AuthenticationEmployeeQueryResult.forEach(element => {
            if (element.employee != null) {
                Data.push({
                    id: element.id,
                    full_name: `${(element.employee.first_name == null)?'':element.employee.first_name} ${(element.employee.middle_name == null)?'':element.employee.middle_name} ${ (element.employee.last_name == null)?'':element.employee.last_name}`,
                    phone_number: element.employee.phone_number,
                    position: element.employee.position.name,
                });
            }
        });
        return res.status(200).json({
            success: true,
            message: 'Retrieved List of Employees Successfully',
            data: Data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again'
        });
    }
}