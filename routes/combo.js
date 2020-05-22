var express = require('express');
var router = express.Router();
const {create_combo} = require('./../controller/combo');

// define the home page route
router.get('/', async function(req, res) {
  await create_combo(req, res);
  
});

module.exports = router;