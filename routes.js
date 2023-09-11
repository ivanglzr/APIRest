"use strict";

const express = require("express");

let UserController = require("./controllers");

let router = express.Router();

router.get("/prueba", UserController.prueba);
router.get("/login/:email/:password", UserController.login);
router.get("/get-user/:id", UserController.getUser);
router.post("/register", UserController.register);
router.put("/update-user/:id", UserController.updateUser);
router.delete("/delete-user/:id", UserController.deleteUser);

module.exports = router;
