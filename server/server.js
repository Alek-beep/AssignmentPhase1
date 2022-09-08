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
            email: 'alek.karoli@gmail.com',
            ID: 1,
            Role: "User",
        },
        {
            username: 'Riley',
            email: 'riley.woltmann@gmail.com',
            ID: 2,
            Role: "Super Admin",
        },
        {
            username: 'Ally',
            email: 'ally.ellis@gmail.com',
            ID: 3,
            Role: "Group Admin",   
        }
    ]
    var checkUser = {};
    //console.log(req.body);
    checkUser.email = req.body.email;
    checkUser.username = req.body.username;
    
    let foundUser = Users.find(user => user.username === checkUser.username && user.email == checkUser.email);
    //console.log(foundUser);
    if(foundUser){
        console.log("Success");
        //console.log(foundUser);
        res.send({"valid": true});
    }else{
        console.log("Incorrect Details");
        res.send({"valid": false});
    }
    
   
});


