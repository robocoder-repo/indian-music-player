
const songs = [
    { title: "Tum Hi Ho", artist: "Arijit Singh", id: "Umqb9KENgmk" },
    { title: "Channa Mereya", artist: "Arijit Singh", id: "284Ov7ysmfA" },
    { title: "Ae Dil Hai Mushkil", artist: "Arijit Singh", id: "6FURuLYrR_Q" }
];

let currentSongIndex = 0;
let player;

const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: songs[currentSongIndex].id,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    updateSongInfo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        playNextSong();
    }
}

function updateSongInfo() {
    songTitle.textContent = songs[currentSongIndex].title;
    artist.textContent = songs[currentSongIndex].artist;
}

function playSong() {
    player.playVideo();
    playPauseBtn.textContent = 'Pause';
}

function pauseSong() {
    player.pauseVideo();
    playPauseBtn.textContent = 'Play';
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    player.loadVideoById(songs[currentSongIndex].id);
    updateSongInfo();
}

function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    player.loadVideoById(songs[currentSongIndex].id);
    updateSongInfo();
}

playPauseBtn.addEventListener('click', () => {
    if (player.getPlayerState() == YT.PlayerState.PLAYING) {
        pauseSong();
    } else {
        playSong();
    }
});

nextBtn.addEventListener('click', playNextSong);
prevBtn.addEventListener('click', playPreviousSong);

// Load YouTube IFrame Player API code asynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
