const {createUser, getUser, updateUser, deleteUser, loginUser} = require('./user');
const auth = require('../../middlewares/auth');

module.exports = function(app) {
    //Users Routes
    app.post('/user', createUser);
    app.get('/user', auth, getUser);
    app.patch('/user', updateUser);
    app.delete('/user', deleteUser);
    app.post('/user/login', loginUser)
};