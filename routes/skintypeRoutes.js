const skintypeController = require("../controllers/skintypeController");

module.exports = (app) => {
    app.get("/api/list/skin-type", skintypeController.getAllSkinType);
    app.get("/api/list-ans/skin-type", skintypeController.getAllSkinTypeAns);
    app.put("/api/update/skin-type", skintypeController.updateUserSkinType);
};
