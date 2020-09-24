const maxTime = 5 * 1000 * 60;

const out = document.querySelector("#timeleft");
function msToTime(duration) {
  let milliseconds = parseInt((duration % 1000));
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  // let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  // hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');
  milliseconds = milliseconds.toString().padStart(3, '0');

  //return hours + ":" + minutes + ":" + seconds;
  return "temps restant : " + minutes + "min " + seconds + "s";
}

let timer;
function countDown() {
  const diff = Date.now() - startTime;
  const remaining = Math.max(maxTime - diff, 0);
  if (remaining > 0) {
    out.textContent = msToTime(remaining);
    timer = window.setTimeout(countDown, 20);
  } else {
     out.textContent = 'Terminé';
     window.localStorage.removeItem('timer')
  }
}

const storageTime = window.localStorage.getItem('timer');
let startTime = storageTime ? +storageTime : null;

if (startTime) countDown();

document.querySelector("#canvasbtn").addEventListener("click", function (evt) {
  evt.preventDefault();
  if (timer) window.clearTimeout(timer);
  startTime = Date.now();
  countDown();
  window.localStorage.setItem('timer', startTime);
});



