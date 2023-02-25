const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authVerify = (req,res,next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token,'raidev secret',(err,decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.redirect('/login');
    }
}

// check user

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'raidev secret', async (err, decodedToken) => {

        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          console.log(res.locals);
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };
  

module.exports = { authVerify , checkUser};