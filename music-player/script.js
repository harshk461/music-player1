const musicContainer = document.getElementById('music-container');
const playbtn = document.getElementById('play');
const prevbtn = document.getElementById('prev');
const nextbtn = document.getElementById('next');

const audio = document.createElement('audio');
audio.id='audio';

const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

const songs = [
    {
        Name:'Attention',
        path:'/songs/Attention.mp3',
        cover:'/images/Attention.jpg'
    },
    {
        Name:'Bad Habits',
        path:'/songs/Bad Habits.mp3',
        cover:'/images/Bad Habits.jpg'
    },
    {
        Name:'Shivers',
        path:'/songs/Shivers.mp3',
        cover:'/images/Shivers.jpg'
    },
    {
        Name:'All I Ever Wanted',
        path:'/songs/All-I-Ever-Wanted.mp3',
        cover:'/images/All-I-Ever-Wanted.jpg'
    }
];

let songindex=2;

const loadsong=(index)=>{
    title.textContent=songs[index].Name;
    audio.src=songs[index].path;
    cover.src=songs[index].cover;
}

loadsong(songindex);

playbtn.addEventListener('click',()=>{
    const isplaying=musicContainer.classList.contains('play');
    random_bg();
    if(isplaying){
        pausesong();
    }
    else{
        playsong();
    }
})
const random_bg=()=>{
    let red=Math.floor(Math.random()*256)+64;
    let green=Math.floor(Math.random()*256)+64;
    let blue=Math.floor(Math.random()*256)+64;

    let bgcolor=`rgb(${red},${green},${blue})`;
    document.body.style.backgroundColor=bgcolor;
}

const playsong=()=>{
    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');
    musicContainer.classList.add('play');
    cover.style.animationPlayState='running';
    audio.play();
}

function pausesong() {
    musicContainer.classList.remove('play');
    playbtn.querySelector('i.fas').classList.add('fa-play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');  
    cover.style.animationPlayState='paused';
    audio.pause();
}


function prevsong(){
    songindex--;
    if(songindex<0){
        songindex=songs.length-1;
    }
    loadsong(songindex);
    playsong();
}

function nextsong() {
    songindex++;
    if (songindex > songs.length - 1) {
        songindex = 0;
    }
    loadsong(songindex)  ;
    playsong();
}
prevbtn.addEventListener('click',prevsong);
nextbtn.addEventListener('click',nextsong);

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}
audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click', setProgress);