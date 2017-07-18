var express = require('express');
var elastic = require('../elasticsearch');

var router = express.Router();

/* GET suggestions */
router.get('/suggest/:input', function (req, res, next) {
  console.log("Thing Explainer");
  elastic.getSuggestions(req.params.input).then(function (result) { res.json(result) });
});

/* POST */
router.post('/', function (req, res, next) {
  elastic.addDocument(req.body).then(function (result) { res.json(result) });
});

module.exports = router;
