const middleware = require('./middleware');
const User = require('app/models/user');
const passport = require('passport')
const JWT = require('jsonwebtoken');
const config = require('../../../config');

class apiAuth extends  middleware {
    handle(req , res , next) {
        try {
            const token = req.signedCookies.api_token
            // console.log(req.user)
            // console.log(req)
            // console.log(token)
            JWT.verify(token , config.jsonwebtoken.secret_key , async (err , decode)=> {
                if(err){
                    console.log(err)
                    return res.json({
                        messages : 'توکن ارسالی معتبر نیست',
                        success : false
                    })
                }

                User.findById(decode.id)
                .then(user => {
                    if(user){
                        user.apitoken = token
                        // req.user = user
                        // console.log(req.user)
                        next();
                        return ;
                    } else {
                        return res.json({
                            messages : 'چنین کاربری وجود ندارد',
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