const Skintype = require("../models/skintype");


module.exports = {
    getAllSkinType(req, res) {
        Skintype.findAll((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Fail to get all skintype data!!",
                    error: err,
                });
            }
            return res.status(200).json(data);
        });
    },
    getAllSkinTypeAns(req, res) {
        Skintype.findAllAns((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Fail to get all skintype answer data!!",
                    error: err,
                });
            }
            return res.status(200).json(data);
        });
    },
    updateUserSkinType(req, res) {
        const dataType = req.body
        Skintype.updateUserSkinType(dataType, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Fail to update skintype user data!!",
                    error: err,
                });
            }
            return res.status(200).json({
                success: true,
                message: "Update successfully",
            });
        });
    },
};
