require("dotenv").config();
//! Models
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//! Routes

const app = express();

app.use(cors());
app.use(express.json());
//! Static Server

mongoose.connect(process.env.URI_MONGO);

app.use((req, res) => {
  res.send('<a href="/v1">Regresa a la API </a>');
});

app.listen(process.env.PORT, () => {
  console.log("Escuchando en el puerto: ", process.env.PORT);
});
