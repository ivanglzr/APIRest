"use strict";

const mongoose = require("mongoose");
let app = require("./app");

const url = "mongodb://localhost:27017/users";
const port = 3900;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    console.log("Conectado");
    app.listen(port, () => {
      console.log("Servidor corriendo en el puerto:", port);
    });
  })
  .catch((err) => console.log(err));
