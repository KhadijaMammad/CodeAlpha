import { songs } from './data.js';

const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const repeatBtn = document.getElementById('repeat-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const volumeSlider = document.getElementById('volume-slider');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const playlist = document.getElementById('playlist');

let currentIndex = 0;
let isPlaying = false;
let isRepeat = false;

const audio = new Audio();
audio.volume = volumeSlider.value;

function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    audio.src = convertToMp3(song.audio); // YouTube linklərə düzəliş
    updatePlaylistUI();
}

function convertToMp3(url) {
    // YouTube videolarını birbaşa dinlətmək olmaz – test üçün öz mp3-lərini istifadə et.
    return "assets/sample.mp3"; // Test üçün dəyişin
}

function playSong() {
    isPlaying = true;
    audio.play();
    playIcon.classList.replace('fa-play', 'fa-pause');
}

function pauseSong() {
    isPlaying = false;
    audio.pause();
    playIcon.classList.replace('fa-pause', 'fa-play');
}

function togglePlay() {
    isPlaying ? pauseSong() : playSong();
}

function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    playSong();
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    playSong();
}

function updateTime() {
    const current = audio.currentTime;
    const duration = audio.duration;

    if (!isNaN(duration)) {
        const progressPercent = (current / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        currentTimeEl.textContent = formatTime(current);
        totalTimeEl.textContent = formatTime(duration);
    }
}

function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

progressBar.addEventListener('click', (e) => {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active', isRepeat);
});

audio.addEventListener('ended', () => {
    isRepeat ? playSong() : nextSong();
});

audio.addEventListener('timeupdate', updateTime);

playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

function updatePlaylistUI() {
    playlist.innerHTML = "";
    songs.forEach((song, index) => {
        const div = document.createElement('div');
        div.className = `playlist-item${index === currentIndex ? ' active' : ''}`;
        div.innerHTML = `
            <img src="${song.image}" alt="${song.title}" />
            <div>
                <strong>${song.title}</strong><br />
                <small>${song.artist}</small>
            </div>
        `;
        div.addEventListener('click', () => {
            currentIndex = index;
            loadSong(currentIndex);
            playSong();
        });
        playlist.appendChild(div);
    });
}

// İlk mahnını yüklə
loadSong(currentIndex);
