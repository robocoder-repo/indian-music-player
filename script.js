
const songs = [
    { title: "Tum Hi Ho", artist: "Arijit Singh", id: "Umqb9KENgmk" },
    { title: "Channa Mereya", artist: "Arijit Singh", id: "284Ov7ysmfA" },
    { title: "Ae Dil Hai Mushkil", artist: "Arijit Singh", id: "6FURuLYrR_Q" },
    { title: "Gerua", artist: "Arijit Singh", id: "AEI85hcB_lE" },
    { title: "Khairiyat", artist: "Arijit Singh", id: "hoNb6HuNmpo" },
    { title: "Masakali 2.0", artist: "A.R. Rahman, Mohit Chauhan", id: "HqUeSjsYLNU" },
    { title: "Tum Se Hi", artist: "Mohit Chauhan", id: "mt9xg0mmt28" },
    { title: "Matargashti", artist: "Mohit Chauhan", id: "6vKucgAeF_Q" },
    { title: "Sadda Haq", artist: "Mohit Chauhan", id: "p9DQINKZxWE" },
    { title: "Kun Faya Kun", artist: "A.R. Rahman, Javed Ali, Mohit Chauhan", id: "T94PHkuydcw" },
    { title: "Jeene Laga Hoon", artist: "Atif Aslam", id: "3YMqOSQ7tAY" },
    { title: "Pehli Nazar Mein", artist: "Atif Aslam", id: "BadBAMnPX0I" },
    { title: "Woh Lamhe", artist: "Atif Aslam", id: "KtHRBvNHRyo" },
    { title: "Tera Hone Laga Hoon", artist: "Atif Aslam", id: "WPwTPhFMm3k" },
    { title: "Piya Re", artist: "Atif Aslam", id: "2kgEc6oH5J0" },
    { title: "Teri Deewani", artist: "Kailash Kher", id: "zZasH6qkn8M" },
    { title: "Saiyyan", artist: "Kailash Kher", id: "TuULiuZroZo" },
    { title: "Allah Ke Bande", artist: "Kailash Kher", id: "9Ered22Xy4E" },
    { title: "Dilbara", artist: "Kailash Kher", id: "gfyA5rMIr1E" },
    { title: "Ya Rabba", artist: "Kailash Kher", id: "HGf5JbRHT0s" }
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
