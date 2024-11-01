const middleware = require('./middleware');
const User = require('app/models/user');
const passport = require('passport')

class apiAuth extends  middleware {
    handle(req , res , next) {
        passport.authenticate('jwt' , {failureRedirect : `${process.env.WEBSITE_FRONT_URL}` } , (err , user , info)=> {
            if(err || ! user){
                return res.json({
                    messages : info.message || '403 شما اجازه دسترسی ندارید' ,
                    success : false,
                })    
            }

            req.user = user;
            next();
        })(req , res , next)
    }

}

module.exports = new apiAuth();