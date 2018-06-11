'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: { type: String },
	lastName: { type: String },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

userSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
    delete ret.password;
  }
});