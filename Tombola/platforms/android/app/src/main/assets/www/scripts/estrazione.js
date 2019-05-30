var numeriEstratti = new Array;
var giocate = new Array("ambo","terna","quaterna","cinquina","tombola","tombolino");
var giocataCorrente = 0;

function creazioneTabella(){
  var n=1;
	document.write('<table class="table table-borderless" id="tabella">');

	for(i=1;i<=9;i++){
		document.write('<tr>');
		for(j=1;j<=10;j++){
			document.write('<td class="urlo" id="' + n + '">' + n + '</td>');
			n++;
		}
		document.write('</tr>');
	}

	document.write('</table>');
}

function estrazione(){
	var num;

	do{
		num = Math.floor((Math.random() * 90) + 1);
	}while(!numeroUnico(num));

	numeriEstratti.push(num);

	$("#"+num).css({"background-color":"#ff3300","border":"1.5px solid brown","color":"white"});

	$("#numeroEstratto").html(num);

	//nascondo la tabella e mostro il numero estratto
	$("#tabella").css("display","none");
	$(".bigNumber").css("display","block");

	setTimeout(
		function(){
      $("#tabella").css("display","table");
    	$(".bigNumber").css("display","none");
		}, 1000);

	$(".lastNumbers").html(visualizzaArray());
}

function numeroUnico(num){
	for(i=0;i<numeriEstratti.length;i++){
		if(numeriEstratti[i] == num){
			return false;
		}
	}
	return true;
}

function visualizzaArray(){
	var s = "";
	for(i=numeriEstratti.length-1;i>=0;i--){
		s+=numeriEstratti[i] + " ";
	}
	return s;
}

function avanzaGiocata(){
	if(giocataCorrente >= 5){
		msgbox("Errore","Le giocate sono esaurite.");
	}else{
		giocataCorrente++;
		document.getElementById("giocataValida").innerHTML=giocate[giocataCorrente];
	}
}

function arretraGiocata(){
	if(giocataCorrente <= 0){
		msgbox("Errore","Impossibile andare indietro.");
	}else{
		giocataCorrente--;
		document.getElementById("giocataValida").innerHTML=giocate[giocataCorrente];
	}
}

function nuovaPartita(){
	if(confirm("Desideri iniziare una nuova partita?")){
		window.location.reload();
	}
}

function tornaIndietro(){
  if(confirm("Vuoi uscire dalla partita in corso e tornare indietro alla home?")){
    window.location = "index.html";
  }
}
