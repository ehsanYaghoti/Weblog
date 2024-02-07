const passport = require('passport');
const User = require('app/models/user');
const passportJWT = require('passport-jwt');
const config = require('../../config');

const ExtractJWT = passportJWT.ExtractJwt;
const JWTstrategy = passportJWT.Strategy;

passport.use('jwt', new JWTstrategy({
    jwtFromRequest : ExtractJWT.fromExtractors([
        ExtractJWT.fromUrlQueryParameter('api_token')
    ]),
    secretOrKey : config.jsonwebtoken.secret_key
}, async (jwtPayload , done)=>{
    try {
        let user = await User.findById(jwtPayload.id)
        if(user){done(null , user)}
        else {done(null , false , {message : 'شما اجازه دسترسی به این لینک را ندارید'})}
    } catch (err) {
        done(null , false , {message : err.message})
    }
}))