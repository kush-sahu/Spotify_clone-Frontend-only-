let currentsong=new Audio();
let songs;

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
      return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}
async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/spotify-clone/songs/");
    let response = await a.text();
    
  
    let div = document.createElement("div");
    div.innerHTML = response;
  
    let as = div.getElementsByTagName("a");
    
  
     songs = []
  
    for (let index = 0; index < as.length; index++) {
      const element = as[index];
      if (element.href.endsWith(".mp3")) {
         songs.push(element.href.split("/songs/")[1]);
      }
    }

    let songul=document.querySelector(".songlist").getElementsByTagName("ul")[0]
   for(const song of songs){
       songul.innerHTML=songul.innerHTML + 
       `<li> 
        <img class="invert" width="34" src="music.svg" alt="">
       <div class="info">
           <div>${song.replaceAll("%20", " ")}</div>
           <div>song artist</div>
       </div>
       <div class="playnow">
           <span>Play Now</span>
       <img class="invert" src="play.svg" alt="">
   </div>
 </li>`;
}
Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
  e.addEventListener("click",element=>{
    console.log(e.querySelector(".info").firstElementChild.innerHTML)
     playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
  })
})

return songs
}


  
   
  
  const playMusic=(track , pause=false)=>{
    currentsong.src= "/songs/" +track
    if(!pause){
      
      currentsong.play()
     
    }
    play.src="pause.svg"
 
     
    document.querySelector(".songinfo").innerHTML=decodeURI(track)
    document.querySelector(".songtime").innerHTML="00:00 / 00:00"

  }


  async function main() {

     await getSongs("songs/ncs");

    playMusic(songs[0],true)
  
  
   // show all the songs in the playlist
   

play.addEventListener("click", () => {
  if (currentsong.paused) {
    currentsong.play();
    play.src = "pause.svg";
  } else {
    currentsong.pause(); // Corrected typo here
    play.src = "play.svg";
  }
});



currentsong.addEventListener("timeupdate",()=>{
  document.querySelector(".songtime").innerHTML=`$
  {secondsToMinutesSeconds(currentsong.currentTime)}/${
    secondsToMinutesSeconds(currentsong.duration)}`
    document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100+"%";

}) 

//add an event listner to seekbar
document.querySelector(".seekbar").addEventListener("click",e=>{
  let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
  document.querySelector(".circle").style.left=percent+"%";
  currentsong.currentTime=((currentsong.duration)*percent)/100
})




//event listner for hamburger
document.querySelector(".hamburger").addEventListener("click",()=>{
  document.querySelector(".left").style.left="0"
})


//add event listner for close x

document.querySelector(".cross").addEventListener("click",()=>{
  document.querySelector(".left").style.left="-120%"
})






  }


  

  main()







  


