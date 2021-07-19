const express = require("express");
const app = express();
const connection = require("./src/models/Database");
const cors = require("cors");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

// Connecting to database
connection
  .authenticate()
  .then(() => {
    console.log("Successfully connected with database");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(routes);
app.use(cookieParser());

app.listen(3001, () => {
  console.log("App running: http://localhost:3001");
});
