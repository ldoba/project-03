function checkEmpty(){
   if(document.getElementById('name').value != ""){
      document.getElementById('btn-booking').disabled = "";
   }
   else{
      document.getElementById('btn-booking').disabled = "disabled";
   }
}