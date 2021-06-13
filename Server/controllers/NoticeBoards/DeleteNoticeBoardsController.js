const Validator = require('validator');
const NoticeBoard = require('../../Models/NoticeBoard');
module.exports = async(req, res) => {
    try {
        let NoticeID = req.params.id;

        if (Validator.isUUID(NoticeID) == false) {
            return res.status(400).json({
                success: false,
                message: 'Notice ID is invalid'
            });
        }

        let NoticeBoardsQueryResult = await NoticeBoard.findOne({
            where: {
                is_deleted: 0,
                id: NoticeID
            }
        });

        if (!NoticeBoardsQueryResult) {
            return res.status(400).json({
                success: false,
                message: 'Notice record does not exist'
            });
        }

        NoticeBoardsQueryResult.is_deleted = 1;
        await NoticeBoardsQueryResult.save();
        return res.status(200).json({
            success: true,
            message: 'Notice deleted successfully',
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again'
        });
    }
}