let expres = require('express');
let route = expres.Router();
global.config = require('../config/config');
let verifyToken = require('../middleware/verifyToken');
let User = require('./loginModel');
let loginController = require('./loginController.js');

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


route.get('/login',function(req,res){
    loginController.getPasien(function(err,respon){
        if(err){
            throw err;
        }
        res.json(respon);
    });
});
route.get('/login/:_id',function(req,res){
	let id = req.params._id;
    loginController.getPasienById(id,function(err,respon){
        if(err){
            throw err;
        }
        res.json(respon);
    });
});
route.post('/login',function(req,res){
    let ptgs = req.body;
    loginController.createPasien(ptgs,function(err,respon){
        if(err){
            throw err;
        }
        res.json(respon);
    });
});
route.delete('/login/:_id',function(req,res){
    loginController.removePasien(req.params._id,function(err,respon){
        if(err){
            throw err;
        }
        res.json(respon);
    });
});
route.put('/login/:_id',function(req,res){
    let ptgs = req.body;
    loginController.updatePasien(req.params._id,ptgs,function(err,respon){
        if(err){
            throw err;
        }
        res.json(respon);
    });
});

module.exports = route;