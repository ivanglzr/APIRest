"use strict";

const validator = require("validator");
let User = require("./model");

let controller = {
  prueba: (req, res) => {
    console.log(req, res);

    return res.status(200).send({
      status: "success",
      node: "npm",
    });
  },

  save: (req, res) => {
    let params = req.body;

    let validate_name;
    let validate_email;
    let validate_password;

    try {
      validate_name = !validate_name.isEmpty(params.name);
      validate_email = !validate_email.isEmpty(params.email);
      validate_password = !validate_password.isEmpty(params.password);
    } catch (err) {
      return res.status(404).send({
        status: "error",
        error: err,
      });
    }

    if (validate_name && validate_email && validate_password) {
      let user = new User();

      user.name = params.name;
      user.email = params.email;
      user.password = params.password;

      user
        .save()
        .then((userStored) => {
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
      return res.status(404).send({
        status: "error",
        error: "Los datos no son validos",
      });
    }
  },
};

module.exports = controller;
