const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { type } = require("os");

const UserSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
    },
    number: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
    },
    salt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(uniqueValidator); //Agrega la hora en que se crea y modifica

//! Funciones del modelo
//Encriptador de cadenas
UserSchema.methods.encryptString = function (stringToEncrypt, salt) {
  return crypto
    .pbkdf2Sync(stringToEncrypt, salt, 10000, 512, "sha512")
    .toString("hex");
};

//Primero genera un salt utilizando crypto y random bytes y se guarda en el usuario
//Recibe el parámetro password del usuario y lo encripta
UserSchema.methods.hashPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = this.encryptString(password, this.salt);
};

//Vuelve a encriptar el parámetro password recibido por el usuario y lo compara vs el password encriptado guardado en el registro
UserSchema.methods.verifyPassword = function (password) {
  return this.password === this.encryptString(password, this.salt);
};

//Genera un token al pasarle el id del usuario, el tipo y el secret
UserSchema.methods.generateJWT = function () {
  return jwt.sign({ idUser: this._id, tipo: this.tipo }, process.env.SECRET);
};

//Al iniciar sesión regresa id, tipo y vuelve a generar el token guardado en el registro
UserSchema.methods.onSingGenerateJWT = function () {
  return {
    idUser: this._id,
    tipo: this.tipo,
    token: this.generateJWT(),
  };
};

//! 3.- Exportar modelo
mongoose.model("User", UserSchema, "coleccionUser");
