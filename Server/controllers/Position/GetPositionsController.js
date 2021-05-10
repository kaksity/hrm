const Position = require("../../Models/Position");

module.exports = async(req, res) => {
    try {
        const PositionQueryResult = await Position.findAll({
            where: {
                is_deleted: 0,
            }
        });

        const Data = []

        PositionQueryResult.forEach(item => {
            Data.push({
                id: item.id,
                position: item.name
            });
        });

        return res.status(200).json({
            success: true,
            message: 'Retrieved the List of Positions Successfully',
            data: Data,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again',
            description: 'Could not complete the Operation'
        });
    }
}