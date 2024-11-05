
const songs = [
    { title: "Smooth Sailing", artist: "Audionautix", src: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Audionautix/Acoustic/Audionautix_-_Smooth_Sailing.mp3" },
    { title: "Acoustic Breeze", artist: "bensound", src: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3" },
    { title: "Ukulele", artist: "bensound", src: "https://www.bensound.com/bensound-music/bensound-ukulele.mp3" }
];

let currentSongIndex = 0;
let audio = new Audio(songs[currentSongIndex].src);

const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');
const progressBar = document.querySelector('.progress');

function updateSongInfo() {
    songTitle.textContent = songs[currentSongIndex].title;
    artist.textContent = songs[currentSongIndex].artist;
}

function playSong() {
    audio.play();
    playPauseBtn.textContent = 'Pause';
}

function pauseSong() {
    audio.pause();
    playPauseBtn.textContent = 'Play';
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    audio.src = songs[currentSongIndex].src;
    updateSongInfo();
    playSong();
}

function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    audio.src = songs[currentSongIndex].src;
    updateSongInfo();
    playSong();
}

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

nextBtn.addEventListener('click', playNextSong);
prevBtn.addEventListener('click', playPreviousSong);

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
});

audio.addEventListener('ended', playNextSong);

updateSongInfo();
