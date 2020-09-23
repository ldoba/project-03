const startingMinutes = 20;
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
//Interval pour rafraichissement chaque seconde
var interval = setInterval(updateCountdown, 1000);

//le timer est activé après avoir appuyer sur le bouton du canvas
canvasbtn.onclick = updateCountdown();


