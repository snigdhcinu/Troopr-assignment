const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({ dest: 'upload/' });

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');

mongoose.connect('mongodb://localhost:27017/trooprDB',{useNewUrlParser:true,useUnifiedTopology:true});

const trooprSchema=new mongoose.Schema({
	username:String,
	email:String,
	phno:Number,
	address:String,
	img: 
    { 
        data: Buffer, 
        contentType: String 
    } 

})

const Troopr=mongoose.model('Troopr',trooprSchema);

app.route('/')
	.get((req,res) =>{
		res.render('signup')
	})
	.post(upload.single('avatar'),(req,res) =>{
		let username = req.body.username;
		let email = req.body.email;
		let phno = req.body.phno;
		let address = req.body.address;
	
		console.log(req.file)
		const newbie = new Troopr({
			username:username,
			email:email,
			phno:phno,
			address:address,
			img:{
				data:req.file.path,
				contentType:req.file.mimetype
			}
		})
		newbie.save();
		res.send('success')
	})

app.route('/view')
	.get((req,res) =>{
		Troopr.find({email:'snigdhshourya@opentabs.org'},(err,joe) =>{
			if(err){
				console.log(err)
			}
			else{
				if(joe != undefined){
					res.render('profile',{result:joe})
				}
				else{
					console.log('nothing to show')
				}
			}
		})
		
		
	})


app.route('/panel')
	.get((req,res) =>{
		Troopr.find((err,joe) =>{
			if(err){
				console.log(err)
			}
			res.render('panel',{result:joe,type:'view-table'})
		})
	})

app.route('/panel/create')
	.get((req,res)=>{
		// res.render('panel',{type:'create'})
	})
	.post((req,res) =>{
		const recruit = new Troopr({
			username:req.body.username,
			email:req.body.email,
			phno:req.body.phno,
			address:req.body.address,
			img:{
				data:req.file.path,
				contentType:req.file.mimetype
			}
		})
		recruit.save();
		res.redirect('/panel')
	})


let userUpdateId;
app.route('/panel/update')
	.get((req,res) =>{
		// Troopr.findById(userId,(err, recruit) => {
		// 	// console.log(recruit);
		// 	// res.redirect('/panel')
		// 	res.render('panel',{result:recruit,type:'update'})
		// });
	})
	.post((req,res) =>{
		console.log('--------------------')
		userUpdateId = req.body.id;
		// console.log(userId)
		res.redirect('/panel/update')
	})

app.route('/panel/delete')

	.post((req,res) =>{
		let userId = req.body.id;
		Troopr.deleteOne({id:userId},(err) =>{
			if(err){
				console.log(err);
			}
			else{
				console.log('Deletion successful')
				res.redirect('/panel')
			}
			
		})


	})


app.listen(8000,() =>{
	console.log('server online on port 8000')
})
