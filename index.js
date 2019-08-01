const express = require('express')
const path = require('path')
var app = express();
const PORT = process.env.PORT || 5000
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('index'))

http.listen(PORT, () => console.log(`Listening on ${ PORT }`))

io.on('connection', function(socket){
  socket.on('paused', (time) =>{
    console.log('paused at: '+time);
    io.emit('pauseChange', time);
  })
  socket.on('ready',()=>{
    io.emit('start');
  })
  socket.on('playing',()=>{
    io.emit('playChange');
  })
});