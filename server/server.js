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

var fs = require('fs');

// point static path to dist to serve angular webpage
app.use(express.static(__dirname + "/../dist/week4tut"));


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

    app.get('/api/getlistGroups', function(req, res){
        const collection = db.collection('groups');
        collection.find({}).toArray((err, data)=>{
            console.log(data);
            res.send(data);
        })
    })
    
    app.post('/api/auth', function(req, res){
        console.log("postlogin here");
        console.log(req.body.email);
        if (!req.body){
            return res.sendStatus(400);
        }
        const collection = db.collection('users');
        
        collection.find({email:req.body.email}).toArray((err, data)=>{
            console.log(data);
            res.send(data[0]);
        })
         
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
                    res.send({num:0,err:"null",valid:true});
                })
            } else {
                res.send({num:0, err:"duplicate item", valid:false});
            }
        });
       
    });
    
    app.post('/api/remove_user', function(req, res){
        complete = false;
        console.log("removing user...");
        if (!req.body){
            return res.sendStatus(400);
        }

        userName = req.body.username;
        const collection = db.collection('users');
        collection.find({'username':userName}).count((err, count)=>{
            console.log(count);      
            if(count!=0){
                collection.deleteOne({'username':userName},(err,docs)=>{
                    if (err) throw err;
                    res.send({num:0,err:"null",valid:true});
                })
            } else {
                res.send({num:0, err:"duplicate item", valid:false});
            }
        });
        
    });
    
    app.post('/api/add_group', function(req, res){
        console.log("adding group...");
        if (!req.body){
            return res.sendStatus(400);
        }
        group = req.body
        const collection = db.collection('groups');
        collection.find({'name':group.name}).count((err, count)=>{
            console.log(count);
            //if(user.id == 1) collection.remove();         
            if(count==0){
                collection.insertOne(group, (err, dbres)=>{
                    if (err) throw err;
                    let num = dbres.insertedCount;
                    //send back ti client number of items inserted and no error message
                    res.send({num:0,err:"null",valid:true});
                })
            } else {
                res.send({num:0, err:"duplicate item", valid:false});
            }
        });
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
        console.log("adding user to group...");
        if (!req.body){
            return res.sendStatus(400);
        }
        groupName = req.body.groupName;
        userName = req.body.userName;
        const userCollection = db.collection('users');
        const groupCollection = db.collection('groups');
        userCollection.find({'username':userName}).toArray((err, data)=>{
            user = data;
            groupCollection.find({'groupName':groupName}).toArray((err, data)=>{
                group = data;
                console.log(user);
                console.log(group);
                
            })
        })
       
        
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












