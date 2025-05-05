const { Schema, model } = require("mongoose");

const UsuariosSchema = new Schema({
  nombreUsuario: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowerCase: true,
    maxLength: [50, "Limite maximo 50 caracteres"],
    minLength: [3, "Limite minimo es 3 caracteres"],
  },
  emailUsuario: {
    type: String,
    maxLength: [50, "Limite maximo 50 caracteres"],
  },
  contrasenia: {
    type: String,
    minLength: [8, "Limite minimo es 8 caracteres"],
  },
  estado: {
    type: String,
    trim: true,
    enum: ["habilitado", "deshabilitado"],
    default: "deshabilitado",
  },
  rol: {
    type: String,
    enum: ["usuario", "admin"],
    default: "usuario",
  },
  login: {
    type: String,
    enum: ["logueado", "deslogueado"],
    default: "deslogueado",
  },
});

UsuariosSchema.methods.toJSON = function () {
  const { contrasenia, ...usuario } = this.toObject();
  return usuario;
};

const UsuariosModel = model("usuarios", UsuariosSchema);
module.exports = UsuariosModel;
