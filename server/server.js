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
    const db = client.db(dbName);
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
        
        collection.find({username:req.body.username}).toArray((err, data)=>{
            if(data[0].password == req.body.password){
                res.send(data[0]);
            }else{
                res.send(null);
            }
            
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

        groupName = req.body.groupName;
        console.log(groupName);
        const collection = db.collection('groups');
        //collection.deleteMany({});
        //res.send({num:0,err:"null",valid:true});
        collection.find({'name':groupName}).count((err, count)=>{
            console.log(count);      
            if(count!=0){
                collection.deleteOne({'name':groupName},(err,docs)=>{
                    if (err) throw err;
                    res.send({num:0,err:"null",valid:true});
                })
            } else {
                res.send({num:0, err:"duplicate item", valid:false});
            }
        });
    });
    
    app.post('/api/remove_user_from_group', function(req, res){
        console.log("removing user from group...");
        if (!req.body){
            return res.sendStatus(400);
        }
        groupName = req.body.groupName;
        userName = req.body.userName;
        const userCollection = db.collection('users');
        const groupCollection = db.collection('groups');
        userCollection.find({'username':userName}).toArray((err, data)=>{
            user = data;
            groupCollection.find({'name':groupName}).toArray((err, data)=>{
                group = data;
                usersList = group[0].users;
                for (let i = 0; i < usersList.length; i++) {
                    if(usersList[i][0].username == userName){
                        console.log("renmoving: ");
                        console.log(usersList[i][0].username);
                        usersList.splice(i, 1);
                    }
                  }
                console.log(usersList);
                groupCollection.update({'name':groupName},{$set:{'users':usersList}});
                console.log(groupName);
                console.log("users:");
            })
        })
    });
    
    app.post('/api/remove_channel_from_group', function(req, res){
        console.log("removing channel from group...");
        if (!req.body){
            return res.sendStatus(400);
        }
        groupName = req.body.groupName;
        channel = req.body.channel;
        channelObject = req.body.channelObject;
        const groupCollection = db.collection('groups');
        groupCollection.find({'name':groupName}).toArray((err, data)=>{
            group = data;
            channelsList = group[0].channels;
            for (let i = 0; i < channelsList.length; i++) {
                if(channelsList[i].channelName == channel){
                    console.log("removing: ");
                    console.log(channelsList[i].channelName);
                    channelsList.splice(i, 1);
                }
              }
            console.log(channelsList);
            groupCollection.update({'name':groupName},{$set:{'channels':channelsList}});
            console.log(groupName);
            console.log("channels:");
            groupCollection.find({'name':groupName}).toArray((err, data)=>{
                updatedChannels = data[0].channels;
                console.log(updatedChannels);
            })
            
        })
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
            groupCollection.find({'name':groupName}).toArray((err, data)=>{
                group = data;
                usersList = group[0].users;
                usersList.push(user);
                console.log(usersList);
                groupCollection.update({'name':groupName},{$set:{'users':usersList}});
                console.log(groupName);
                console.log("users:");
                groupCollection.find({'name':groupName}).toArray((err, data)=>{
                    updatedUsers = data[0].users;
                    console.log(updatedUsers);
                })
            })
        })
       
        
    });
    
    app.post('/api/add_channel_to_group', function(req, res){
        console.log("adding channel to group...");
        if (!req.body){
            return res.sendStatus(400);
        }
        groupName = req.body.groupName;
        channel = req.body.channel;
        channelObject = req.body.channelObject;
        console.log(groupName);
        
        
        const groupCollection = db.collection('groups');
    
        groupCollection.find({'name':groupName}).toArray((err, data)=>{
            completed = false;
            group = data;
            channelsList = group[0].channels;
            channelsList.push(channelObject);
            console.log(channelsList);
            
            groupCollection.update({'name':groupName},{$set:{'channels':channelsList}});
                console.log(groupName);
                console.log("channels:");
            groupCollection.find({'name':groupName}).toArray((err, data)=>{
                updatedChannels = data[0].channels;
                console.log(updatedChannels);
                
                completed = true;
            })
        })
    });

    const http = require('http').Server(app);
    var server = http.listen(3000, function(){
        console.log("Server listening on port 3000");
    });

})












