const middleware = require('./middleware');
const User = require('app/models/user');

class RedirectIfNotAdmin extends  middleware {
    handle(req , res , next) {
        if(req.isAuthenticated() && req.user.admin){
            return next();                             
        }
            
        return res.redirect('/')
    }

}

module.exports = new RedirectIfNotAdmin;