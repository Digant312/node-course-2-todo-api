const { createUser, getMyDeatils, getUser, updateUser, deleteUser, loginUser, logoutUser, logoutAllUsers, uploadAvatar, deleteAvatar, getAvatar } = require('./user');
const auth = require('../../middlewares/auth');
const multer = require('multer');

const upload_avatar = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error('Please upload a valid image file!'))
    }
    cb(undefined, true);
  }
});

module.exports = function (app) {
  //Users Routes
  app.post('/user', createUser);
  app.get('/user/me', auth, getMyDeatils);
  app.get('/user', getUser);
  app.patch('/user/me', auth, updateUser);
  app.delete('/user/me', auth, deleteUser);
  app.post('/user/login', loginUser);
  app.post('/user/logout', auth, logoutUser);
  app.post('/user/logoutall', auth, logoutAllUsers);
  app.post('/users/me/avatar', auth, upload_avatar.single('avatar'), uploadAvatar,
    (error, req, res, next) => {
      res.status(400).send({ error: error.message });
    });
  app.delete('/users/me/avatar', auth, deleteAvatar);
  app.get('/users/:id/avatar', getAvatar);
};