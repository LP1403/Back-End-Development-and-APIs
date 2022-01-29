require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
var URLModel = require("../models/url").URLModel;


exports.shortenURL = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre list');
};
