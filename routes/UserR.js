const express = require('express');
const {
    check,
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
let userList = require("../models/UserM");
const router = express.Router();
router.post('/addUser',[
    check('password','password is required').not().isEmpty(),
    check('name','Minimum 1 caracter is needed')
])