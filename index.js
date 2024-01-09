const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config/config");
const { models, Sequelize } = require("./config/sequelize-config");
const userRouter = require("./routes/users.routes");
const { notfound } = require("./middlewares/notFound.middleware");
const { errorHandler } = require("./middlewares/errorHandler.middleware");
const cors = require("cors");
const movieRouter = require("./routes/movie.routes");
const { multerupload } = require("./middlewares/multerUpload.middleware");
// create application/json parser
const jsonParser = bodyParser.json();
const path = require("path");

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.use("/", userRouter);
app.use("/", movieRouter);
app.use(notfound);
app.use(errorHandler);

app.listen(config.port, config.host, () => {
  console.log(`Server running at http://${config.host}:${config.port}/`);
});
