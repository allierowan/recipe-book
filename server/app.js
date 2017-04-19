var express = require('express');
var bodyParser = require('body-parser');
require('dotenv').config();

var server = express();

server.set('port', process.env.PORT || 3000);

server.use(express.static('client/public'));

server.use(bodyParser.json());

server.use(function logger(req, res, next) {
    console.log('REQUEST sent to ', req.path);

    next();
});

server.get('/', function(req, res) {
  res.send('Welcome');
});

server.use('/api/recipes', require('./routes/recipes'));

server.listen(server.get('port'), function serverStarted(err) {
    if (err) {
        console.error(err);
    } else {
        console.log('Server started at http://localhost:' + server.get('port'));
    }
});
