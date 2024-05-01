const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play'),
background = document.getElementById('bg-img');
volumeSlider = document.getElementById('volumeSlider');

const music = new Audio();

const songs = [
    {
        path: 'assets/flawless.mp3',
        displayName: 'Flawlëss (feat. Lil Uzi Vert)',
        cover: 'assets/lyfe-cover.jpg',
        artist: 'Yeat, Lil Uzi Vert',
    },
    {
        path: 'assets/up-off-x.mp3',
        displayName: 'Up Off X',
        cover: 'assets/lyfe-cover.jpg',
        artist: 'Yeat',
    },
    {
        path: 'assets/out-the-way.mp3',
        displayName: 'Out thë way',
        cover: 'assets/lyfe-cover.jpg',
        artist: 'Yeat',
    },
    {
        path: 'assets/wat-it-feel-lyke.mp3',
        displayName: 'Wat it feel lykë',
        cover: 'assets/lyfe-cover.jpg',
        artist: 'Yeat',
    },
    {
        path: 'assets/got-it-all.mp3',
        displayName: 'Got it all',
        cover: 'assets/lyfe-cover.jpg',
        artist: 'Yeat',
    },
    {
        path: 'assets/cant-stop-it.mp3',
        displayName: 'Can\'t stop it',
        cover: 'assets/lyfe-cover.jpg',
        artist: 'Yeat',
    },
    {
        path: 'assets/krank.mp3',
        displayName: 'Krank',
        cover: 'assets/lyfe-cover.jpg',
        artist: 'Yeat',
    },
    {
        path: 'assets/talk.mp3',
        displayName: 'Talk',
        cover: 'assets/lyfe-cover.jpg',
        artist: 'Yeat',
    },
    {
        path: 'assets/come-on.mp3',
        displayName: 'Comë on',
        cover: 'assets/lyfe-cover.jpg',
        artist: 'Yeat',
    },
    {
        path: 'assets/system.mp3',
        displayName: 'Systëm',
        cover: 'assets/lyfe-cover.jpg',
        artist: 'Yeat',
    },
    {
        path: 'assets/holy-1.mp3',
        displayName: 'Holy 1',
        cover: 'assets/lyfe-cover.jpg',
        artist: 'Yeat',
    },
    {
        path: 'assets/killin-em.mp3',
        displayName: 'Killin ëm',
        cover: 'assets/lyfe-cover.jpg',
        artist: 'Yeat',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if(isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause')
    music.play();
}

function pauseMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play')
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    
    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar (e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

volumeSlider.addEventListener('input', function() {
    var volume = volumeSlider.value * 0.01; // adjust this multiplier as needed
    audioPlayer.audio.volume = volume;
});

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1))
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);