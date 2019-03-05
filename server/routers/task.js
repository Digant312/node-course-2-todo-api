// app.post('/todos', (req, res) => {
//   var todo = new Todo({
//     text: req.body.text
//   });

//   todo.save().then((doc) => {
//     res.send(doc);
//   }, (e) => {
//     res.status(400).send({error: e});
//   });
// });

// app.get('/todo', (req, res) => {
//   var _id = req.body.id;
//   if(!_id) {
//     return res.status(400).send({error: 'id require for get todo.'});
//   }
//   Todo.findById(_id).then(todo => {
//     if(!todo){
//       return res.status(400).send();
//     }
//     res.send(todo);
//   })
//   .catch(e => {
//     res.status(500).send()
//   })
// });