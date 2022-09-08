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
var myGroups = require('../src/assets/groups.json');
console.log(myGroups);

var fs = require('fs');

// point static path to dist to serve angular webpage
app.use(express.static(__dirname + "/../dist/week4tut"));
console.log(__dirname);
console.log(myJson);
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

    Users = JSON.parse(JSON.stringify(myJson));

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

app.post('/api/add', function(req, res){
    console.log("adding user...");
    if (!req.body){
        return res.sendStatus(400);
    }
    Users = JSON.parse(JSON.stringify(myJson));

    var checkUser = {};
    checkUser.username = req.body.username;
    
    let foundUser = Users.find(user => user.username === checkUser.username);
    if(foundUser){
        console.log("User Found, cannot add");
        res.send({"valid": false});
    }else{
        var element = {};
        element.username = req.body.username;
        element.email = req.body.email;
        element.Id = 4;
        element.Role = "User";
        Users.push(element);


       
        toWrite = JSON.stringify(Users);
        console.log(toWrite);
        fs.writeFile("../src/assets/users.json", toWrite, function(err) {
            if (err){
                console.log(err);
            }
        });
        res.send({"valid": true});
    }
});

app.post('/api/remove_user', function(req, res){
    console.log("removing user...");
    if (!req.body){
        return res.sendStatus(400);
    }
    Users = JSON.parse(JSON.stringify(myJson));
    for(var i=0; i<Users.length;i++){
        if(Users[i].username==req.body.username){
            Users.splice(i, 1);
            console.log(Users);
            res.send({"valid": true});
        }
    }
    console.log("User Not Found, cannot remove");
    res.send({"valid": false});
    
});

app.post('/api/add_group', function(req, res){
    console.log("adding group...");
    if (!req.body){
        return res.sendStatus(400);
    }
    Groups = JSON.parse(JSON.stringify(myGroups));
    var element = {
        name:req.body.groupName,
        users:[],
        channels:[{channelName: "", users:[]}]
    }
    Groups.push(element);
    toWrite = JSON.stringify(Groups);
    console.log(Groups);
    fs.writeFile("../src/assets/groups.json", toWrite, function(err) {
        if (err){
            console.log(err);
        }
    });
    res.send({"valid": true});
});

app.post('/api/add_user_to_group', function(req, res){
    console.log("adding user to group...");
    if (!req.body){
        return res.sendStatus(400);
    }
    Groups = JSON.parse(JSON.stringify(myGroups));
    console.log(Groups);
    for(var i=0; i<Groups.length;i++){
        if(Groups[i].name==req.body.groupName){
            Groups[i].users.push(req.body.userName);
            console.log(Groups);
            toWrite = JSON.stringify(Groups);
            fs.writeFile("../src/assets/groups.json", toWrite, function(err) {
                if (err){
                    console.log(err);
                }
            });
            res.send({"valid": true});
        }
    }
    res.send({"valid":false});
});

app.post('/api/add_channel_to_group', function(req, res){
    console.log("adding user to group...");
    if (!req.body){
        return res.sendStatus(400);
    }
    Groups = JSON.parse(JSON.stringify(myGroups));
    console.log(Groups);
    for(var i=0; i<Groups.length;i++){
        if(Groups[i].name==req.body.groupName){
            Groups[i].channels.push({channelName:req.body.channel, users:[]});
            console.log(Groups[i].channels);
            toWrite = JSON.stringify(Groups);
            fs.writeFile("../src/assets/groups.json", toWrite, function(err) {
                if (err){
                    console.log(err);
                }
            });
            res.send({"valid": true});
        }
    }
    res.send({"valid":false});
});



