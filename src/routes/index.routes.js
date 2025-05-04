const { Router } = require("express");
const router = Router();

const usuariosRoutes = require("./usuarios.routes");

router.use("/usuarios", usuariosRoutes);

module.exports = router;
