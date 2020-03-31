var express = require('express');
var router = express.Router();
var { ensureAuthenticated } = require('../config/auth');
var needle = require('needle');

/* GET home page. */
router.get('/', ensureAuthenticated ,function(req, res, next) {
  res.render('main', { 
    name: req.user.name,
    reqUrl: req.originalUrl
  });
});

router.get('/:requesturl', ensureAuthenticated ,function(req, res, next) {

  needle.get('http://localhost/gitstuff/phptest/'+req.params.requesturl, function(error, response) {
    if (!error && response.statusCode == 200)
    {
      console.log(response.body);
    }
    else
    {
      console.log("nope");
    }
      
  });

  res.render('main', { 
    name: req.user.name,
    reqUrl: req.params.requesturl
  });

  

});

module.exports = router;
