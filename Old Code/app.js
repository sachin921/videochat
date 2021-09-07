const express = require('express');
const app = express();
const http=require('http');
const hostname = 'localhost';
const port = process.env.PORT ||3000;
const server =  http.createServer(app);

const stream = require('./ws/stream');
const io = require('socket.io')(server);
const path = require('path');
const favicon = require('serve-favicon')

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html');
});



server.listen(port, hostname, function (err) {
  if (err) {
    throw err;
  }
  console.log('server listening on: ', hostname, ':', port);
});
io.of('/stream').on('connection', stream);
//console.log("Express server listening on port %d", server.address().port);
//server.listen(3031);