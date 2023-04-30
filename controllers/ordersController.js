const { Order, OrderDetail } = require("../models/order");

module.exports = {
  createOrder(req, res) {
    const data = req.body;
    Order.create(data, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Can not take your order",
          error: err,
        });
      }
      return res.status(201).json({
        success: true,
        message: "We have taken your order. PLease wait until it reach you.",
        data: data, // return order's id that is created
      });
    });
  },

  createOrderDetail(req, res) {
    const data = req.body;
    OrderDetail.create(data, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          error: err,
        });
      }
      return res.status(201).json({
        success: true,
        data: true,
      });
    });
  },
};
