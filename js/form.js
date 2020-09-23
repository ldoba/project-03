//création des constantes nécessaires
const stationName = document.getElementById('station-name');
const inputName = document.getElementById('name');
const inputForename = document.getElementById('forename');
const btnBooking = document.getElementById('btn-booking');
const btnSubmit = document.getElementById('canvasbtn');
const afterBookingInfos = document.querySelector('.afterBookingInfos');
// desactive le bouton quand le javascript se charge
btnBooking.disabled = true;

// fonction appelee des qu'une touche est enfoncee
function isCharSet() {
  // on verifie si le champ n'est pas vide alors on desactive le bouton sinon on l'active
  if (inputName.value != "" && inputForename.value != "") {
    btnBooking.disabled = false;
  } else {
    btnBooking.disabled = true;
  }  
}
// exécuter la fonction quand le bouton 'Confirmer la réservation' est cliqué
canvasbtn.addEventListener('click', function() {
    // stocker le nom et prénom entrés dans le web storage
    sessionStorage.setItem('station-name', stationName.value);
    localStorage.setItem('name', inputName.value);
    localStorage.setItem('forename', inputForename.value);
    console.log(stationName.value);
     // exécuter nameDisplayCheck()
     nameDisplayCheck();
  });

// définit la fonction nameDisplayCheck()
function nameDisplayCheck() {
    // vérifie si les éléments 'name' et 'forename' sont stockés dans le web storage
    if(localStorage.getItem('name') && localStorage.getItem('forename') && sessionStorage.getItem('station-name')) {
        // Si c'est le cas, affiche un message personnalisé
        let stationNom = sessionStorage.getItem('station-name');
        let name = localStorage.getItem('name');
        let forename = localStorage.getItem('forename');
        afterBookingInfos.textContent = 'Vélo réservé à la station ' + stationNom + ' par ' + name + ' ' + forename + ' ' + 'Temps restant : ';
    } else {
      // Sinon, affiche une info générique
        afterBookingInfos.textContent = 'Pas de réservation en cours';
    }
  }

  document.body.onload = nameDisplayCheck;
