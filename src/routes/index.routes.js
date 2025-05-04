const { Router } = require("express");
const router = Router();

const usuariosRoutes = require("./usuarios.routes");
const servicesRoutes = require("./services.routes");

router.use("/usuarios", usuariosRoutes);
router.use("/servicios", servicesRoutes);

module.exports = router;
