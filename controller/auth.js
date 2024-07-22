const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

function initPassport(passport, getUserByEmail, getUserById) {
  async function authenticateUser(email, password, done) {
    const user = await getUserByEmail(email);
    if (!user) {
      return done(null, false, { message: "Invalid username not found" });
    }
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Sorry, incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
  }

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
}

module.exports = initPassport;
