"use strict";

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", UserSchema);
