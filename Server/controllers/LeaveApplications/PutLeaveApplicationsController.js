const Validator = require('validator');
const LeaveApplication = require('../../Models/LeaveApplication');

module.exports = async(req, res) => {
    try {
        let ApprovedStatus = req.body.status;
        let LeaveApplicationId = req.params.id;

        if (Validator.isUUID(LeaveApplicationId) == false) {
            return res.status(400).json({
                success: false,
                message: 'Leave Application Id is invalid'
            });
        }

        if (ApprovedStatus == '') {
            return res.status(400).json({
                success: false,
                message: 'Leave Application Status is required'
            });
        }

        if (ApprovedStatus != 'pending' && ApprovedStatus != 'approved' && ApprovedStatus != 'rejected') {
            return res.status(400).json({
                success: false,
                message: 'Leave Application Status is invalid'
            });
        }
        try {
            const LeaveApplicationQueryResult = await LeaveApplication.findOne({
                where: {
                    id: LeaveApplicationId,
                    is_deleted: 0
                },
            });

            console.log(LeaveApplicationQueryResult);
            if (!LeaveApplicationQueryResult) {
                return res.status(400).json({
                    success: false,
                    message: 'Leave Application was not found'
                });
            }


            LeaveApplicationQueryResult.status = ApprovedStatus;

            await LeaveApplicationQueryResult.save();

            return res.status(200).json({
                success: true,
                message: 'Leave Application status was updated successfully'
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
            description: 'The following request bodies are required. status'
        });
    }
}