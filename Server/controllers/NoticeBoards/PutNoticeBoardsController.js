const Validator = require('validator');
const NoticeBoard = require('../../Models/NoticeBoard');
module.exports = async(req, res) => {
    try {
        let NoticeID = req.params.id;

        let NoticeTitle = req.body.title;
        let NoticeBody = req.body.body;
        let NoticeDate = req.body.date;

        if (Validator.isUUID(NoticeID) == false) {
            return res.status(400).json({
                success: false,
                message: 'Notice ID is invalid'
            });
        }
        if (Validator.isEmpty(NoticeTitle)) {
            return res.status(400).json({
                success: false,
                message: 'Notice Title is required'
            });
        }
        if (Validator.isEmpty(NoticeBody)) {
            return res.status(400).json({
                success: false,
                message: 'Notice Body is required'
            });
        }
        if (Validator.isEmpty(NoticeDate)) {
            return res.status(400).json({
                success: false,
                message: 'Notice Date is required'
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

        NoticeBoardsQueryResult.title = NoticeTitle;
        NoticeBoardsQueryResult.body = NoticeBody;
        NoticeBoardsQueryResult.date_posted = NoticeDate;

        await NoticeBoardsQueryResult.save();
        return res.status(200).json({
            success: true,
            message: 'Notice updated successfully',
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again'
        });
    }
}