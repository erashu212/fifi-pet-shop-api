"use strict";

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: String,
  desc: String
});

const product = {
  name: {
    type: String,
    required: [ true, 'name can not be empty' ]
  },
  category: CategorySchema,
  price: Number,
  isActive: Boolean,
  desc: String,
  attrs: Array
}

module.exports = new mongoose.Schema(product);