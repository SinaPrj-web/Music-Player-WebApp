let $ = document;
import songs from "./music.js";

const audio = $.querySelector('#audio')
const playBtn = $.querySelector('#play-btn')
const musicName = $.querySelector('.music-name')
const artistName = $.querySelector('.artist-name')
const nextBtn = $.querySelector('#next-song')
const prevBtn = $.querySelector('#prev-song')
const songPoster = $.querySelector('#song-poster')
const playToggle = $.querySelector('.play-btn')


let currentIndex = 0
let isPlaying = false 


// load song
function loadSongs (index) {
    audio.src = songs[index].src
    musicName.textContent = songs[index].title
    artistName.textContent = songs[index].artist
    songPoster.src = songs[index].poster
    audio.load
    checkTitleOverflow()
}

// nextBtn function
function nextSongBtn () {
    currentIndex ++
    if(currentIndex >= songs.length) currentIndex = 0;
    loadSongs(currentIndex)
    audio.play();
    checkTitleOverflow()
    updateIcon()

}
// prev function
function prevSong () {
    currentIndex --
    if (currentIndex < 0)currentIndex = songs.length - 1
    loadSongs(currentIndex)
    audio.play();
    checkTitleOverflow()
    updateIcon()
}

// titleOverflow function

function checkTitleOverflow () {
    const nameWrapper = $.querySelector('.music-name-container')
    const title = $.querySelector('.music-name')

    if(title.scrollWidth > nameWrapper.clientWidth) {
        title.classList.add('scroll')
    } else {
        title.classList.remove('scroll')
    }
}

// play toggle btn function 
playToggle.addEventListener('click' , function () {
    if(!isPlaying){
        audio.play();
        isPlaying = true;
        playToggle.innerHTML = '<i id="play-btn" class="fa-solid fa-pause"></i>'
    } else {
        audio.pause();
        isPlaying = false;
        playToggle.innerHTML = '<i id="play-btn" class="fa-solid fa-play"></i>'
    }
})


// update play button function
function updateIcon () {
    if(isPlaying) {
        playBtn.className = 'fa fa-pause'

    } else {
        playBtn.className = 'fa fa-play'
    }

}

audio.addEventListener('play' , ()=> {
    isPlaying = true;
    updateIcon()
})

audio.addEventListener('pause' , ()=> {
    isPlaying = false;
    updateIcon()
})

playBtn.addEventListener('click' , function () {
    audio.play().catch(err => console.error('play error' , err))

})


nextBtn.addEventListener('click' , nextSongBtn)
prevBtn.addEventListener('click' ,prevSong)
loadSongs(currentIndex)
