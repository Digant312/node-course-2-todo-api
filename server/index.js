var express = require('express');
var bodyParser = require('body-parser');

require('./db/mongoose');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
require('./routers')(app);

module.exports = app;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});