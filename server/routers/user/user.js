var {User} = require('../../models/User');
const sharp = require('sharp');

const multer = require('multer');
const {sendWelcomeEmail, sendGoodByeEmail} = require('../../emails/account');

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
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.send({user, token});
  } catch(e) {
    res.status(400).send({error: e});
  }
}

async function getMyDeatils(req, res) {
  res.send(req.user);
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
  var updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if(!isValidOperation){
    return res.status(400).send({ error: 'Invalid updates!'});
  }

  // var _id = req.user._id;
  // if(!_id) {
  //   return res.status(400).send({error: 'id require for updating user.'});
  // }

  try {
    // var user = await User.findById(_id);

    updates.forEach(update => req.user[update] = req.body[update])
    await req.user.save();
    
    // if(!req.user){
    //   return res.status(400).send();
    // }
    res.send(req.user);
  } catch(e) {
    res.status(500).send()
  }
}

async function deleteUser(req, res, next) {
  var _id = req.user._id;
  // if(!_id) {
  //   return res.status(400).send({error: 'id require for deleting user.'});
  // }
  try {
    // var user = await User.findByIdAndRemove(_id);
    // if(!user){
    //   return res.status(400).send({error: 'User not found with given id.'});
    // }
    await req.user.remove();
    sendGoodByeEmail(req.user.email, req.user.name);
    res.send(req.user);
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
    res.status(400).send({ error: 'Error in logging. Try again!'});
  }
}

async function logoutUser(req, res, next) {
  try{
    req.user.tokens = req.user.tokens.filter( token => {
      return token.token !== req.token
    })
    
    await req.user.save();

    res.send();
  } catch(e) {
    res.status(500).send();
  }
}

async function logoutAllUsers(req, res, next) {
  try{
    req.user.tokens = [];
    
    await req.user.save();

    res.send();
  } catch(e) {
    res.status(500).send();
  }
}

async function uploadAvatar(req, res) {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()

  req.user.avatar = buffer;  

  try{
    await req.user.save();
    res.send({ status: 'success'});
  } catch(e) {
    res.status(500).send();
  }
}

async function deleteAvatar(req, res) {
  req.user.avatar = undefined;
  try{
    await req.user.save();
    res.send({ status: 'success'});
  } catch(e) {
    res.status(500).send();
  }
}

async function getAvatar(req, res) {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if(!user || !user.avatar) {
      throw new Error();
    }

    res.set('Content-Type', 'image/png')
    res.send(user.avatar);
  } catch(e) {
    res.status(404).send();
  }
}

module.exports = { createUser, getMyDeatils, getUser, updateUser, deleteUser, loginUser, logoutUser, logoutAllUsers, uploadAvatar, deleteAvatar, getAvatar };