export const videoPlayerInit = () => {

    // video-player
    // video-button__play
    // video-button__stop
    // video-time__passed
    // video-progress
    //     video - time__total

    const videoPlayer = document.querySelector('.video-player');
    //console.log(videoPlayer);//videoPlayer.js:11 <video src=​"video/​rocket_launching.mp4" class=​"video-player" poster=​"video/​play.svg" data-vscid=​"dn0qzp0ma">​</video>​

    const videoButtonPlay = document.querySelector('.video-button__play');
    //console.log(videoButtonPlay); //videoPlayer.js:14 <button class=​"video-button video-button__play fa fa-play">​</button>​

    const videoButtonStop = document.querySelector('.video-button__stop');
    //console.log(videoButtonStop); //videoPlayer.js:17<button class="video-button video-button__stop fa fa-stop"></button>

    const videoTimePassed = document.querySelector('.video-time__passed');
    //console.log(videoTimePassed); //videoPlayer.js:20 <p class=​"video-time video-time__passed">​00:00​</p>​

    const videoProgress = document.querySelector('.video-progress');
    //
    //console.log(videoProgress); //videoPlayer.js:23 <input type=​"range" class=​"video-progress" min=​"0" max=​"100" step=​"0.1" value=​"0">​

    const videoTimeTotal = document.querySelector('.video-time__total');
    console.log(videoTimeTotal); //videoPlayer.js:27 <p class=​"video-time video-time__total">​00:00​</p>​


    const toggleIcon = () => {
        if (videoPlayer.paused) { // если видео на паузе
            videoButtonPlay.classList.remove('fa-pause'); //удаляем иконку на паузе 

            videoButtonPlay.classList.add('fa-play'); //добавляем  иконку play паузе 

        } else { // если видео не на паузе
            videoButtonPlay.classList.add('fa-pause'); //удаляем иконку на паузе 

            videoButtonPlay.classList.remove('fa-play'); //добавляем  иконку play паузе 
        }
    }

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }

        //toggleIcon(); // вызываем toggleIcon после клика запуска или остановки на паузу
    }

    const stopPlay = () => {
            videoPlayer.pause();
            videoPlayer.currentTime = 0; //возвращаем время видео в нулевую позицию после stop - это будет начальной точкой откуда видео начинается
        }
        // условие ? (условие верно) : (условие лож)
    const addZero = n => n < 10 ? '0' + n : n; // если число n меньше 10 тогда возвращаем '0' + n; если больше 10 тогда возвращаем само число n

    // Вешаем обработчик событий по клику на кнопку videoPlayer 
    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);


    videoPlayer.addEventListener('play', toggleIcon); //вешаем обработчик событий на видеоплеер когда play вызываем функцию еtoggleIcon
    videoPlayer.addEventListener('pause', toggleIcon); //вешаем обработчик событий на видеоплеер когда pause вызываем функцию еtoggleIcon


    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime; // счетчик времени который изменяется во время просмотра видео
        const duration = videoPlayer.duration; //время сколько длится видео постоянная величина

        videoProgress.value = (currentTime / duration) * 100; // получаем прогресс бар видео в процентах

        //console.log(currentTime); // время все время меняется в процессе просмотра от 0 до конца видео
        //console.log(duration); //63.397


        let minutePassed = Math.floor(currentTime / 60); // получаем количество минут
        let secondsPassed = Math.floor(currentTime % 60); //получаем количество секунд

        let minuteTotal = Math.floor(duration / 60); //получаем количество минут
        let secondsTotal = Math.floor(duration % 60); //получаем количество секунд


        videoTimePassed.textContent = addZero(minutePassed) + ':' + addZero(secondsPassed); //`${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondsTotal);
    });



    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration; // время видео
        const value = videoProgress.value; //значение времени видео куда мы щелкнем

        console.log(duration);
        console.log(value);

        videoPlayer.currentTime = (value * duration) / 100;
    })
};