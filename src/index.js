require("dotenv").config();
require("./db/config.db");
const express = require("express");
const morgan = require("morgan");
const app = express();

//middlewares
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/api", require("./routes/index.routes"));

// only for debug
//app.post("/test", (req, res) => {
//console.log("Test: ", req.body);
//  res.send("Received data");
//});

app.listen(process.env.PORT || 3002, () => {
  console.log("Servidor operativo en el puerto", process.env.PORT);
});
