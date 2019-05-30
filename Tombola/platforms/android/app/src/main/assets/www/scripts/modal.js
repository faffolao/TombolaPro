/*var modal = document.getElementById("modale-info");

// Get the button that opens the modal
var btn = document.getElementById("openModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
*/

$(document).ready(function(){
  $("#openModal").click(function(){
    msgbox("Informazioni su","Tombola v1.0<br>&copy; 2019 Federico Arduini (faffolao)");
  });

  $(".close").click(function(){
    $("#modale-info").css("display","none");
  });
});

function msgbox(title, msg){
  $(".close").html("&times; " + title);
  $(".modal-body").html("<h4>" + msg + "</h4>");
  $("#modale-info").css("display","block");
}
