"use strict";

const User = require("./model");

const validateString = (str) => {
  if (!str || str.trim().length === 0) return false;
  return true;
};

let controller = {
  prueba: (req, res) => {
    return res.status(200).send({
      status: "success",
      node: "npm",
    });
  },

  save: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (
        !validateString(name) ||
        !validateString(email) ||
        !validateString(password)
      ) {
        throw "Los datos no son válidos";
      }

      const users = await User.find({
        $or: [{ name: name }, { email: email }],
      });

      if (users.length > 0) {
        return res.status(500).send({
          status: "error",
          message: "El usuario ya existe",
        });
      }

      const user = new User({
        name: name,
        email: email,
        password: password,
      });

      const userStored = await user.save();

      return res.status(200).send({
        status: "success",
        user: userStored,
      });
    } catch (err) {
      console.error(err);

      return res.status(500).send({
        status: "error",
        message: "Error en el servidor",
        error: err,
      });
    }
  },
};

module.exports = controller;
