const db = require("../config/config");

const Order = {};
const OrderDetail = {};

Order.create = (data, result) => {
  const sql = `
    INSERT INTO 
	    orders(
		    status,
        totalPrice,
        address,
        phone,
        idUser,
        createdAt,
        updatedAt
	    )
    VALUES(?,?,?,?,?,?,?)
  `;
  db.query(
    sql,
    [
      data.status,
      data.totalPrice,
      data.address,
      data.phone,
      data.idUser,
      new Date(),
      new Date(),
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Create a order with id: " + res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

OrderDetail.create = (data, result) => {
  const sql = `
    INSERT INTO 
	    order_detail(
		    idOrder,
        idProduct,
        quantity
	    )
    VALUES(?,?,?)
  `;
  db.query(sql, [data.idOrder, data.idProduct, data.quantity], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      console.log("Create a order detail with id: " + res.insertId);
      result(null, res);
    }
  });
};

module.exports = { Order, OrderDetail };
