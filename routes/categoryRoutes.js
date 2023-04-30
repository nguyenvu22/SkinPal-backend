const categoriesController = require("../controllers/categoriesController");

module.exports = (app) => {
  app.get("/api/categories/allCategory", categoriesController.getAll);
};
