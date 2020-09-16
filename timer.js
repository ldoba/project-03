const startingMinutes = 0.2;
let time = startingMinutes * 60;
const canvasbtn = document.querySelector('#canvasbtn');
const countdown = document.getElementById('timer');


//fonction minuteur

function updateCountdown (){
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let timerStatus = true;
    seconds= seconds < 10 ? '0' + seconds : seconds;

    countdown.innerHTML = minutes + ' : ' + seconds;
    time--;

    if ((minutes + seconds) <= 0){
        clearInterval(interval);
        timerStatus = false;
    } else{
    }
}

var interval = setInterval(updateCountdown, 1000);

canvasbtn.onclick = updateCountdown();


