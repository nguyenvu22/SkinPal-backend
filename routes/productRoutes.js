const productsController = require("../controllers/productsController");

module.exports = (app) => {
  app.get("/api/products/allProducts/:idUser", productsController.getAll);
  app.get(
    "/api/products/allProducts/name/:idUser/:name",
    productsController.searchAll
  );
  app.get(
    "/api/products/allProducts/cate/:idUser/:idCategory",
    productsController.getAllByCategory
  );
  app.get(
    "/api/products/allProducts/:idUser/:idCategory/:name",
    productsController.searchWithCategory
  );
  app.get(
    "/api/products/favoriteProducts/:idUser",
    productsController.getAllByFavorite
  );
  app.post(
    "/api/products/favoriteAdditional",
    productsController.createFavorite
  );
  app.put(
    "/api/products/productModification/",
    productsController.updateFavorite
  );
};
