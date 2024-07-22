const express = require("express");
const app = express();
const LogRoute = require("./routes/index");
const db = require("./modules/index");
const UserSchema = require("./modules/schema");
const bodyParser = require("body-parser");
const passport = require("passport");
const methodOverride = require("method-override");
const initPassport = require("./controller/auth");
const flash = require("express-flash");
const session = require("express-session");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // secure: true if using HTTPS
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
const midelWare=require('./controller/middleware')

app.set("view engine", "ejs");
app.get("/", midelWare.checkAuth,(req, res) => {
  res.render("home");
});


app.use('/',LogRoute)
app.post("/login",midelWare.notCheckAuth, (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

initPassport(
  passport,
  async (email) => {
    const user = await UserSchema.findOne({ email: email });
    return user;
  },
  async (id) => {
    const user = await UserSchema.findById(id);
    return user;
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
