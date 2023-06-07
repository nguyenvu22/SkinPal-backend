const db = require("../config/config");

const User = {};

User.create = (user, result) => {
  const sql = `
        INSERT INTO
            users(
              name,
              email,
              password,
              dob,
              avatar,
              isPremium,
              deleteFlg,
              createdAt,
              updatedAt
            )
        VALUES(?,?,?,?,?,?,?,?,?)
    `;

  db.query(
    sql,
    [
      user.name,
      user.email,
      user.password,
      user.dob,
      user.avatar,
      0,
      0,
      new Date(),
      new Date(),
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Create a user with id: " + res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

User.findByEmail = (email, result) => {
  const sql = `
        SELECT
            id,
            name,
            email,
            password,
            dob,
            avatar,
            membership,
            isStudent,
            studentIdentificationImg,
            isPremium,
            startPremium,
            endPremium
        FROM
            users
        WHERE
            email = ?
    `;

  db.query(sql, email, (err, user) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      console.log("User: " + user);
      result(null, user);
    }
  });
};

User.update = (user, result) => {
  const sql = `
    UPDATE
      users
    SET
      name = ?,
      password = ?,
      dob = ?,
      avatar = ?,
      updatedAt = ?
    WHERE
      id = ?
  `;

  db.query(
    sql,
    [user.name, user.password, user.dob, user.avatar, new Date(), user.id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Update a user with id: " + user.id);
        result(null, true);
      }
    }
  );
};

User.updateWithoutImg = (user, result) => {
  const sql = `
    UPDATE
      users
    SET
      name = ?,
      password = ?,
      dob = ?,
      updatedAt = ?
    WHERE
      id = ?
  `;

  db.query(
    sql,
    [user.name, user.password, user.dob, new Date(), user.id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Update a user with id: " + res);
        result(null, true);
      }
    }
  );
};

User.updateToPremium = (data, result) => {
  const sql = `
    UPDATE
      users
    SET
      isPremium = 1,
      startPremium = ?,
      endPremium = ?
    WHERE
      id = ?
  `;
  db.query(
    sql,
    [data.startPremium, data.endPremium, data.idUser],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Update a user with id: " + res);
        result(null, true);
      }
    }
  );
};

module.exports = User;
