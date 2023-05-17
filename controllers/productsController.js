const Product = require("../models/product");

module.exports = {
  getAll(req, res) {
    const idUser = req.params.idUser;
    Product.getAll(idUser, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Fail to get all Product data!!",
          error: err,
        });
      }
      return res.status(200).json(data);
    });
  },

  searchAll(req, res) {
    const idUser = req.params.idUser;
    const name = req.params.name;
    console.log(name);
    Product.searchAll(idUser, name, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Fail to take Product data with this name!!",
          error: err,
        });
      }
      return res.status(200).json(data);
    });
  },

  getAllByCategory(req, res) {
    const idUser = req.params.idUser;
    const idCategory = req.params.idCategory;
    Product.getAllByCategory(idUser, idCategory, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Fail to take Product data in this category!!",
          error: err,
        });
      }
      return res.status(200).json(data);
    });
  },

  searchWithCategory(req, res) {
    const idUser = req.params.idUser;
    const idCategory = req.params.idCategory;
    const name = req.params.name;
    Product.searchWithCategory(idUser, idCategory, name, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Fail to take Product data!!",
          error: err,
        });
      }
      return res.status(200).json(data);
    });
  },

  getAllByFavorite(req, res) {
    const idUser = req.params.idUser;
    Product.getAllByFavorite(idUser, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Fail to get all Product data!!",
          error: err,
        });
      }
      return res.status(200).json(data);
    });
  },

  createFavorite(req, res) {
    const idUser = req.body.idUser;
    const idProduct = req.body.idProduct;
    Product.createFavorite(idUser, idProduct, (err, data) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Update an product fail!!",
          error: err,
        });
      }
      return res.status(201).json({
        success: true,
        data: true,
      });
    });
  },
  
  updateFavorite(req, res) {
    const idUser = req.body.idUser;r
    const idProduct = req.body.idProduct;
    Product.updateFavorite(idUser, idProduct, (err, data) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Update an product fail!!",
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        data: true,
      });
    });
  },
};
