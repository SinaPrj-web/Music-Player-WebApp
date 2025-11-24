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
const playListContainer = $.querySelector('.playlist-songs')


let currentIndex = 0


// load song
function loadSongs (index) {
    currentIndex =index
    audio.src = songs[index].src
    musicName.textContent = songs[index].title
    artistName.textContent = songs[index].artist
    songPoster.src = songs[index].poster
    audio.load()
    checkTitleOverflow()
    updateActivePlaylistItem()
}

// nextBtn function
function nextSongBtn () {
    currentIndex ++
    if(currentIndex >= songs.length) currentIndex = 0;
    loadSongs(currentIndex)
    audio.play();
    checkTitleOverflow()

}
// prev function
function prevSong () {
    currentIndex --
    if (currentIndex < 0) currentIndex = songs.length - 1
    loadSongs(currentIndex)
    audio.play();
    checkTitleOverflow()
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

function updateICon () {
    if(audio.paused){
        playBtn.className = 'fa-solid fa-play'
    } else {
        playBtn.className = 'fa-solid fa-pause'
    }

}


playToggle.addEventListener('click' ,()=> {
    if(audio.paused) {
        audio.play()
    } else {
        audio.pause()
    }
})


// render playlistfunction
function renderPlyList () {
    playListContainer.innerHTML = '';

    songs.forEach((song , index)=> {
        const item = $.createElement('div')
        item.classList.add('song-queue')
        item.dataset.index = index;

        item.innerHTML = `
        <span class="song-name">${song.title}</span>
        <span class="song-artist">${song.artist}</span>
        `
        playListContainer.appendChild(item)
    })
}


// playlist songhighlight 
function updateActivePlaylistItem() {
    const item = playListContainer.querySelectorAll('.song-queue')

    item.forEach(item => {
        const idx = Number(item.dataset.index)
        if (idx === currentIndex){
            item.classList.add('active')
        } else {
            item.classList.remove('active')
        }
    })
}


playListContainer.addEventListener('click' ,  (e)=> {
    const item = e.target.closest('.song-queue')
    if (!item) return

    const index = Number(item.dataset.index)
    loadSongs(index)
    audio.play()
})

nextBtn.addEventListener('click' , nextSongBtn)
prevBtn.addEventListener('click' ,prevSong)
audio.addEventListener('play' , updateICon)
audio.addEventListener('pause', updateICon)
renderPlyList()
loadSongs(currentIndex)
