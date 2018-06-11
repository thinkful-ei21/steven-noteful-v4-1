'use strict';

const express = require('express');
const mongoose = require('mongoose');

const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const User = require('../models/user');

const router  = express.Router();

const localAuth = passport.authenticate('local', { session: false });

router.post('/users', localAuth, (req, res) => {

	let { username, password, firstName = '', lastName = '' } = req.body;

	firstName = firstName.trim();
	lastName = lastName.trim();
  console.log(`user ${username} PW ${password} name ${firstName} ${lastName}`);
	User.hashPassword(password)
    .then(hash => {
      return User.create({
        firstName,
        lastName,
        username,
        password: hash
      });
    })
    .then(user => {
      return res.status(201).json(user);
    })
    .catch(err => {
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: `Internal server error: ${username} ${password}`});
    });
});

module.exports = router;