let $ = document;
import songs from "./music.js";

const audio = $.querySelector('#audio')
const playBtn = $.querySelector('#play-btn')
const pauseBtn = $.querySelector('#pause-btn')

let currentIndex = 0
audio.src = songs[currentIndex].src
audio.load();


playBtn.addEventListener('click' , function () {
    audio.play();
})
