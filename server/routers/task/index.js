const {createTask, readTask, getTasks, updateTask, deleteTask} = require('./task');

const auth = require('../../middlewares/auth');

module.exports = function(app) {
    //Task Routes
    app.post('/task', auth, createTask);
    app.get('/task', auth, readTask);
    app.get('/tasks', auth, getTasks);
    app.patch('/task', auth, updateTask);
    app.delete('/task', auth, deleteTask);
};