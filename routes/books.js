var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({books: [{title: 'Lord of the Rings: Fellowship of the Ring'}]});
});

module.exports = router;
