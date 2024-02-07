const middleware = require('./middleware');
const User = require('app/models/user');
const JWT = require('jsonwebtoken');
const config = require('../../../config');

class apiAuth extends  middleware {
    handle(req , res , next) {
        try {
            const token = req.signedCookies.api_admin_token
            // console.log(req.user)
            // console.log(req)
            // console.log(token)
            JWT.verify(token , config.jsonwebtoken.secret_key , async (err , decode)=> {
                if(err){
                    console.log(err)
                    req.flash('token_error' , 'توکن ارسالی معتبر نیست')
                    return res.redirect('/')
                    return res.json({
                        messages : 'توکن ارسالی معتبر نیست',
                        success : false
                    })
                }

                User.findById(decode.id).populate('roles')
                .then(user => {
                    if(user){
                        user.admintoken = token
                        req.user = user
                        // console.log(req.user)
                        next();
                        return ;
                    } else {
                        console.log('not such a user as admin')
                        return res.redirect('/')
                        return res.json({
                            messages : 'The User is not Admin',
                            kind : 'notAdmin',
                            success : false
                        })
                    }
                })
                .catch(err => {
                    if(err){throw err}
                })
                
            })
        } catch(err) {
            console.log(err)
            throw err;
        }
    }

}

module.exports = new apiAuth();