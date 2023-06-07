const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const routineRoutes = require("./routes/routineRoutes");
const chatRoutes = require("./routes/chatRoutes");
const blogRoutes = require("./routes/blogRoutes");
const voucherRoutes = require("./routes/voucherRoutes");
const skintypeRoutes = require("./routes/skintypeRoutes");

const port = process.env.PORT || 3000;
app.use(express.json({ limit: "9000mb" }));
app.use(express.urlencoded({ limit: "9000mb", extended: true }));
app.use(logger("dev"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.disable("x-powered-by");
app.set("port", port);

//Store temporatory upload image
const upload = multer({
  storage: multer.memoryStorage(),
});

// Route
userRoutes(app, upload);
categoryRoutes(app);
productRoutes(app);
orderRoutes(app);
routineRoutes(app);
chatRoutes(app);
blogRoutes(app);
voucherRoutes(app);
skintypeRoutes(app)
server.listen(3000, process.env.IP || "localhost", function () {
  console.log("Starting server at port : " + port);
});
app.get("/", (req, res) => {
  res.send("index");
});

//ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});
