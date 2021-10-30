const strategy = require("passport-local").Strategy;
const pool = require("./database");
const bycrypt = require("bcrypt");
const QueryConstant = require("./queryConstants");

function initialize(passport,getUserByEmail) {
    const authenticateUser = async(email,password,done) => {
        const user = getUserByEmail(email);
        if(user == null)
        {
            return done(null,false,{message:"Email is not registered"});
        }
        try {
            if(await bycrypt.compare(password,user.password))
            {
                return done(null,true);
            }
            else
            {
                return done(null,false,{message:"incorrect password"});
            }
        } catch (error) {
            return done(error);
        }
    }
    passport.use(new strategy({usernameField:"email"}), authenticateUser);
    passport.serilizeUser((user,done) => {});
    passport.deserilizeUser((id,done) => {});
}

module.exports = initialize;