const {
  registrarUsuarioBD,
  iniciarSesionUsuarioDB,
  cerrarSesionUsuarioDB,
  obtenerTodosLosUsuariosBD,
  obtenerUnUsuariosPorIdBD,
  editarInfoUsuarioPorIdBD,
  deleteUsuarioPorIdBD,
} = require("../services/usuarios.services");

const obtenerTodosLosUsuarios = async (req, res) => {
  const { usuarios, statusCode, error } = await obtenerTodosLosUsuariosBD();
  try {
    res.status(statusCode).json({ usuarios });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const obtenerUnUsuarioPorId = async (req, res) => {
  const { usuario, statusCode, error } = await obtenerUnUsuariosPorIdBD(req.params.id);
  try {
    res.status(statusCode).json({ usuario });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const editarInfoUsuarioPorId = async (req, res) => {
  const { msg, statusCode, error } = await editarInfoUsuarioPorIdBD(req.params.id, req.body);
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const deleteUsuarioPorId = async (req, res) => {
  const { msg, statusCode, error } = await bajaFisicaUsuarioPorIdBD(req.params.id);
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const registroUsuario = async (req, res) => {
  //console.log("Desde el Controller: ", req.body);
  const { msg, statusCode, error } = await registrarUsuarioBD(req.body);
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const iniciarSesionUsuario = async (req, res) => {
  const { msg, statusCode, token, error } = await iniciarSesionUsuarioDB(req.body);

  try {
    res.status(statusCode).json({ msg, token });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const cerrarSesionUsuario = async (req, res) => {
  const { msg, statusCode, error } = await cerrarSesionUsuarioDB(req.body);

  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  obtenerTodosLosUsuarios,
  obtenerUnUsuarioPorId,
  editarInfoUsuarioPorId,
  deleteUsuarioPorId,
  registroUsuario,
  iniciarSesionUsuario,
  cerrarSesionUsuario,
};
