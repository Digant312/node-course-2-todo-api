var mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  }
  // completedAt: {
  //   type: Number,
  //   default: null
  // }
}, {
	timestamps: true
});

var Task = mongoose.model('Task', taskSchema);

module.exports = { Task };
