"use strict";

const validator = require("validator");
let User = require("./model");

const validateString = (str) => {
  if (str.length <= 0 || str == undefined || str == null) return false;
  return true;
};

let controller = {
  prueba: (req, res) => {
    console.log(req, res);

    return res.status(200).send({
      status: "success",
      node: "npm",
    });
  },

  save: (req, res) => {
    let { name, email, password } = req.body;

    console.log(req.body); // Mostrar los datos del cuerpo de la solicitud en la consola

    try {
      if (
        !validateString(name) ||
        !validateString(email) ||
        !validateString(password)
      )
        throw "Los datos no son válidos";
    } catch (err) {
      return res.status(400).send({
        status: "error",
        error: err,
      });
    }

    if (name && email && password) {
      const user = new User({
        name: name,
        email: email,
        password: password,
      });

      user
        .save()
        .then((userStored) => {
          console.log("User saved", userStored);
          return res.status(200).send({
            status: "success",
            user: userStored,
          });
        })
        .catch((err) => {
          return res.status(500).send({
            status: "error",
            message: "El usuario no se ha guardado",
            error: err,
          });
        });
    } else {
      return res.status(400).send({
        status: "error",
        error: "Los datos no son válidos",
      });
    }
  },
};

module.exports = controller;
