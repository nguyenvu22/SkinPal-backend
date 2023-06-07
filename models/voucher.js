const db = require("../config/config");

const Voucher = {};

Voucher.findAll = (idUser, result) => {
  var sql;
  if (idUser == 0) {
    sql = `
      SELECT 
        V.id,
        V.name,
        V.condition,
        V.image,
        V.isUsed,
        V.discount,
        V.startDate,
        V.endDate
      FROM vouchers V
      WHERE V.idUser = ? AND V.isUsed = 0
      ORDER BY RAND()
      LIMIT 5
      `;
  } else {
    sql = `
    SELECT 
      V.id,
      V.name,
      V.condition,
      V.image,
      V.isUsed,
      V.discount,
      V.startDate,
      V.endDate
    FROM vouchers V
    WHERE V.idUser = ? AND V.isUsed = 0
    ORDER BY V.condition ASC
    `;
  }
  db.query(sql, idUser, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      console.log(`Found ${data.length} voucher`);
      result(null, data);
    }
  });
};

Voucher.updateUsedVoucher = (idVoucher, result) => {
  const sql = `
  UPDATE
    vouchers
  SET
    isUsed = 1
  WHERE
    id = ?
  `;
  db.query(sql, idVoucher, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      console.log("voucher is used");
      result(null, true);
    }
  });
};

module.exports = Voucher;
