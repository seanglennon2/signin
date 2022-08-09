var express = require("express");
var router = express.Router();
var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "users.dbase";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')       
    }
});

const credential = {
	email: "admin@gmail.com",
	password: "admin123"
};

//login user
router.post('/login',(req,res)=>{
	let sql = "select email from users where email = " + req.body.email;
	db.run(sql, [], (err, result)=>{
		console.log(result);
	});
	if(req.body.email == credential.email && req.body.password == credential.password){
		req.session.user = req.body.email;
		res.redirect('/route/dashboard');
		//res.end("Login successful");
	}
	else{
		res.end("invalid username");
	}
});

router.get('/newuser', (req,res)=>{
	res.render('newuser');
});

//route for dashboard
router.get('/dashboard',(req,res)=>{
	if(req.session.user){
		res.render('dashboard',{user: req.session.user});
		//res.end(req.session.user);
	}
	else{
		res.send("unauthorized user");
	}
});

//logoff route
router.get('/logout',(req,res)=>{
	req.session.destroy(function(err){
		if(err){
			console.log(err);
			res.send("Error");
		}
		else{
			res.render('./base',{title: "Express",logout:"logout successful"});
		}
	});
});

module.exports = router;