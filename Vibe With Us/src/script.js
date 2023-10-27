console.log("Welcome to vibe with us!!")

//initialize the variable
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgbar = document.getElementById('progbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs =[
    {songsName : "Ghanchakkar Babu - Amit trivedi", filePath:"songs/1.mp3", coverPath: "covers/1.jpg" },
    {songsName : "Beete Lamhein - KK, Kshitij Tarey", filePath:"songs/2.mp3", coverPath: "covers/2.jpg" },
    {songsName : "Bheegi Bheegi - Pritam, KK", filePath:"songs/3.mp3", coverPath: "covers/3.jpg" },
    {songsName : "Dil Ibaadat - Pritam, KK", filePath:"songs/4.mp3", coverPath: "covers/4.jpg" },
    {songsName : "Hale Dil - Harshit Saxena", filePath:"songs/5.mp3", coverPath: "covers/5.jpg" },
    {songsName : "Haan Tu Hain - Pritam, KK", filePath:"songs/6.mp3", coverPath: "covers/6.jpg" },
    {songsName : "Ishq Sufiyana - Vishal Shekhar, KK", filePath:"songs/7.mp3", coverPath: "covers/7.jpg" },
    {songsName : "Jannatien Kahan - Pritam, KK", filePath:"songs/8.mp3", coverPath: "covers/8.jpg" },
    {songsName : "Humnava - Mithoon, Papon", filePath:"songs/9.mp3", coverPath: "covers/9.jpg" },
    {songsName : "Itni Si Baat Hai - Pritam, Arjit Singh", filePath:"songs/10.mp3", coverPath: "covers/10.jpg" },
    
       
]





//handle play pause 

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity="1";
        
    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play')
        masterPlay.classList.remove('fa-circle-pause')
        gif.style.opacity="0";
       
       
    }
    
})




// listen to the events

audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate')

    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    // console.log(progress)

    myProgbar.value = progress;
})

//changing the bar

myProgbar.addEventListener('change',()=>{
    audioElement.currentTime = myProgbar.value*audioElement.duration/100;
})


//apperaing all cover and song name
songItems.forEach((element,i)=>{
    // console.log(element,i)
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songsName")[0].innerText = songs[i].songsName;

})

// functioning play button on the songs strip

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
        
    })
}

// also adding pause button on it

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', () => {
        if (songIndex !== index) {
            // Check if a different song is clicked
            makeAllPlays(); // Pause all other songs
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
            songIndex = index; // Update the current song index
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songsName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = "1";
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        } else {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                // If the same song is clicked and is paused, play it
                element.classList.remove('fa-circle-play');
                element.classList.add('fa-circle-pause');
                audioElement.currentTime = 0;
                audioElement.play();
                gif.style.opacity = "1";
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            } else {
                // If the same song is clicked and is playing, pause it
                element.classList.add('fa-circle-play');
                element.classList.remove('fa-circle-pause');
                audioElement.pause();
                gif.style.opacity = "0";
                masterPlay.classList.add('fa-circle-play');
                masterPlay.classList.remove('fa-circle-pause');
            }
        }
        
    });
});

//next button

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9)
    {
        songIndex=0;
    }
    else
    {
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    masterSongName.innerText=songs[songIndex].songsName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})
//previous button

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0)
    {
        songIndex = songs.length - 1;
    }
    else
    {
        songIndex-=1;
    }

    audioElement.src = `songs/${songIndex+1}.mp3`
    masterSongName.innerText=songs[songIndex].songsName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})

audioElement.addEventListener('ended', () => {
    // Increment the songIndex to play the next song
    songIndex = (songIndex + 1) % songs.length; // Loop back to the first song if at the end of the playlist
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songsName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

// Initialize the player with the first song
audioElement.src = songs[songIndex].filePath;
masterSongName.innerText = songs[songIndex].songsName;


