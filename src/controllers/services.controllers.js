const { clima, nasa } = require("../services/services.services");

const obtenerClima = async (req, res) => {
  //console.log("entra al controller de Clima");
  const { data, statusCode, error } = await clima();
  try {
    res.status(statusCode).json({ data });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const obtenerNasa = async (req, res) => {
  //console.log("entra al controller de NASA");
  const { data, statusCode, error } = await nasa();
  try {
    res.status(statusCode).json({ data });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = { obtenerClima, obtenerNasa };