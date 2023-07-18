console.log('spotify');

// Initialization of variables.

let songIndex =0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let gif =document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs =[
    {
        songName : 'let me love you',
        filePath : 'song/1.mp3',
        coversPath : 'covers/1.jpg'
    },
    {
        songName : 'Mann meri jaan',
        filePath : 'song/2.mp3',
        coversPath : 'covers/2.jpg'
    },
    {
        songName : 'Kesariya',
        filePath : 'song/3.mp3',
        coversPath : 'covers/3.jpg'
    },
    {
        songName : 'Ram siya ram 🙌',
        filePath : 'song/4.mp3',
        coversPath : 'covers/4.jpg'
    },
    {
        songName : 'Kahani suno',
        filePath : 'song/5.mp3',
        coversPath : 'covers/5.jpg'
    },
    {
        songName : 'Tu hai to muje fir aur kya chaiye',
        filePath : 'song/6.mp3',
        coversPath : 'covers/6.jpg'
    },
];


songItems.forEach((song,i)=>{
    song.querySelector('img').src = songs[i].coversPath;
    song.getElementsByClassName('songname')[0].textContent = songs[i].songName;

});


// audioElement.play();

// listen to events

// handle play pause click

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity =0;
    }
})

audioElement.addEventListener('timeupdate' , ()=>{
    console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value = progress;


});

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});

function makeAllPlay(){
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((button)=>{
        button.classList.remove('fa-circle-pause');
       button.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((button)=>{
    button.addEventListener('click',(e)=>{
        makeAllPlay();
        songIndex =parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex].songName;
        gif.style.opacity=1;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = "song/"+ (songIndex+1) +".mp3";
        audioElement.currentTime =0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
});

document.getElementById('next').addEventListener('click',()=>{
    songIndex= (songIndex +1)%6;
    audioElement.src = "song/" + (songIndex+1) + ".mp3";
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity=1;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('prev').addEventListener('click',()=>{
    if(songIndex == 0 ){
        songIndex=5;
    }
    else{
        songIndex--;
    }
    audioElement.src = "song/" + (songIndex+1) + ".mp3";
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity=1;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

