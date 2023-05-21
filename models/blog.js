const db = require("../config/config");

const Blog = {};

Blog.findAll = (result) => {
  const sql = `
    SELECT 
      id,
      image,
      description,
      title 
    FROM blogs
    ORDER BY RAND()
    LIMIT 5
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

module.exports = Blog;