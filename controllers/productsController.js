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
};
