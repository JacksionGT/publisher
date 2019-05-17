var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Express',msg:"asdasd" });
});
router.get('/u1', function(req, res, next) {
  res.set('Content-Type', 'application/json');
  res.send({a:6,b:7});
});

module.exports = router;
