const express = require("express");
const {
  obtenerClima,
  obtenerNasa,
} = require("../controllers/services.controllers");

//const auth = require("../middlewares/auth");
const router = express.Router();

// rutas para c/u de los métodos HTTP.

router.get("/clima", obtenerClima);
router.get("/nasa", obtenerNasa);

// only for debug
//router.post("/test", (req, res) => {
//  console.log("Test: ", req.body);
//  res.send("Received data");
//});

module.exports = router;
