const vouchersController = require("../controllers/vouchersController");

module.exports = (app) => {
  app.get("/api/vouchers/:idUser", vouchersController.findAll);
  app.put("/api/vouchers/usedVoucher", vouchersController.updateUsedVoucher)
};
