const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    // findOneAndUpdate
    db.collection('Users').findOneAndUpdate({ 
        name: 'Drashti'
    }, {
        $set: {
            text: 'coding like a god!'
        },
        $inc: {
            age: 10
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to fetch record.', err);
    });

    db.close();
});