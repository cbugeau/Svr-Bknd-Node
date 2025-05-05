const express = require("express");
const {
  registroUsuario,
  iniciarSesionUsuario,
  cerrarSesionUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuarioPorId,
  editarInfoUsuarioPorId,
  deleteUsuarioPorId,
} = require("../controllers/usuarios.controllers");

const auth = require("../middlewares/auth");
const router = express.Router();

// rutas para c/u de los métodos HTTP.
// router.get("/", auth("admin"), obtenerTodosLosUsuarios);
router.get("/", auth("admin"), obtenerTodosLosUsuarios);
router.get("/:id", auth("admin"), obtenerUnUsuarioPorId);

router.put("/:id", auth("admin"), editarInfoUsuarioPorId);

router.post("/register", registroUsuario);          // Alta usuario: datos completos de acuerdo al schema
router.post("/login", iniciarSesionUsuario);        // debe validar nombre/contraseña y crear token
router.post("/logout", cerrarSesionUsuario);      // debe validar nombre/contraseña y token

// only for debug
// router.post("/test", (req, res) => {
//   console.log("Test: ", req.body);
//   res.send("Received data");
//});

router.delete("/:id", auth("admin"), deleteUsuarioPorId);

module.exports = router;