const Blog = require("../models/blog");

module.exports = {
  findAll(req, res) {
    Blog.findAll((err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Fail to get all Blog data!!",
          error: err,
        });
      }
      return res.status(200).json(data);
    });
  },
};
