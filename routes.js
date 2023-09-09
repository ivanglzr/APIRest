"use strict";

const express = require("express");

let UserController = require("./controllers");

let router = express.Router();

router.get("/prueba", UserController.prueba);
router.post("/save", UserController.save);

module.exports = router;
