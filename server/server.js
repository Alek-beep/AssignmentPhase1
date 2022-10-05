//express
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const url = "mongodb://localhost:27017";

// cross origin resource sharing
var cors = require('cors');
app.use(cors());



// body parser 
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// json file
//var myJson = require('../src/assets/users.json');

//var myGroups = require('../src/assets/groups.json');
//console.log(myGroups);

var fs = require('fs');

// point static path to dist to serve angular webpage
app.use(express.static(__dirname + "/../dist/week4tut"));
//console.log(__dirname);
//console.log(myJson);

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true},function(err, client){
    //Callback function code. When we have a connection start the rest of the app.
    if(err){return console.log(err)}
    const dbName = 'mydb';
    const db = client.db(dbName)
    app.get('/api/getlist', function(req, res){
        const collection = db.collection('users');
        collection.find({}).toArray((err, data)=>{
            console.log(data);
            res.send(data);
        })
    })

    app.post('/api/viewUsers', function(req, res){
        Users = JSON.stringify(myJson);
        res.send(Users);
    });


    app.post('/api/viewGroups', function(req, res){
        Groups = JSON.stringify(myGroups);
        res.send(Groups);
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
        user = req.body
        console.log("user id: ", user.id);
        const collection = db.collection('users');
        collection.find({'id':user.id}).count((err, count)=>{
            console.log(count);
            //if(user.id == 1) collection.remove();         
            if(count==0){
                collection.insertOne(user, (err, dbres)=>{
                    if (err) throw err;
                    let num = dbres.insertedCount;
                    //send back ti client number of items inserted and no error message
                    res.send({num:0,err:"null"});
                })
            } else {
                res.send({num:0, err:"duplicate item"});
            }
        });
        /*
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
        }*/

    });
    
    app.post('/api/remove_user', function(req, res){
        complete = false;
        console.log("removing user...");
        if (!req.body){
            return res.sendStatus(400);
        }
        Users = JSON.parse(JSON.stringify(myJson));
        for(var i=0; i<Users.length;i++){
            if(Users[i].username==req.body.username){
                Users.splice(i, 1);
                toWrite = JSON.stringify(Users);
                console.log(Users);
                fs.writeFile("../src/assets/users.json", toWrite, function(err) {
                if (err){
                    console.log(err);
                }
                });
                complete = true;
                res.send({"valid": true});
            }
        }
        console.log("User Not Found, cannot remove");
        if(!complete){
            res.send({"valid": false});
        }
        
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
    
    app.post('/api/remove_group', function(req, res){
        complete = false;
        console.log("removing group...");
        if (!req.body){
            return res.sendStatus(400);
        }
        Groups = JSON.parse(JSON.stringify(myGroups));
        for(var i=0; i<Groups.length;i++){
            if(Groups[i].name==req.body.groupName){
                Groups.splice(i, 1);
                toWrite = JSON.stringify(Groups);
                console.log(Groups);
                fs.writeFile("../src/assets/groups.json", toWrite, function(err) {
                if (err){
                    console.log(err);
                }
                });
                complete = true;
                res.send({"valid": true});
            }
        }
        if(!complete){
            res.send({"false": true});
        }
    });
    
    app.post('/api/remove_user_from_group', function(req, res){
        complete = false;
        console.log("removing user from group...");
        if (!req.body){
            return res.sendStatus(400);
        }
        Groups = JSON.parse(JSON.stringify(myGroups));
        for(var i=0; i<Groups.length;i++){
            if(Groups[i].name==req.body.groupName){
                for(var j=0; j<Groups[i].users.length;j++){
                    if(Groups[i].users[j]==req.body.userName){
                        Groups[i].users.splice(j,1);
                        toWrite = JSON.stringify(Groups);
                        console.log(Groups);
                        fs.writeFile("../src/assets/groups.json", toWrite, function(err) {
                        if (err){
                        console.log(err);
                        }
                        });
                        complete=true;
                        res.send({"valid":true});
                    }
                }
            }
        }
        if(!complete){
            res.send({"false": true});
        }
    });
    
    app.post('/api/remove_channel_from_group', function(req, res){
        complete = false;
        console.log("removing channel from group...");
        if (!req.body){
            return res.sendStatus(400);
        }
        Groups = JSON.parse(JSON.stringify(myGroups));
        for(var i=0; i<Groups.length;i++){
            if(Groups[i].name==req.body.groupName){
                for(var j=0; j<Groups[i].channels.length;j++){
                        if(Groups[i].channels[j].channelName==req.body.channel){
                            Groups[i].channels.splice(j,1);
                            console.log(Groups[i].channels);
                        }
                        toWrite = JSON.stringify(Groups);
                        console.log(Groups);
                        fs.writeFile("../src/assets/groups.json", toWrite, function(err) {
                        if (err){
                        console.log(err);
                        }
                        });
                        complete=true;
                        res.send({"valid":true});
                }
            }
        }
        if(!complete){
           res.send({"false": true});
        }
    });
    
    app.post('/api/add_user_to_group', function(req, res){
        complete = false;
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
                complete = true;
                res.send({"valid": true});
            }
        }
        if(!complete){
            res.send({"valid":false});
        }
    });
    
    app.post('/api/add_channel_to_group', function(req, res){
        complete = false;
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
                complete=true;
                res.send({"valid": true});
            }
        }
        if(!complete){
         res.send({"valid":false});
        }
        
    });

    const http = require('http').Server(app);
    var server = http.listen(3000, function(){
        console.log("Server listening on port 3000");
    });

})












