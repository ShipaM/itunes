export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    console.log(audioPlayer);
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');



    const playlist = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    const loadTrack = () => { //создаем функцию загрузки трека 
        const isPlayed = audioPlayer.paused;
        console.log(isPlayed)
        const track = playlist[trackIndex];
        console.log(track);
        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if (isPlayed) {
            audioPlayer.pause();

        } else {
            audioPlayer.play();
        }
    };

    const toggleAudioPlay = () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }

        //toggleIcon(); // вызываем toggleIcon после клика запуска или остановки на паузу
    }

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    };


    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    }


    const addZero = n => n < 10 ? '0' + n : n;
    // С помощью audioNavigation  будем управлять треками, тоесть запускать и переключать
    //вешаем обработчик событий на audioNavigation и с помощью делегирования будем определять по какой из кнопок нажал пользователь
    audioNavigation.addEventListener('click', (event) => {
        const target = event.target;
        console.log(target);
        if (target.classList.contains('audio-button__play')) {

            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }

            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        //метод .contains() объекта Node возвращает логическое значение, которое указывает на то является ли указанный узел потомком данного узла, или нет. В том случае если узел является потомком возвращается значение true, если нет, то возвращается значение false.

        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }

        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }
    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });


    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';

        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondsPassed = Math.floor(currentTime % 60) || '0';

        const minutesTotal = Math.floor(duration / 60) || '0';
        const secondsTotal = Math.floor(duration % 60) || '0';




        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;

        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });

    audioProgress.addEventListener('click', (event) => {
        const x = event.offsetX; //координата того места куда мыкликнули
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });

    return () => {
        audioPlayer.pause();
        //toggleIcon();


    }

    // audioPlayerInit.stop= () => {
    //     audioPlayer.pause();

    //     
    // }
}