"use strict";

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = Schema({
  name: String,
  age: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
