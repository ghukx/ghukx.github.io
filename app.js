// Cursor tracking
var eyeball = document.getElementById('eyeball_1_');
var eyeballPosition = eyeball.getBoundingClientRect();
var eyeclip = document.getElementById('SVGID_2_');

document.onmousemove = function(){

    if(event.clientX < eyeballPosition.left){
        var x = (eyeballPosition.left - event.clientX) *(-2.5) / window.innerWidth + '%';
    }else if(event.clientX == eyeballPosition.left){
        var x = '0%';
    }else{
        var x = event.clientX *2 / window.innerWidth + '%';
    }

    if(event.clientY < eyeballPosition.top){
        var y = (eyeballPosition.top - event.clientY) *(-1) / window.innerHeight + '%';
    }else{
        var y = event.clientY *0.7/ window.innerHeight + '%';
    }

    eyeball.style.transform = 'translate(' + x + ',' + y + ')';

}

// Eye blink
var tl = gsap.timeline({repeat: -1});

tl.to('#SVGID_2_', {duration: .1, scaleY: 0, transformOrigin: '50% 50%', delay: 5});
tl.to('#SVGID_2_', {duration: .5, scaleY: 1, transformOrigin: '50% 50%'});


// Creates the YT iframe
var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    height: '28',
    width: '50',
    videoId: 'TP3byVO07S4',
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
}

// When player ready changes starting position to 87s, sets volume to 33 and pauses video
function onPlayerReady(event) {
event.target.seekTo(87);
event.target.setVolume(33);
event.target.pauseVideo();
}

// Changes the state variable for different player states
var state = 0;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        state = 1;
    }else if(event.data !== YT.PlayerState.PLAYING){
        state = 0;
    }
}


var odnobtn = document.getElementById('odnoklassniki');

odnobtn.addEventListener('click', function(){
    if (state == 1) {
        player.pauseVideo();
    }else if(state == 0){
        player.playVideo();
    }
});