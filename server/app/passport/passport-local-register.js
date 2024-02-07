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


passport.use('local.register' , new localStrategy({
    usernameField : 'email',
    passwordField : 'password' ,
    passReqToCallback : true ,
    passResToCallback : true ,
} , (req ,  email , password , done)=>{
    User.findOne({'email' : email}).then((err , user )=>{
        if(err){
            return done(err);
        }

        if(user){
            return done(null , false , {message : 'چنین کاربری با این ایمیل قبلا ثبت نام کرده است'});
        }

        const newUser = new User({
            username : req.body.username,
            email
        })



        newUser.$set('password' , newUser.hashPassword(password))
        
        newUser.save().then(user => {


            done(null , user)
        }).catch(err => {
            if(err){done(err , false , req.flash('validationMessage' , 'ثبت نام با موفقیت انجام نشد لطفا دوباره تلاش کنید') )}
        })


    })



}))


