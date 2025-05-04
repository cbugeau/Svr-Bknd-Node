const express = require("express");
const {
  registroUsuario,
  iniciarSesionUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuarioPorId,
  editarInfoUsuarioPorId,
  altaLogicaUsuarioPorId,
  bajaLogicaUsuarioPorId,
  bajaFisicaUsuarioPorId,
} = require("../controllers/usuarios.controllers");
const auth = require("../middlewares/auth");
const router = express.Router();

// rutas para c/u de los métodos HTTP.
//router.get("/", auth("admin"), obtenerTodosLosUsuarios);
router.get("/", obtenerTodosLosUsuarios);

router.get("/:id", auth("admin"), obtenerUnUsuarioPorId);

router.put("/:id", auth(["admin", "usuario"]), editarInfoUsuarioPorId);
router.put("/enabled/:id", auth("admin"), altaLogicaUsuarioPorId);
router.put("/disabled/:id", auth("admin"), bajaLogicaUsuarioPorId);

router.post("/register", registroUsuario);
router.post("/login", iniciarSesionUsuario);

// only for debug
//router.post("/test", (req, res) => {
//  console.log("Test: ", req.body);
//  res.send("Received data");
//});

router.delete("/:id", auth("admin"), bajaFisicaUsuarioPorId);

module.exports = router;