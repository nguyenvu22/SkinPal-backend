const Category = require("../models/category");

module.exports = {
  getAll(req, res) {
    Category.getAll((err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Fail to get all Category data !!",
          error: err,
        });
      }
      return res.status(200).json(data);
    });
  },
};
