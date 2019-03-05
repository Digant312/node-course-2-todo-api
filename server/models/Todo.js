var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    require: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = { Todo };

// var newTodo = new Todo({
//   text: 'Testing the code'
// });

// newTodo.save().then((doc) => {
//   console.log('Save todo', doc)
// }, (e) => {
//   console.log('Unable to save todo.')
// });