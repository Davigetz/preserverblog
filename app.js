const express = require("express");
const morgan = require("morgan");
const routes = require("./routes");

const app = express();

app.name = "BLOG API";

app.use(morgan("dev"));

app.use("/", routes);

app.use((request, response) => {
  response.json({ message: "Hey! This is your server response!" });
});

module.exports = app;
