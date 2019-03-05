var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect('mongodb://Digant:digant123@ds163667.mlab.com:63667/nodeapp-api-db')

module.exports = { mongoose };