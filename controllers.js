"use strict";

const User = require("./model");

const validateString = (str) => {
  if (!str || str.trim().length === 0 || str === null || str === undefined)
    return false;
  return true;
};

let controller = {
  prueba: (req, res) => {
    return res.status(200).send({
      status: "success",
      node: "npm",
    });
  },

  register: async (req, res) => {
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

  login: (req, res) => {
    let { email, password } = req.params;

    if (!validateString(email) || !validateString(password)) {
      return res.status(500).send({
        status: "error",
        message: "Los datos no son validos",
      });
    }

    User.findOne({ email: email, password: password })
      .then((user) => {
        try {
          if (user === null || user.length <= 0) {
            throw "User not found";
          }

          return res.status(200).send({
            status: "success",
            user: user,
          });
        } catch (err) {
          console.log(err);
          return res.status(404).send({
            status: "error",
            message: "No se encontro el usuario",
          });
        }
      })
      .catch((err) => console.log(err));
  },

  getUser: (req, res) => {
    let id = req.params.id;

    User.findById(id)
      .then((user) => {
        console.log(user);
        return res.status(200).send({
          status: "success",
          user: user,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).send({
          status: "error",
          message: "No se ha encontrado el usuario",
        });
      });
  },

  updateUser: (req, res) => {
    try {
      let newUser = req.body;

      if (
        !validateString(newUser.name) ||
        !validateString(newUser.email) ||
        !validateString(newUser.password)
      ) {
        throw "Faltan datos del usuario";
      }

      let id = req.params.id;

      User.findOneAndUpdate({ _id: id }, newUser, { new: true }).then(
        (userUpdated) => {
          console.log(userUpdated);

          if (!userUpdated) {
            throw "Error al actualizar el usuario";
          }

          return res.status(200).send({
            status: "success",
            user: userUpdated,
          });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send({
        status: "error",
        message: `${err}`,
      });
    }
  },

  deleteUser: (req, res) => {
    let id = req.params.id;

    User.findOneAndDelete({ _id: id })
      .then((userRemoved) => {
        if (!userRemoved) {
          return res.status(404).send({
            status: "error",
            message: "No se ha encontrado el usuario",
          });
        }

        return res.status(200).send({
          status: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({
          status: "error",
          message: "Ha ocurrido un error al eliminar",
        });
      });
  },
};

module.exports = controller;
