//import
import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';


//const
const playerBtn = document.querySelectorAll('.player-btn');
//console.log(playerBtn); //scripts.js:6 NodeList(3) [div.player-btn.player-video, div.player-btn.player-audio, div.player-btn.player-radio]

const playerBlock = document.querySelectorAll('.player-block');
//console.log(playerBlock);//scripts.js:9 NodeList(3) [article.player-block.video, article.player-block.audio, article.player-block.radio]

const temp = document.querySelector('.temp');
//console.log(temp);//scripts.js:12 <div class=​"temp">​…​</div>​<h2>​…​</h2>​</div>​

const stopVideoPlayer = videoPlayerInit();
const stopRadioPlayer = radioPlayerInit();
const stopMusicPlayer = musicPlayerInit();


//function
const deactivationPlayer = () => {
    temp.style.display = 'none';
    playerBtn.forEach((item) => { item.classList.remove('active') });
    playerBlock.forEach((item) => { item.classList.remove('active') })

    stopVideoPlayer();
    stopRadioPlayer();
    stopMusicPlayer();


}

playerBtn.forEach((btn, i) => {
    //console.log(btn, i); //scripts.js:14 <div class=​"player-btn player-video">​Видео​</div>​ 0
    //scripts.js:14 <div class=​"player-btn player-audio">​Музыка​</div>​ 1
    //scripts.js:14 <div class=​"player-btn player-radio">​Радио​</div>​ 2

    //На каждую кнопку вешаем слушатель событий 
    btn.addEventListener('click', () => {
        deactivationPlayer();
        btn.classList.add('active');
        playerBlock[i].classList.add('active');
    })

})