const mysql = require("mysql2");

//Connect db
const db = mysql.createConnection({
  host: "localhost",
  user: "freeuser",
  password: "",
  database: "skinpal_app",
});
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123456",
//   database: "shkinpal_app",
// });

db.connect(function (err) {
  if (err) throw err;
  console.log("DATABASE CONNECTED");
});

module.exports = db;
