const express=require('express');
const methodOverride = require('method-override')

const Register = require('../controller/db-method');
const LogRoute=express.Router();
const midelWare=require('../controller/middleware')

LogRoute.get("/login",midelWare.notCheckAuth, (req, res) => {
    res.render("login", { messages: req.flash() });
  });
  
LogRoute.get('/register',midelWare.notCheckAuth,(req,res)=>{
    res.render('register')
})
LogRoute.delete('/delete', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    res.redirect('/login');
  });
});

LogRoute.post('/register', Register)
    
module.exports=LogRoute;