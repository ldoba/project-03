const startingMinutes = 20;
let time = startingMinutes * 60;

const countdown = document.getElementById('timer');

setInterval(updateCountdown, 1000);

function updateCountdown (){
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds= seconds < 10 ? '0' + seconds : seconds;

    countdown.innerHTML = `${minutes} : ${seconds}`;
    time--;
}