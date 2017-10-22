let expres = require('express');
let route = expres.Router();
global.config = require('../config/config');
let verifyToken = require('../middleware/verifyToken');
let User = require('./loginModel');

let jwt    = require('jsonwebtoken');
let jwt_secret = "shhh";

route.post('/login/authenticate', function(req, res){
    let data = {
        UserName: req.body.UserName,
        Password: req.body.Password
    };
    User.findOne(data).lean().exec(function(err, user){
        if(err){
            return res.json({error: true});
        }
        if(!user){
            return res.status(404).json({'message':'User not found!'});
        }
        console.log(user);
        let token = jwt.sign(user, global.config.jwt_secret, {
            expiresIn: 1440 // expires in 1 hour
        });
        res.json({error:false, token: token});
    })
});

module.exports = route;