var express = require('express');
var app = express();

// cross origin resource sharing
var cors = require('cors');
app.use(cors());

// body parser 
app.use(express.urlencoded({extended:true}));
app.use(express.json());


// point static path to dist to serve angular webpage
app.use(express.static(__dirname + "/../dist/week4tut"));
console.log(__dirname);

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
    let Users = [
        {
            username: 'Alek',
            birthdate: '02-09-1999',
            age: 23,
            email: 'alek.karoli@gmail.com',
            password: 'password1',
            valid: true
        },
        {
            username: 'Riley',
            birthdate: '04-03-1999',
            age: 23,
            email: 'riley.woltmann@gmail.com',
            password: 'password2',
            valid: true
        },
        {
            username: 'Ally',
            birthdate: '05-02-1998',
            age: 23,
            email: 'ally.ellis@gmail.com',
            password: 'password3',
            valid: true
        }
    ]
    var checkUser = {};
    checkUser.email = req.body.email;
    checkUser.password = req.body.password;
    
    let foundUser = Users.find(user => user.email === checkUser.email && user.password == checkUser.password);
    console.log(foundUser);
    if(foundUser){
        console.log("Success");
        console.log(foundUser);
        res.send({"valid": true});
    }else{
        console.log("Incorrect Details");
        res.send({"valid": false});
    }
    
   
});


