const db = require("../config/config");

const Skintype = {};
Skintype.findAll = (result) => {
    const sql = `
  SELECT * FROM skin_types;
  `;
    db.query(sql, (err, data) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
        } else {
            console.log(`Found ${data.length} blog`);
            result(null, data);
        }
    });
};
Skintype.findAllAns = (result) => {
    const sql = `
    SELECT * FROM skin_type_questions;
    `;
    db.query(sql, (err, data) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
        } else {
            console.log(`Found ${data.length} blog`);
            result(null, data);
        }
    });
};
Skintype.updateUserSkinType = (data, result) => {
    const sql = `
    UPDATE users SET idSkinType = ? WHERE (id = ?);
    `;
    db.query(sql, [data.idSkinType, data.idUser], (err, data) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
        } else {
            console.log("Update a user with id: " + data);
            result(null, true);
        }
    });
};
module.exports = Skintype;