const db = require("../config/config");

const Routine = {};

Routine.create = (data, result) => {
  const sql = `
  INSERT INTO 
    routines(
        name,
        schedules,
        dayOfWeeks,
        steps,
        idUser,
        deleteFlag,
        createdAt,
        updatedAt
    )
  VALUES(?,?,?,?,?,?,?,?)
  `;
  db.query(
    sql,
    [
      data.name,
      data.schedules,
      data.dayOfWeeks,
      data.steps,
      data.idUser,
      0,
      new Date(),
      new Date(),
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Create a routine with id: " + res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

Routine.findAll = (idUser, result) => {
  const sql = `
  SELECT 
    id, 
    name, 
    schedules, 
    dayOfWeeks,
    steps,
    idUser 
  FROM 
    routines 
  WHERE 
    idUser = ? AND deleteFlag = 0
    `;
  db.query(sql, idUser, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      console.log(`Found ${data.length} routine of this user`);
      result(null, data);
    }
  });
};

module.exports = Routine;
