const express = require("express");
const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
require("dotenv").config();

const mainRouter = require("./routes/index");

const { PORT = 3001 } = process.env;
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Conntected to database");
  })
  .catch(console.error);

app.use(express.json());

app.use(cors());

app.use(requestLogger);

app.use("/", mainRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
