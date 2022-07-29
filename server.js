const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(process.env.PWD + '/dist/portfolio-frontend'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(process.env.PWD + '/dist/portfolio-frontend/index.html'));
});
app.listen(process.env.PORT || 8080);
