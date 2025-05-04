const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_ACCESS)
  .then(() => console.log("Establecida la coneccion con la BD"))
  .catch((error) => console.log(error));
