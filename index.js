const express = require('express')
const path = require('path')
var app = express();
const PORT = process.env.PORT || 5000
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('start'))
app.get('/index', (req, res)=>{
   // console.log(req.query.watch);
    res.render('index');
})

http.listen(PORT, () => console.log(`Listening on ${ PORT }`))

var rooms = new Map([["1" ,1]]);


io.on('connection', function(socket){

  socket.on('addUser',(roomID)=>{
    if(!rooms.has(roomID)){
      rooms[roomID] = 1;
      console.log("ROOM CREATED: " + roomID);
    } 
    socket.join(roomID);
  })

  socket.on('paused', (time,roomID) =>{
    console.log('Room ID: ' + roomID + ' paused at: '+time);
    io.to(roomID).emit('pauseChange', time);
  })
  socket.on('ready',(roomID)=>{
    io.to(roomID).emit('start');
  })
  socket.on('playing',(time,roomID)=>{
    console.log('Room ID: ' + roomID + ' started playing at: '+ time);
    io.to(roomID).emit('playChange');
  })
});