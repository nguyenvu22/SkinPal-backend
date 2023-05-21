const blogsController = require("../controllers/blogsController");

module.exports = (app) => {
  app.get("/api/blogs", blogsController.findAll);
};
