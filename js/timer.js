//on crée nos variables const
//Ici la réservation s'efface au bout de 20mn
const maxTime = 20 * 1000 * 60;
const out = document.querySelector("#timeleft");
const storageTime = window.sessionStorage.getItem('timer');
let startTime = storageTime ? +storageTime : null;
let timer;

function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000));
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    milliseconds = milliseconds.toString().padStart(3, '0');

  //retourne les minutes + secondes (pas besoin du reste ici)
  return "Temps restant : " + minutes + "min " + seconds + "s";
}

function countDown() {
  const diff = Date.now() - startTime;
  const remaining = Math.max(maxTime - diff, 0);
  if (remaining > 0) {
    out.textContent = msToTime(remaining);
    timer = window.setTimeout(countDown, 20);
  } else {
     out.textContent = 'Terminé';
     window.sessionStorage.removeItem('timer');
     window.sessionStorage.removeItem('station-name');
  }
}

if (startTime) countDown();

// si l'utilisateur fait une (nouvelle) réservation => restart le timer
document.querySelector("#canvasbtn").addEventListener("click", function (evt) {
  evt.preventDefault();
  if (timer) window.clearTimeout(timer);
  startTime = Date.now();
  countDown();
  window.sessionStorage.setItem('timer', startTime);
});



