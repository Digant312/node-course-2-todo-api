const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos: ', JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch record.', err);
    });

    db.close();
});