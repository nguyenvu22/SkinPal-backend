const skintypeController = require("../controllers/skintypeController");

module.exports = (app) => {
  app.get("/api/skin-type/list", skintypeController.getAllSkinType);
  app.get("/api/skin-type/list-ans", skintypeController.getAllSkinTypeAns);
  app.put("/api/skin-type/update", skintypeController.updateUserSkinType);
};
