const Validator = require('validator');
const Bcrypt = require('bcryptjs');
const Authentication = require('../../Models/Authentication');
const Employee = require('../../Models/Employee');
const DbConnection = require('../../Config/Db');
const UserType = require('../../Models/UserType');
const Position = require('../../Models/Position');

module.exports = async(req, res) => {
    try {

        if (Validator.isUUID(req.params.id) == false) {
            return res.status(400).json({
                success: false,
                message: 'Employee ID must be a valid UUID'
            });
        }

        let AuthenticationID = req.params.id;

        let UserTypeInput = req.body.user_type;
        let FirstName = req.body.first_name;
        let MiddleName = req.body.middle_name;
        let Address = req.body.address;
        let LastName = req.body.last_name;
        let PositionInput = req.body.position;
        let Gender = req.body.gender;
        let PhoneNumber = req.body.phone_number;
        let Password = req.body.password;
        let ConfirmPassword = req.body.confirm_password;

        if (Validator.isEmpty(FirstName)) {
            return res.status(400).json({
                success: false,
                message: 'First Name is required'
            });
        }
        if (Validator.isEmpty(LastName)) {
            return res.status(400).json({
                success: false,
                message: 'Last Name is required'
            });
        }
        if (Validator.isEmpty(Gender)) {
            return res.status(400).json({
                success: false,
                message: 'Gender is required'
            });
        }
        if (Validator.isEmpty(PhoneNumber)) {
            return res.status(400).json({
                success: false,
                message: 'Phone Number is required'
            });
        }
        if (Validator.isEmpty(Address)) {
            return res.status(400).json({
                success: false,
                message: 'Address is required'
            });
        }
        if (Validator.isUUID(UserTypeInput) == false) {
            return res.status(400).json({
                success: false,
                message: 'User Type must be a valid UUID'
            });
        }
        if (Validator.isUUID(PositionInput) == false) {
            return res.status(400).json({
                success: false,
                message: 'Position must be a valid UUID'
            });
        }
        if (Validator.isEmpty(Password) == false) {
            if (Password.length < 8) {
                return res.status(400).json({
                    success: false,
                    message: 'Password must be 8 or more characters'
                });
            }
            if (Validator.isEmpty(ConfirmPassword)) {
                return res.status(400).json({
                    success: false,
                    message: 'Confirm Password is required'
                });
            }
            if (Password != ConfirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Password must match Confirm Password'
                });
            }
        }
        if (Gender != 'M' && Gender != 'F') {
            return res.status(400).json({
                success: false,
                message: 'Gender must be Male or Female'
            });
        }

        //Check if the User Type is valid
        try {
            let UserTypeQueryResult = await UserType.findOne({
                where: {
                    id: UserTypeInput,
                    is_deleted: 0
                }
            });

            if (!UserTypeQueryResult) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid User Type'
                });
            }

            //Check if the Position Already Exist in
            let PositionQueryResult = await Position.findOne({
                where: {
                    id: PositionInput,
                    is_deleted: 0
                }
            });

            if (!PositionQueryResult) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid Position'
                });
            }




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


                FirstName = FirstName.toUpperCase();
                MiddleName = MiddleName.toUpperCase();
                LastName = LastName.toUpperCase();
                Gender = Gender.toUpperCase();

                if (Validator.isEmpty(Password) == false) {
                    const HashedPassword = await Bcrypt.hash(Password, 10);
                    AuthenticationQueryResult.password = HashedPassword;
                    await AuthenticationQueryResult.save({
                        transaction: Transaction
                    });
                }


                EmployeeQueryResult.first_name = FirstName;
                EmployeeQueryResult.middle_name = MiddleName;
                EmployeeQueryResult.last_name = LastName;
                EmployeeQueryResult.gender = Gender;
                EmployeeQueryResult.phone_number = PhoneNumber;
                EmployeeQueryResult.address = Address;
                EmployeeQueryResult.position_id = PositionInput;

                await EmployeeQueryResult.save({
                    transaction: Transaction
                });

                await Transaction.commit();
                return res.status(200).json({
                    success: true,
                    message: 'Employee Record was updated successfully',
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
            description: 'The following request bodies are required. user_type, first_name, middle_name, last_name, gender,position,password & confirm_password'
        });
    }
}