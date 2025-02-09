const passport = require("passport")
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.model')

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username })
            if(!user) {
                return done(null, false, {message: "Incorrect Username"})
            }
            if(!bcrypt.compare(password, user.password)) {
                return done(null, false, {message: "Incorrect Password"})
            }
            return done(null, user)
        } catch (error) {
            return done(error)
        }

        // User.findOne({ username: username }, function (err, user) {
        //     if (err) { return done(err); }
        //     if (!user) { return done(null, false); }
        //     if (!user.verifyPassword(password)) { return done(null, false); }
        //     return done(null, user);
        // });
    }
));


//create sessin id
//whenever we login it creates use id inside sessin
passport.serializeUser((user, done) => {
    done(null, user.id)
})

//find session info using session id
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        done(error, false)
    }
})