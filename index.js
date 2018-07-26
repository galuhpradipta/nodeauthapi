const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', function(req,res){
	res.json({
		message: "Welcome"
	});
});

app.post('/api/posts', verifyToken, function(req,res){
	jwt.verify(req.token, 'rahasia', function(err, authData){
		if (err){
			res.sendStatus(403);
		} else  {
			res.json({
				message: "Post created ...",
				authData
			});		
		}
	});
});

app.post('/api/login', function(req,res){
	// Mock user
	const user = {
		id: 1,
		username: "Galuh",
		email: 'galuhpradipta95@gmail.com'
	}
	
	jwt.sign({user: user}, 'rahasia', function(err, token){
		res.json({
			token: token
		});
	});
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

function verifyToken(req, res, next){
	// Get auth header value
	const bearerHeader = req.headers['authorization'];
	// Check if token is undefined
	if(typeof bearerHeader !== 'undefined'){
		// Split by space
		const bearer = bearerHeader.split(' ');
		// Get token from second index of array
		const bearerToken = bearer[1];
		// set token
		req.token = bearerToken;
		// Next middleware
		next();	
	} else {
		// Forbidden
		res.sendStatus(403);
	}
}

app.listen(5000, function(){
	console.log("Server is running");
});
