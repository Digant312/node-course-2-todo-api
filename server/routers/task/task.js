var { Task } = require('../../models/Task');

async function createTask(req, res) {
  var task = new Task({
    ...req.body,
    owner: req.user._id
  });

  task.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send({ error: e });
  });
}

async function readTask(req, res) {
  var _id = req.body.id;
  if (!_id) {
    return res.status(400).send({ error: 'id require for get task.' });
  }
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send()
  }
}

// /tasks?completed=true
// /tasks?limit=2&skip=2
// /tasks?sortBy=createdAt:desc
async function getTasks(req, res) {
  const match = {};
  if(req.query.completed){
    match.completed = req.query.completed === 'true';
  }
  const sort = {};
  if(req.query.sortBy){
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'asc' ? 1 : -1; 
  }
  
  try {
    // const tasks = await Task.find({ owner: _id });
    // if (!tasks) {
    //   return res.status(404).send();
    // }
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit : parseInt(req.query.limit),
        skip : parseInt(req.query.skip),
        sort
      }
    }).execPopulate();
    const result = { tasks: req.user.tasks }
    res.send(result);
  } catch (e) {
    res.status(500).send()
  }
}

async function updateTask(req, res) {
  var updates = Object.keys(req.body.task);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  var _id = req.body.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach(update => task[update] = req.body.task[update])
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
}

async function deleteTask (req, res) {
  const _id = req.body.id;
  if (!_id) {
    return res.status(400).send({ error: 'id require for deleting task.' });
  }
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if(!task){
      return res.status(404).send();
    }
    await task.remove();
    res.send(task);
  } catch(e) {
    res.status(500).send();
  }
}


module.exports = { createTask, readTask, getTasks, updateTask, deleteTask };
