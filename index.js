let bodyParser = require('body-parser');
let mong = require('mongoose');
let ex = require('express');
let app = ex();



global.config = require('./config/config');

let jwt    = require('jsonwebtoken');
let jwt_secret = "shhh";
let verifyToken = require('./middleware/verifyToken');
//route
app.use(bodyParser.json());

//route
app.use(bodyParser.json());
// app.use(function(req,res,next){
// 	res.header("Access-Contol-Allow-Origin","*");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
// });

app.use('/',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    next();
});

let login = require('./login/loginRoute.js');
app.use('/api',login);

let petugasRoute = require('./petugas/petugasRoute.js');
app.use('/api',verifyToken,petugasRoute);

let provinsiRoute = require('./provinsi/provinsiRoute.js');
app.use('/api',verifyToken,provinsiRoute);

let rumahsakitRoute = require('./rumahsakit/rumahsakitRoute.js');
app.use('/api',verifyToken,rumahsakitRoute);

let perawatanRoute = require('./perawatan/perawatanRoute.js');
app.use('/api',verifyToken,perawatanRoute);

let pendaftaranRoute = require('./pendaftaran/pendaftaranRoute.js');
app.use('/api',verifyToken,pendaftaranRoute);

let perawatanDiagnosaRoute = require('./perawatanDiagnosa/perawatanDiagnosaRoute.js');
app.use('/api',verifyToken,perawatanDiagnosaRoute);

let dokterRoute = require('./dokter/dokterRoute.js');
app.use('/api',verifyToken,dokterRoute);

let pembayaranRoute = require('./pembayaran/pembayaranRoute.js');
app.use('/api',verifyToken,pembayaranRoute);

let pembayaranDetailRoute = require('./pembayaranDetail/pembayaranDetailRoute.js');
app.use('/api',verifyToken,pembayaranDetailRoute);

let perawatRoute = require('./perawat/perawatRoute.js');
app.use('/api',verifyToken,perawatRoute);

let diagnosaRoute = require('./diagnosa/diagnosaRoute.js');
app.use('/api',verifyToken,diagnosaRoute);

let diagnosadetailRoute = require('./diagnosadetail/diagnosaDetailRoute.js');
app.use('/api',verifyToken,diagnosadetailRoute);

let jenisObatRoute = require('./jenisObat/jenisObatRoute.js');
app.use('/api',verifyToken,jenisObatRoute);

let kategoriObatRoute = require('./kategoriObat/kategoriObatRoute.js');
app.use('/api',verifyToken,kategoriObatRoute);

let pasienRoute = require('./pasien/pasienRoute.js');
app.use('/api',verifyToken,pasienRoute);

let ruangInapRoute = require('./ruanginap/ruangInapRoute.js');
app.use('/api',verifyToken,ruangInapRoute);

let satuanHargaDokterRoute = require('./satuanHargaDokter/satuanHargaDokterRoute.js');
app.use('/api',verifyToken,satuanHargaDokterRoute);

let userPasienRoute = require('./userPasien/userPasienRoute.js');
app.use('/api',verifyToken,userPasienRoute);

let variasiObatRoute = require('./variasiObat/variasiObatRoute.js');
app.use('/api',verifyToken,variasiObatRoute);




//mong.connect('mongodb://localhost:27017/DBapotek');
mong.connect('mongodb://egi:egi1213@ds121345.mlab.com:21345/dbrumahsakit');
app.listen(process.env.PORT || 8889, function(){
	console.log('node app is running on port', app.get('port'));
});