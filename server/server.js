//express
var express = require('express');
var app = express();

// cross origin resource sharing
var cors = require('cors');
app.use(cors());

// body parser 
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// json file
var myJson = require('../src/assets/users.json');
// point static path to dist to serve angular webpage
app.use(express.static(__dirname + "/../dist/week4tut"));
console.log(__dirname);
console.log(myJson.users);
var http = require('http').Server(app);
var server = http.listen(3000, function(){
    console.log("Server listening on port 3000");
});
app.post('/api/auth', function(req, res){
    console.log("postlogin here");
    console.log(req.body.email);
    if (!req.body){
        return res.sendStatus(400);
    }
    Users = JSON.parse(JSON.stringify(myJson.users));
    var checkUser = {};
    console.log(req.body.username);
    checkUser.email = req.body.email;
    checkUser.username = req.body.username;
    
    let foundUser = Users.find(user => user.username === checkUser.username && user.email == checkUser.email);
    //console.log(foundUser);
    if(foundUser){
        console.log("Success");
        res.send({"valid": true, "Role": foundUser.Role});
    }else{
        console.log("Incorrect Details");
        res.send({"valid": false});
    }
    
   
});


