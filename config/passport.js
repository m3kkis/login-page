var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

var Users = require('../models/users');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'usremail', passwordField: 'usrpwd'}, (usremail, usrpwd, done)=>{

            Users.findOne({email : usremail})
                .then( users => {
                    if(!users){
                        return done(null, false, {message: 'That email is not registered'});
                    }

                    bcrypt.compare(usrpwd, users.password, (err, isMatch)=>{
                        if(err) throw err;
                        if(isMatch){
                            return done(null, users);
                        }
                        else
                        {
                            return done(null, false, {message: 'Password incorrect.'});
                        }
                    });
                })
                .catch( err=> console.log(err));
        })
    );

    passport.serializeUser((users, done) => {
        done(null, users.id);
    });
      
    passport.deserializeUser( (id, done) => {
        Users.findById(id, function(err, users) {
            done(err, users);
        });
    });

}