exports.insert = function(req, res) {
    MongoClient.connect(url, { useNewURLParser: true }, function(err, client){
        if (err) throw err;
        let db = client.db("dbName");
        let doc = req.body;
    // use insertOne method with callback
        db.collection("colName").insertOne(doc, function(err, result) {
            console.log("Inserted the following document into the collection: ");
            console.log(doc);
            res.send(doc);
            client.close();
        });
    });
};

exports.find = function(req, res) {
    MongoClient.connect(url, { useNewParser: true }, function(err, client) {
        if (err) throw err;
        let db = client.db("dbName");
    //use the method as promise
        db.collection("colName").find({}).toArray().then(function(docs){
            console.log("Found the following records");
            console.log(docs);
            res.send(docs);
        }).catch((err) => {console.log(err);}).finally(() => { client.close();});
    });
};

exports.update = function(req, res) {
    MongoClient.connect(url, function(err, client){
        let db = client.db("dbName");
        db.collection("colName", function(err, collection) {
            let queryJSON = req.params;
            let updateJSON = req.body;
            // Update document with queryJSON, set updateJSON
            collection.updateMany(queryJSON, { $set: updateJSON }, function(err, result) {
                console.log("for the documents with", queryJSON);
                console.log("SET: ", updateJSON);
                res.send(result);
                client.close();
            });
        });
    });
};

exports.delete = function(req, res) {
    MongoClient.connect(url, function(err, client) {
        let db = client.db("dbName");
        db.collection("colName", function(err, collection) {
            let queryJSON = req.body;
            collection.deleteMany(queryJSON, function(err, result) {
                console.log("Removed the documents withL ", queryJSON);
                res.send(queryJSON);
                client.close();
            });
        });
    });
};