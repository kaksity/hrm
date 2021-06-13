const Validator = require('validator');
const NoticeBoard = require('../../Models/NoticeBoard');
const UUID = require('uuid');
module.exports = async(req, res) => {
    try {
        let NoticeTitle = req.body.title;
        let NoticeBody = req.body.body;
        let NoticeDate = req.body.date;

        console.log(req.body);
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

        await NoticeBoard.create({
            id: UUID.v4(),
            title: NoticeTitle,
            body: NoticeBody,
            date_posted: NoticeDate,
            is_deleted: 0
        });
        return res.status(201).json({
            success: true,
            message: 'New Notice was created successfully'
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again'
        });
    }
}