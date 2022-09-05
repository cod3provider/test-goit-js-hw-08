import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function() {
  console.log('played the video!');
});

player.on('timeupdate', throttle(function(evt) {
  localStorage.setItem('videoplayer-current-time', evt.seconds);
  console.log(evt.seconds);
}, 1000));

if (localStorage.getItem('videoplayer-current-time')) {
  player.setCurrentTime(localStorage.getItem('videoplayer-current-time')).then(function(seconds) {
    console.log(`Время из localStorage: ${seconds}`);
  }).catch(function(error) {
    switch (error.name) {
      case 'RangeError':
        console.log('Значение времени  было меньше 0 или больше, чем продолжительность видео');
        break;

      default:
        console.log('Произошла какая-то другая ошибка');
        break;
    }
  });
}

player.getVideoTitle().then(function(title) {
  console.log('title:', title);
});