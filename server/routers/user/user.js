var {User} = require('../../models/User');

async function createUser(req, res, next) {
  if(!req.body.email.trim() && !req.body.password) {
    return res.status(400).send({ error: 'Email and password can not be empty.'});
  }
  var checkUser = await User.findOne({ email: req.body.email});
  if(checkUser){
    return res.status(400).send({ error: 'User already exist with given email'});
  }
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  try {
    var user = await user.save();
    const token = await user.generateAuthToken();
    res.send({user, token});
  } catch(e) {
    res.status(400).send({error: e});
  }
}

async function getUser(req, res, next) {
  var _id = req.body.id;
  if(!_id) {
    return res.status(400).send({error: 'id require for get user.'});
  }
  try {
    var user = await User.findById(_id);
    if(!user){
      return res.status(400).send();
    }
    res.send(user);
  } catch(e) {
    res.status(500).send();
  }
}

async function updateUser(req, res, next) {
  var updates = Object.keys(req.body.user);
  const allowedUpdates = ['name', 'email', 'password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if(!isValidOperation){
    return res.status(400).send({ error: 'Invalid updates!'});
  }

  var _id = req.body.id;
  if(!_id) {
    return res.status(400).send({error: 'id require for updating user.'});
  }

  try {
    var user = await User.findById(_id);

    updates.forEach(update => user[update] = req.body.user[update])
    await user.save();
    
    if(!user){
      return res.status(400).send();
    }
    res.send(user);
  } catch(e) {
    res.status(500).send()
  }
}

async function deleteUser(req, res, next) {
  var _id = req.body.id;
  if(!_id) {
    return res.status(400).send({error: 'id require for deleting user.'});
  }
  try {
    var user = await User.findByIdAndRemove(_id);
    if(!user){
      return res.status(400).send({error: 'User not found with given id.'});
    }
    res.send(user);
  } catch (e) {
    res.status(500).send()
  }
}

async function loginUser(req, res, next) {
  try{
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({user, token });
  } catch(e) {
    res.status(400).send();
  }
}

module.exports = { createUser, getUser, updateUser, deleteUser, loginUser };