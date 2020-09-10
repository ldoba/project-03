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

let modal = null;

const openModal = function(e){
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', true);
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal); 
    modal.querySelector('.js-modal-close').addEventListener('click', stopPropagation); 

}
const closeModal = function(e){
    if (modal===null)return
    e.preventDefault()
    modal.style.display = none;
    modal.setAttribute('aria-hidden', true);
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    querySelector('.js-modal-close').removeEventListener('click', closeModal);
    querySelector('.js-modal-close').removeEventListener('click', stopPropagation);
    modal = null;
} 
const stopPropagation = function(e){
    e.stopPropagation()
}


document.querySelectorAll(.js-modal).forEach(a =>{
    a.addEventListener('click', openModal)
})