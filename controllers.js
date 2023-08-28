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

  save: (req, res) => {},
};

module.exports = controller;
