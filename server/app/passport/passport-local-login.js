const passport = require('passport');
const passportLocal = require('passport-local');
const localStrategy = passportLocal.Strategy
const User = require('app/models/user')
const Permission = require('app/models/permission');
const Role = require('app/models/role');

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

        // && !(['manager'].some(role => {
        //     // console.log(userRolesName.includes(role) )
        //     return  user.roles.includes(role) 
        // } ))
        
        if(user.email === process.env.MANAGER_EMAIL  ){

            console.log('manager')

            const newPermission = new Permission({
                user : user._id,
                name : 'allAccess' ,
                label : 'all-access'
            })
    
            await newPermission.save();

            const newRole = new Role({
                user : user._id,
                name : 'manager' ,
                label : 'manager' ,
                permissions : [newPermission._id]
            })
    
            await newRole.save();

            const res = await User.updateOne({'email' : email} , {admin : true , roles  : [newRole._id] })
            

            // user.admin = true
            // console.log(res)
        }

        
        done(null , user)
    }
    catch(err) {
        return done(err);
    }
}))