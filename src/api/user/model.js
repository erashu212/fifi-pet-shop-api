"use strict";

const mongoose = require('mongoose');

const user = {
  name: String,
  username: {
    type: String,
    required: [ true, 'Username can not be empty' ]
  },
  password: {
    type: String,
    required: [ true, 'Password can not be empty' ]
  },
  status: {
    type: Number,
    default: 1
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}

module.exports = new mongoose.Schema(user);