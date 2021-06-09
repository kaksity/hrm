const UserType = require("../../Models/UserType");

module.exports = async(req, res) => {
    try {
        const UserTypesQueryResult = await UserType.findAll({
            where: {
                is_deleted: false,
            }
        });

        const Data = [];

        UserTypesQueryResult.forEach(item => {
            Data.push({ id: item.id, name: item.name });
        });

        return res.status(200).json({
            success: true,
            message: 'Retrieved List of User Types',
            data: Data
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again',
            description: 'Could not complete the operation'
        });
    }
}