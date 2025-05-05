const jwt = require("jsonwebtoken");

module.exports = (rolRuta) => (req, res, next) => {
  const token = req.header("token");
  const verificarToken = jwt.verify(token, process.env.JWT_SECRET);
  //console.log(rolRuta);
  if (
    verificarToken.rolUsuario === rolRuta ||
    rolRuta.includes(verificarToken.rolUsuario)
  ) {
    req.idUsuario = verificarToken.idUsuario;
     next();
  } else {
    res.status(401).json("No estas autorizado!!");          // 401 Unauthorized
  }
};