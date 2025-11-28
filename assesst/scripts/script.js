let $ = document;
import songs from "./music.js";

const audio = $.querySelector('#audio');
const playBtn = $.querySelector('#play-btn');
const musicName = $.querySelector('.music-name');
const artistName = $.querySelector('.artist-name');
const nextBtn = $.querySelector('#next-song');
const prevBtn = $.querySelector('#prev-song');
const songPoster = $.querySelector('#song-poster');
const playToggle = $.querySelector('.play-btn');
const playListContainer = $.querySelector('.playlist-songs');
const currentTimeEl = $.querySelector('#current-time');
const durationEl = $.querySelector('#duration');
const seekBar = $.querySelector('#music-seekbar');
const volumeBar = $.querySelector('#volume-seekbar');
const volumeIcon = $.querySelector('#volume-high');
const favBtn = $.querySelector('#heart-icon');
let faviourts = JSON.parse(localStorage.getItem('faviourts')) || [];


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
    updateHeart()

    currentTimeEl.textContent = '0:00'
    durationEl.textContent = '0:00'

    audio.addEventListener('loadedmetadata' , ()=> {
        durationEl.textContent = formatTimer(audio.duration)
    } , {once: true} ) 
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

// seek bar 
function formatTimer (seconds) {
    if(isNaN(seconds)) return '0:00'

    let mins = Math.floor(seconds / 60)
    let secs = Math.floor(seconds % 60)

    if(secs < 10 ) secs = '0' + secs
    return `${mins}:${secs}`

}


audio.addEventListener('timeupdate' , ()=> {
    if(!audio.duration) return;

    const percent = (audio.currentTime / audio.duration) * 10000
    seekBar.value = percent 
    currentTimeEl.textContent = formatTimer(audio.currentTime)
})

audio.addEventListener('ended' , ()=> {
    nextSongBtn()
})

seekBar.addEventListener('input' , ()=> {
    if(!audio.duration) return;

    const percent = seekBar.value / 10000;
    const newTime = percent * audio.duration;
    audio.currentTime = newTime
})

// volume seekBar 
audio.volume = volumeBar.value / 100


volumeBar.addEventListener('input' , ()=> {
    const volume = volumeBar.value / 100
    audio.volume  = volume
    updateVolumeIcon(volume)
})

function updateVolumeIcon (volume) {
    if(volume === 0) {
        volumeIcon.className = 'fa-solid fa-volume-xmark'
    }
    else if(volume < 0.5) {
        volumeIcon.className = 'fa-solid fa-volume-low'
    } else {
        volumeIcon.className = 'fa-solid fa-volume-high'
    }
}

volumeIcon.addEventListener('click' , ()=> {
    if(audio.volume > 0) {
        audio.volume = 0
        volumeBar.value  = 0
    }else {
        audio.volume = 1
        volumeBar.value = 100

    }

    updateVolumeIcon(audio.volume)
})

playListContainer.addEventListener('click' ,  (e)=> {
    const item = e.target.closest('.song-queue')
    if (!item) return

    const index = Number(item.dataset.index)
    loadSongs(index)
    audio.play()
})


// faviourts btn

function updateHeart(){
    if(faviourts.includes(currentIndex)) {
        favBtn.className = 'fa-solid fa-heart'
        favBtn.style.color = 'red'
    } else{
        favBtn.className = 'fa-regular fa-heart'
        favBtn.style.color = 'white'
    }
}

favBtn.addEventListener('click' , ()=> {
    if(faviourts.includes(currentIndex)){
        faviourts = faviourts.filter(item => item !== currentIndex)
    } else {
        faviourts.push(currentIndex)
    }
    localStorage.setItem('faviourts', JSON.stringify(faviourts))
    updateHeart()
})

nextBtn.addEventListener('click' , nextSongBtn)
prevBtn.addEventListener('click' ,prevSong)
audio.addEventListener('play' , updateICon)
audio.addEventListener('pause', updateICon)
renderPlyList()
loadSongs(currentIndex)
