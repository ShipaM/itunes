export const radioPlayerInit = () => {
    // получаем элементы со страницы
    const radio = document.querySelector('.radio');
    console.log(radio)
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const audioVolume = document.querySelector('.audio__volume');
    const radioMute = document.querySelector('.radio-mute');

    const audio = new Audio(); //В нашу переменную audio попадает объект у которого есть различные методы и свойства

    audio.type = 'audio/aac'; //тип аудио

    //let tempVolume = audio.volume;

    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play'); //убираем анимацию иконки
            radioStop.classList.add('fa-play'); // если аудио на паузе добавляем класс 'fa-play'
            radioStop.classList.remove('fa-stop'); // если аудио на паузе удаляем класс 'fa-stop'
        } else {
            radio.classList.add('play'); //включаем анимацию иконки
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }

    radioNavigation.addEventListener('change', (event) => {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        selectItem(parrent);

        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg

        radioStop.disabled = false;
        //console.log(target.dataset.radioStantion);
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    });


    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });



    audioVolume.addEventListener('input', () => {
        audio.volume = audioVolume.value / 100
        audio.muted = false
    });

    audio.volume = 0.5;

    audioVolume.value = audio.volume * 100;


    radioMute.addEventListener('click', () => {
        audio.muted = !audio.muted
    });

    return () => {
        audio.pause();
        changeIconPlay();
    }

    // radioPlayerInit.stop= () => {
    //     audio.pause();
    //     changeIconPlay();
    // }
}