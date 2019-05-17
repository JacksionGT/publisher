var express = require('express');
var router = express.Router();
const { getFileInfo, getFileList, getIISInfo } = require('../utile/u');

/* GET users listing. */
router.get('/', function(req, res, next) {
  getIISInfo().then((result)=>{
    console.log(result);
    res.render('sites', { title: 'Express',sitelist:result });
  },(err)=>{
    res.render('sites', { title: 'Express',err:err });
  })
  
});
router.get('/allsites', async function(req, res, next) {
  res.set('Content-Type', 'application/json');
  getIISInfo().then((result)=>{
    res.send(result);
  },(err)=>{
    res.send({"error":err});
  })
  
});


module.exports = router;
