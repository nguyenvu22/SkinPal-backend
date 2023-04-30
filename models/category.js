const db = require("../config/config");

const Category = {};

Category.getAll = (result) => {
  const sql = `
    SELECT
        id,
        name
    FROM
        categories
  `;

  db.query(sql, (err, data) => {
    if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log(`Found ${data.length} category`);
        result(null, data);
      }
  });
};

module.exports = Category;
