const UsuariosModel = require("../model/usuarios.model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");

//debe validar: usuario Exista, este habilitado, y Token válido
const obtenerTodosLosUsuariosBD = async () => {
  try {
    const usuarios = await UsuariosModel.find();

    return {
      usuarios,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const obtenerUnUsuariosPorIdBD = async (idUsuario) => {
  try {
    const usuario = await UsuariosModel.findOne({ _id: idUsuario });

    if (usuario==null) {
      return {
        usuario: "usuario inexistente!!!",
        statusCode: 200, // ok
      };
    }

    return {
      usuario,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const editarInfoUsuarioPorIdBD = async (idUsuario, body) => {
  try {
    await UsuariosModel.findByIdAndUpdate({ _id: idUsuario }, body);

    return {
      msg: "usuario modificado con exito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

// DELETE body:JSON {idUsuario} Headers {token}
const deleteUsuarioPorIdBD = async (idUsuario) => {
  try {
    const usuarioExiste = await UsuariosModel.findOne({ _id: idUsuario });

    if (!usuarioExiste) {
      return {
        msg: "ERROR en el ID. El usuario no existe",
        statusCode: 404,             // 404 Not Found
      };
    }

    await UsuariosModel.findByIdAndDelete({ _id: idUsuario });

    return {
      msg: "usuario eliminado de la B.D. con exito",
      statusCode: 200,               // 200 OK
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,              // 500 Internal Server Error
    };
  }
};

const registrarUsuarioBD = async (body) => {
// falta validar si ya existe un usuario por nombre/apellido
  try {
    const nuevoUsuario = new UsuariosModel(body);
    nuevoUsuario.contrasenia = await argon.hash(body.contrasenia);

    await nuevoUsuario.save();

    return {
      msg: "Usuario registrado con exito",
      statusCode: 201,              // 201 Created
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,              // 500 Internal Server Error
    };
  }
};

const iniciarSesionUsuarioDB = async (body) => {

 /* if (!body.nombreUsuario && body.nombreUsuario==null) {
    return {
      msg: "No se especifico el usuario",
    };
  }*/

  try {
    const usuarioExiste = await UsuariosModel.findOne({nombreUsuario: body.nombreUsuario});

    if (!usuarioExiste) {
      return {
        msg: "usuario y/o contraseña incorrecto. (USUARIO)",
        statusCode: 409, // 409 Conflict
      };
    }

    if (usuarioExiste.estado === "deshabilitado") {
      return {
        msg: "Usuario bloqueado. Debes cominicarte con algun admin",
        statusCode: 400, // 400 Bad Request
      };
    }

    //console.log(usuarioExiste.contrasenia);
    //console.log(body.contrasenia);

    const verificarContrasenia = await argon.verify(usuarioExiste.contrasenia, body.contrasenia);

    if (verificarContrasenia) {
      const payload = {
        idUsuario: usuarioExiste._id,
        rolUsuario: usuarioExiste.rol,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      usuarioExiste.login = "logueado";
      await usuarioExiste.save();

      return {
        msg: "usuario logueado",
        token,
        statusCode: 200, // 200 OK
      };
    } else {
      return {
        msg: "usuario y/o contraseña incorrecto. (CONTRASENIA)",
        statusCode: 409, // 409 Conflict
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500, //500 Internal Server Error
    };
  }
};

// POST body{nombreUsuario, contrasenia}, Header{token}
const cerrarSesionUsuarioDB = async (body) => {
  //console.log("body.nombreUsuario: ", body.nombreUsuario);
  try{
    const usuarioExiste = await UsuariosModel.findOne({nombreUsuario: body.nombreUsuario});

/*    if (!usuarioExiste) {
      return {
        msg: "Dato erroneo (Usuario Inexsistente)",
        statusCode: 500,
      };
    }*/
    //console.log("body.contrasenia: ", body.contrasenia);
    const verificarContrasenia = await argon.verify(usuarioExiste.contrasenia,body.contrasenia);

/*    if (!verificarContrasenia) {
      return {
        msg: "Dato erroneo (Contraseña Inexsistente/erronea)",
        statusCode: 500,
      };
    }*/

    usuarioExiste.login = "deslogueado";
    await usuarioExiste.save();

    return {
      msg: "Usuario deslogueado",
      statusCode: 200,
    };
  }catch(error){
    return{
      error,
      statusCode: 500,
    };
  }
}

module.exports = {
  obtenerTodosLosUsuariosBD,
  obtenerUnUsuariosPorIdBD,
  editarInfoUsuarioPorIdBD,
  deleteUsuarioPorIdBD,
  registrarUsuarioBD,
  iniciarSesionUsuarioDB,
  cerrarSesionUsuarioDB,
};
