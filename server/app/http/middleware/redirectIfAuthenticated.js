const middleware = require('./middleware');
const User = require('app/models/user');

class redirectIfAuthenticated extends  middleware {
    handle(req , res , next) {
        if(req.isAuthenticated()){
            return res.redirect('/')                           
        }
            
        return  next();  
    }

}

module.exports = new redirectIfAuthenticated;