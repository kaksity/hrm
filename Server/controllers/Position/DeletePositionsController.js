const Validator = require('validator');
const Position = require('../../Models/Position');
module.exports = async(req, res) => {
    try {
        let PositionID = req.params.id;


        if (Validator.isUUID(PositionID) == false) {
            return res.status(400).json({
                success: false,
                message: 'Position is required and must be valid',
                description: 'Position ID is UUID and is required'
            });
        }

        //Check if the Qualification Already Exist in the Database
        try {

            let PositionQueryResult = await Position.findOne({
                where: {
                    id: PositionID,
                    is_deleted: 0,
                }
            });

            if (!PositionQueryResult) {
                return res.status(400).json({
                    success: false,
                    message: 'This Position does not exist in the database',
                    description: 'Try changing the position'
                });
            }

            PositionQueryResult.is_deleted = 1;

            await PositionQueryResult.save();

            return res.status(201).json({
                success: true,
                message: 'Position was deleted successfully'
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