var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

/* GET users listing. */
router.get('/', function(req, res, next) {
  mongoose.model('homeusers').find((err,users)=>{
    res.send(users);
  })
});

/* GET specific user. */
router.get('/:userid', function(req, res, next) {
  mongoose.model('homeusers').find({ _id: new ObjectId(req.params.userid)},(err,users)=>{
    res.send(users);
  })
});

module.exports = router;