var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

var Users = require('../models/users'); //even if we aalready attach it

/* GET users listing. 
router.get('/', function(req, res, next) {
  mongoose.model('homeusers').find((err,users)=>{
    res.send(users);
  })
});

 //GET specific user. 
router.get('/:userid', function(req, res, next) {
  mongoose.model('homeusers').find({ _id: new ObjectId(req.params.userid)},(err,users)=>{
    res.send(users);
  })
});
*/


/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

/* Register */
router.post('/register', (req,res)=>{

  var { usrname, usremail, usrpwd1, usrpwd2 } = req.body;
  var errors = [];

  if( !usrname || !usremail || !usrpwd1 || !usrpwd2 )
  {
    errors.push({msg: 'Please fill in all fields.'});
  }

  if(usrpwd1 !== usrpwd2){
    errors.push({msg: 'Passwords do not match.'});
  }

  if(usrpwd1.length < 6 || usrpwd2.length < 6){
    errors.push({msg:'Password should be atleast 6 characters.'});
  }

  if(errors.length > 0){

    console.log(req.body);

    res.render('register', {
      errors,
      usrname,
      usremail,
      usrpwd1,
      usrpwd2
    });
  }
  else{
    Users.findOne({email: usremail})
      .then(users => {
        if(users){
          errors.push({msg:'Email is already taken.'})
          res.render('register', {
            errors,
            usrname,
            usremail,
            usrpwd1,
            usrpwd2
          });
        }
        else
        {
          var newUser = new Users({
            name: usrname,
            email: usremail,
            password: usrpwd2
          });

          //console.log(newUser);
          //res.send('created');

          bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
              if(err) throw err;

              newUser.password = hash;
              newUser.save()
                .then(user=>{
                  req.flash('success_msg','Account successfully registered');
                  res.redirect('/');
                })
                .catch(err=> console.log(err));

            });
          });
        }
      });
  }
});

router.post('/login', (req, res, next)=>{
  passport.authenticate('local', {
    successRedirect: '/main',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res, next)=>{
  req.logout();
  req.flash('success_msg', 'Logout successful.');
  res.redirect('/');
});



module.exports = router;