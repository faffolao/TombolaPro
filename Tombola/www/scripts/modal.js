$(document).ready(function(){
  $("#openModal").click(function(){
    msgbox("Informazioni su","Tombola v2.0<br>&copy; 2019 Federico Arduini (faffolao)");
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

/* per la finestra modale con i pulsanti */
function goToHome(){
  window.location = "index.html";
}

function closeModal(){
  $("#modale-info").css("display","none");
}