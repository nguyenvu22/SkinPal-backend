const Voucher = require("../models/voucher");

module.exports = {
    findAll(req, res) {
        const idUser = req.params.idUser;
        Voucher.findAll(idUser, (err, data) => {
          if (err) {
            return res.status(501).json({
              success: false,
              message: "Fail to get Blogs data!!",
              error: err,
            });
          }
          return res.status(200).json(data);
        });
      },
}