const ordersController = require("../controllers/ordersController");

module.exports = (app) => {
  app.post("/api/orders/create", ordersController.createOrder);
  app.post("/api/order_details/create", ordersController.createOrderDetail);
};
