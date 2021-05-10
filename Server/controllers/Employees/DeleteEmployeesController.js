const Validator = require('validator');
const Authentication = require('../../Models/Authentication');
const Employee = require('../../Models/Employee');
const DbConnection = require('../../Config/Db');

module.exports = async(req, res) => {
    try {

        if (Validator.isUUID(req.params.id) == false) {
            return res.status(400).json({
                success: false,
                message: 'Employee ID must be a valid UUID'
            });
        }

        let AuthenticationID = req.params.id;

        //Check if the User Type is valid
        try {
            //Check if the Email Address already Exist in the Platform
            let AuthenticationQueryResult = await Authentication.findOne({
                where: {
                    id: AuthenticationID,
                    is_deleted: 0
                }
            });

            let EmployeeQueryResult = await Employee.findOne({
                where: {
                    authentication_id: AuthenticationID,
                }
            });

            if (!AuthenticationQueryResult) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid Employee ID',
                });
            }


            const Transaction = await DbConnection.transaction();

            try {

                AuthenticationQueryResult.is_deleted = 1;
                await AuthenticationQueryResult.save({
                    transaction: Transaction
                });

                EmployeeQueryResult.is_deleted = 1;

                await EmployeeQueryResult.save({
                    transaction: Transaction
                });

                await Transaction.commit();
                return res.status(200).json({
                    success: true,
                    message: 'Employee Record was deleted successfully',
                });
            } catch (e) {
                await Transaction.rollback();
                return res.status(500).json({
                    success: false,
                    message: 'Something went wrong. Try again',
                    description: 'Could not Complete the Operation'
                });
            }

        } catch (e) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Try again',
                description: 'Could not Complete the Operation'
            });
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again',
        });
    }
}