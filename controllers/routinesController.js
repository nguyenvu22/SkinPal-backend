const Routine = require("../models/routine");

module.exports = {
  create(req, res) {
    const data = req.body;
    Routine.create(data, (err, result) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Can not create your routine for now",
          error: err,
        });
      }
      return res.status(201).json({
        success: true,
        message: "Created 1 routine for you",
        data: result,
      });
    });
  },

  findAll(req, res) {
    const idUser = req.params.idUser;
    Routine.findAll(idUser, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Fail to get your Routine!!",
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Your routine is here.",
        data: data,
      });
    });
  },
};
