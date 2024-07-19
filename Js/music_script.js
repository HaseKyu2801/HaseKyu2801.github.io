

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
nextBtn = wrapper.querySelector("#next"),
prevBtn = wrapper.querySelector("#prev"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = wrapper.querySelector(".progress-bar"),
repeatBtn = wrapper.querySelector("#repeat-plist");
 const volumeSlider = document.getElementById("volume-slider");


let musicIndex = 1;
let playedSongs = new Set();
window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
});


mainAudio.volume = volumeSlider.value / 100 ;

volumeSlider.addEventListener("input", function() {
    mainAudio.volume = this.value / 100;
});

//Hàm chạy nhạc
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `Music/ImageSong/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `Music/Song/${allMusic[indexNumb - 1].src}.mp3`
}

//
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").classList.remove("fa-play");
    playPauseBtn.querySelector("i").classList.add("fa-pause");
    mainAudio.play();
}

function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").classList.remove("fa-pause");
    playPauseBtn.querySelector("i").classList.add("fa-play");
    mainAudio.pause();
}

function netxMusic()
{
    musicIndex++;
    if(musicIndex > allMusic.length -1)
    {
        musicIndex = 1;
            
    }
    loadMusic(musicIndex);
    playMusic();
}

function prevMusic()
{
    musicIndex--;
    if(musicIndex < 1)
    {
        musicIndex = allMusic.length - 1;

    }
    loadMusic(musicIndex);
    playMusic();  
}


//
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
});

nextBtn.addEventListener("click", () => {
    if(repeatBtn.classList.contains('fa-repeat'))
    {
        netxMusic();
    }
    else
    {

        
      
        loadMusic(musicIndex); 
        playMusic(); 
    }
});

prevBtn.addEventListener("click", () => {
    prevMusic();
});

mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuration = wrapper.querySelector(".duration");

    mainAudio.addEventListener("loadeddata", () => {
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10)
        {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10)
        {
            currentSec = `0${currentSec}`;
        }
        musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});


progressArea.addEventListener("click", (e) =>{
    let progressWidthval = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
});

repeatBtn.addEventListener("click", () => {
        if(repeatBtn.classList.contains('fa-repeat'))
        {
            repeatBtn.classList.remove('fa-repeat');
            repeatBtn.classList.add('fa-shuffle');
        }
        else
        {
            repeatBtn.classList.remove('fa-shuffle');
            repeatBtn.classList.add('fa-repeat');
        }
});

mainAudio.addEventListener("ended", () => {
    if(repeatBtn.classList.contains('fa-repeat'))
    {
        netxMusic();
    }
    else
    {
        let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
        do{
            randIndex = Math.floor((Math.random() * allMusic.length) + 1);
        }while(musicIndex == randIndex);
        musicIndex = randIndex;
        loadMusic(musicIndex); 
        playMusic(); 
    }

    // if (repeatBtn.classList.contains('fa-repeat')) {
    //     nextMusic();
    // } else {
    //     let randIndex;

    //     if (playedSongs.size === allMusic.length) {
    //         playedSongs.clear(); // Clear the set if all songs have been played
    //     }

    //     do {
    //         randIndex = Math.floor(Math.random() * allMusic.length);
    //     } while (playedSongs.has(randIndex));

    //     playedSongs.add(randIndex);
    //     musicIndex = randIndex + 1; // Update musicIndex to be 1-based

    //     loadMusic(musicIndex);
    //     playMusic();
    // }
});


