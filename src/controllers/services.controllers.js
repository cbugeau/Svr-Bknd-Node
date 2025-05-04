const { clima } = require("../services/services.services");

const obtenerClima = async (req, res) => {
  //console.log("entra al controller de Clima");
  const { data, statusCode, error } = await clima();
  try {
    res.status(statusCode).json({ data });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = { obtenerClima };