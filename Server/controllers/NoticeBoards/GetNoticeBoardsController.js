const Validator = require('validator');
const NoticeBoard = require("../../Models/NoticeBoard");

exports.AllRecord = async(req, res) => {
    try {
        let NoticeBoardsQueryResult = await NoticeBoard.findAll({
            where: {
                is_deleted: 0
            }
        });

        const Data = [];

        NoticeBoardsQueryResult.forEach(item => {
            Data.push({
                id: item.id,
                title: item.title,
                date_posted: item.date_posted
            });
        });

        return res.status(200).json({
            success: true,
            message: 'Retrived List of Notices Successfully',
            data: Data
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again'
        });
    }
}

exports.Single = async(req, res) => {
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

        const Data = {
            id: NoticeBoardsQueryResult.id,
            title: NoticeBoardsQueryResult.title,
            body: NoticeBoardsQueryResult.body,
            date_posted: NoticeBoardsQueryResult.date_posted,
        }

        return res.status(200).json({
            success: true,
            message: 'Retrived Notice Board Data',
            data: Data,
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again'
        });
    }
}