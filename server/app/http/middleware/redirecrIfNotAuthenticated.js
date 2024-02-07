const middleware = require('./middleware');

class redirectIfNotAuthenticated extends middleware {
    handle(req , res , next){
        if(req.isAuthenticated())
            return next();

        req.flash('notAllowed' , 'برای دسترسی به این امکان باید نخست وارد سایت شوید.')
        return res.redirect('/auth/login')
    }
}

module.exports = new redirectIfNotAuthenticated;