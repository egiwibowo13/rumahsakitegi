var mong = require('mongoose');

let login = mong.Schema({
    UserName : String,
    Password : String
},{
    collection : 'Login'
    });

    let Login = module.exports=mong.model('Login',login);