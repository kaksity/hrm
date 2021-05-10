const Validator = require('validator');
const Position = require('../../Models/Position');
const UUID = require('uuid');
module.exports = async(req, res) => {
    try {
        let PositionInput = req.body.position;

        if (Validator.isEmpty(PositionInput)) {
            return res.status(400).json({
                success: false,
                message: 'Position is required',
                description: 'Position has to be supplied'
            });
        }

        //Check if the Qualification Already Exist in the Database
        try {
            PositionInput = PositionInput.toUpperCase();

            let PositionQueryResult = await Position.findOne({
                where: {
                    name: PositionInput,
                    is_deleted: 0,
                }
            });

            if (PositionQueryResult) {
                return res.status(400).json({
                    success: false,
                    message: 'This Position already exists in the database',
                    description: 'Try changing the position'
                });
            }

            const PositionUUID = UUID.v4();

            await Position.create({
                id: PositionUUID,
                name: PositionInput,
                is_deleted: 0,
            });

            return res.status(201).json({
                success: true,
                message: 'Position was added successfully'
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Try again',
                description: 'Could not complete the operation'
            });
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again',
            description: 'The Following request bodies are required. position'
        });
    }
}