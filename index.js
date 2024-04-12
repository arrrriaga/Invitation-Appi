require("dotenv").config();

const express = require("express");
const app = express();
PORT = process.env.PORT;

app.get("/", (req, res) => {
  return res.json({
    msg: "Bienvenido a mi backend",
    autor: "Francisco Arriaga",
  });
});

app.get("/home", (req, res) => {
  return res.json({
    msg: "Estas en home",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto: ${PORT}`);
});
