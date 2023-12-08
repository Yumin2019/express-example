const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../schemas/User");
const { comparePassword } = require("../utils/helpers");

passport.serializeUser((user, done) => {
  console.log("Serializing User...");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserializing User");
  console.log(id);

  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    console.log(user);
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error, null);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      console.log(email);
      console.log(password);

      try {
        if (!email || !password) throw new Error("Missing Credentials");
        const userDB = await User.findOne({ email });
        if (!userDB) throw new Error("User not found");
        const isValid = comparePassword(password, userDB.password);
        if (isValid) {
          console.log("Authenicated Successfully!");
          done(null, userDB);
        } else {
          console.log("Invalid Authentication");
          done(null, null);
        }
      } catch (error) {
        console.log(error);
        done(error, null);
      }
    }
  )
);
