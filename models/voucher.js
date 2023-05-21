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
        V.startDate,
        V.endDate
      FROM vouchers V
      WHERE V.idUser = ?
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
    V.startDate,
    V.endDate
    FROM vouchers V
    WHERE V.idUser = ?
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

module.exports = Voucher;
