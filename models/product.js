const db = require("../config/config");

const Product = {};

Product.getAll = (idUser, result) => {
  const sql = `
        SELECT
            P.id,
            P.name,
            P.image,
            P.description,
            P.price,
            P.instruction,
            P.discount,
            json_arrayagg(
              json_object(
                'id', A.id,
                'name', A.name
              )
            ) AS avoidance,
            (SELECT F.id FROM favorites AS F WHERE F.idProduct = P.id AND F.idUser = ?) AS favorite
        FROM
            products AS P
        INNER JOIN
            product_avoidance AS PA ON P.id = PA.idProduct
        INNER JOIN
            avoidances AS A ON A.id = PA.idAvoidance
        WHERE
            P.deleteFlag = 0
        GROUP BY 
            P.id
    `;

  db.query(sql, idUser, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      console.log(`Found ${data.length} product`);
      result(null, data);
    }
  });
};

Product.searchAll = (idUser, name, result) => {
  const sql = `
          SELECT
            P.id,
            P.name,
            P.image,
            P.description,
            P.price,
            P.instruction,
            P.discount,
            json_arrayagg(
              json_object(
                'id', A.id,
                'name', A.name
              )
            ) AS avoidance,
            (SELECT F.id FROM favorites AS F WHERE F.idProduct = P.id AND F.idUser = ?) AS favorite
        FROM
            products AS P
        INNER JOIN
            product_avoidance AS PA ON P.id = PA.idProduct
        INNER JOIN
            avoidances AS A ON A.id = PA.idAvoidance
        WHERE
            P.deleteFlag = 0 AND LOWER(P.name) LIKE ?
        GROUP BY 
            P.id
      `;

  db.query(sql, [idUser, `%${name.toLowerCase()}%`], (err, data) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      console.log(`Found ${data.length} product with category & name ${name}`);
      result(null, data);
    }
  });
};

Product.getAllByCategory = (idUser, idCategory, result) => {
  const sql = `
        SELECT
            P.id,
            P.name,
            P.image,
            P.description,
            P.price,
            P.instruction,
            P.discount,
            json_arrayagg(
              json_object(
                'id', A.id,
                'name', A.name
                )
            ) AS avoidance,
            (SELECT F.id FROM favorites AS F WHERE F.idProduct = P.id AND F.idUser = ?) AS favorite
        FROM
            products AS P
        INNER JOIN
            product_avoidance AS PA ON P.id = PA.idProduct
        INNER JOIN
            avoidances AS A ON A.id = PA.idAvoidance
        WHERE
            P.deleteFlag = 0 AND P.idCategory = ?
        GROUP BY 
            P.id
      `;

  db.query(sql, [idUser, idCategory], (err, data) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      console.log(
        `Found ${data.length} product with category id ${idCategory}`
      );
      result(null, data);
    }
  });
};

Product.searchWithCategory = (idUser, idCategory, name, result) => {
  const sql = `
        SELECT
            P.id,
            P.name,
            P.image,
            P.description,
            P.price,
            P.instruction,
            P.discount,
            json_arrayagg(
              json_object(
                'id', A.id,
                'name', A.name
              )
            ) AS avoidance,
            (SELECT F.id FROM favorites AS F WHERE F.idProduct = P.id AND F.idUser = ?) AS favorite
        FROM
            products AS P
        INNER JOIN
            product_avoidance AS PA ON P.id = PA.idProduct
        INNER JOIN
            avoidances AS A ON A.id = PA.idAvoidance
        WHERE
            P.deleteFlag = 0 AND P.idCategory = ? AND LOWER(P.name) LIKE ?
        GROUP BY 
            P.id
      `;

  //Lower case in both fe and be to simply search
  db.query(
    sql,
    [idUser, idCategory, `%${name.toLowerCase()}%`],
    (err, data) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log(
          `Found ${data.length} product with category id ${idCategory} & name ${name}`
        );
        result(null, data);
      }
    }
  );
};

Product.getAllByFavorite = (idUser, result) => {
  const sql = `
    SELECT
      P.id,
      P.name,
      P.image,
      P.description,
      P.price,
      P.instruction,
      P.discount,
      json_arrayagg(
        json_object(
          'id', A.id,
          'name', A.name
        )
      ) AS avoidance,
      F.id As favorite
    FROM
      products AS P
    INNER JOIN
      favorites AS F ON F.idProduct = P.id
    INNER JOIN
      product_avoidance AS PA ON P.id = PA.idProduct
    INNER JOIN
      avoidances AS A ON A.id = PA.idAvoidance
    WHERE
      P.deleteFlag = 0 AND F.idUser = ?
    GROUP BY 
      P.id
  `;

  db.query(sql, idUser, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      console.log(`Found ${data.length} product`);
      result(null, data);
    }
  });
};

Product.createFavorite = (idUser, idProduct, result) => {
  const sql = `
    INSERT INTO favorites(idUser, idProduct)
    VALUES(?,?)
  `;
  db.query(sql, [idUser, idProduct], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      console.log(`Create Product with id ${idProduct}.`);
      result(null, true);
    }
  });
};

Product.updateFavorite = (idUser, idProduct, result) => {
  const sql = `
    DELETE FROM favorites 
    WHERE idUser = ? AND idProduct = ?
  `;
  db.query(sql, [idUser, idProduct], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      console.log(`Delete Product with id ${idProduct}.`);
      result(null, true);
    }
  });
};

module.exports = Product;
