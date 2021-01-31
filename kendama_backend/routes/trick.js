var express = require('express');
var router = express.Router();
var {get_all_tricks, add_trick  } = require('../controller/trick')

//Returns a complete combo
router.get('/', async function(req, res) {
  let all_tricks = await get_all_tricks(req, res);
  res.json(all_tricks);
});

router.post('/', async function(req, res) {
    const response = await add_trick(req,res);
    res.json(response);
})

module.exports = router;