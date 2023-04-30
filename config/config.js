const mysql = require("mysql");

//Connect db
const db = mysql.createConnection({
  host: "localhost",
  user: "freeuser",
  password: "",
  database: "skinpal_app",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("DATABASE CONNECTED");
});

module.exports = db;
