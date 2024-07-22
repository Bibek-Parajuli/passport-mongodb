const passport=require('passport')
function notCheckAuth(req,res,next){
    if(req.isAuthenticated()){
        res.redirect('/')
    }else{
        next();
    }
  }
  function checkAuth(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login')
    }
  }


module.exports={checkAuth,notCheckAuth}