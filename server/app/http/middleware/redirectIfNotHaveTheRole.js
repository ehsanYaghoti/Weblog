const middleware = require('./middleware');
const User = require('app/models/user');

// class RedirectIfNotAdmin extends  middleware {
    const checkUserRole = (requiredRoles) => async (req, res, next) => {
       
            // if (req.user && requiredRoles.includes(req.user.role) ) {
            //     return next();
            // } else {
            //     return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
            // }

        
            let user = await User.findById(req.user._id).populate('roles')
            if(req.isAuthenticated() && req.user.admin && user.roles.length !== 0){
                // requiredRoles.includes(req.user.role)
                let userRolesName = []
                await user.roles.forEach(role => { 
                    return userRolesName.push(role.name) 
                })

                if( requiredRoles.some(role => {
                        // console.log(userRolesName.includes(role) )
                        return  userRolesName.includes(role) 
                    } ) ){

                    return next();

                } else {
                    return res.status(403).json({ 
                        message: 'Access denied. Insufficient permissions.' ,
                        success : false
                    });
                }

            } else if(user.roles.length === 0){
                return res.status(403).json({ 
                    message: 'Access denied. Insufficient permissions.' ,
                    success : false
                });
            } else {
                return res.redirect('/')
            }
    }

    // }
// }

// module.exports = new RedirectIfNotAdmin;
module.exports = checkUserRole;
