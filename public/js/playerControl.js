
var url = new URL(window.location.href);
var roomID = url.searchParams.get('room');
document.getElementById('header').innerText = ('Room ID: ' + roomID);

/* window.onload = function(){
    document.getElementById('video').src="https://www.youtube.com/embed/"+watchID+"?enablejsapi=1";
    document.getElementById('video').style="visibility: visible";
} */

  window.onload = function(){
    socket.emit('addUser', roomID);
  }
// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // global variable for the player
var player;

// this function gets called when API is ready to use
function onYouTubeIframeAPIReady() {
  // create the global player from the specific iframe (#player)
  player = new YT.Player('video', {
    events: {
      // call this function when player is ready to use
      'onStateChange': onPlayerStateChange,
      'onReady': onPlayerReady
    },
    // player variables to have fun with
    playerVars: {
      'controls':0,
      'disablekb':1,
      'modestbranding':1,
      'rel':0,
      'showinfo':0
    }
  });
}

// Global variable for icon, play-stop button and socket
var icon = document.getElementById("icon");
var psButton = document.getElementById("ps-button");
var socket = io();


// this functions is called whenever there is a change in state like changing from playing to pause etc.
function onPlayerStateChange(event){
  var state = player.getPlayerState();
  if(state === 1){
    socket.emit('playing', player.getCurrentTime(),roomID);
  } else if (state === 2){
    socket.emit('paused', player.getCurrentTime(),roomID);
  }
}

// triggered when a packed is recieved with tag 'pauseChange'
socket.on('pauseChange', (time)=>{
  player.pauseVideo();
  player.seekTo(time,true);
});

// * with 'playChange
socket.on('playChange', ()=>{
  player.playVideo();
});

// called when player is ready
 function onPlayerReady(event) {
   socket.emit('ready',roomID);
   socket.on('start',()=>{
     player.playVideo();
     player.seekTo(0,true);
   });
 } 