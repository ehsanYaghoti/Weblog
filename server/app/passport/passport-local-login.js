const passport = require('passport');
const passportLocal = require('passport-local');
const localStrategy = passportLocal.Strategy
const User = require('app/models/user')

passport.serializeUser(function(user , done){
    done(null , user.id)
});

passport.deserializeUser( function(id , done){
    User.findById(id).then(user => {
        done(null , user)
    })
    .catch(err => {
        done(err)
    })    
   
});


passport.use('local.login' , new localStrategy({
    usernameField : 'email',
    passwordField : 'password' ,
    passReqToCallback : true ,
} , async (req ,  email , password , done)=>{
    try {

        const user = await  User.findOne({'email' : email})

        if(! user || ! user.comparePassword(password)){
            console.log(user)
            return done(null , false ,  req.flash('validationMessage' , 'اطلاعات وارد شده صحیح نیست، لطفا دوباره تلاش بفرمائید') );
        
        }
        
        done(null , user)
    }
    catch(err) {
        return done(err);
    }
}))