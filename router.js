var express = require("express");
var router = express.Router();
var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')
//var alert = require('alert')

const DBSOURCE = "./db/users.dbase";

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
	email: "",
	password: ""
};

//login user
router.post('/login',(req,res)=>{
	let sql = "select email, password from user where email = ?";
	db.get(sql, [req.body.email], (err, result)=>{
		if(result){
			credential.email = result.email;
			credential.password = result.password;
		}
		if(req.body.email == credential.email && md5(req.body.password) == credential.password){
			req.session.user = req.body.email;
			res.redirect('/route/dashboard');
		}
		else{
			//res.redirect('/');
			res.render('index', {errmsg: "No user account found"});
		}
	});
});

router.post('/newuser', (req,res)=>{
	db.get("select email from user where email = '" + req.body.email + "'", [], (err,query)=>{
		if(req.body.password != req.body.repassword){
			res.render('newuser', {errmsg: "Passwords do not match"});
		}
		else if(query){
			console.log("email already taken");
			res.render('newuser', {errmsg: "Email taken"});
		}
		else{ 
			db.run("insert into user (email, password) values (?,?)", [req.body.email, md5(req.body.password)], (err)=>{});
			req.session.user = req.body.email;
			res.redirect('/route/dashboard');
		}
		//console.log("new user test");
	});
});

router.get('/newuser', (req,res)=>{
	res.render('newuser');
});

//route for dashboard
router.get('/dashboard',(req,res)=>{
	if(req.session.user){
		res.render('dashboard',{user: req.session.user});
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
			res.render('./index',{title: "Login app",logout:"logout successful"});
		}
	});
});

module.exports = router;