const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(process.env.PWD + '/dist/<app-name>'));
app.get('/*', function (req, res) {
  console.log(process.env.PWD);
  console.log(__dirname);
  res.sendFile(path.join(process.env.PWD + '/dist/<app-name>/index.html'));
});
app.listen(process.env.PORT || 8080);
