var numeriDisponibili = new Array;
var giocate = new Array("ambo", "terna", "quaterna", "cinquina", "tombola", "tombolino");
var giocataCorrente = 0;
var numeriEstratti = new Array;

/* caricamento numeri precedenti */
function caricaDatiPrec(){
	$.ajax({
		url: 'http://localhost:3000/leggiNumeri',
		contentType: 'application/json',
		success: function(response){
			// quando viene caricato l'array vengono ripristinati i vecchi numeri
			numeriEstratti = response.numeriEstratti;

			numeriDisponibili = numeriDisponibili.diff(numeriEstratti);
			$(".lastNumbers").html(numeriEstratti.toString());
			
			numeriEstratti.forEach(function(i){
				$("#" + i).css({ "background-color": "#ff3300", "border": "1.5px solid brown", "color": "white" });
			});

			//recupero giocata
			giocataCorrente = response.giocataCorrente;
			document.getElementById("giocataValida").innerHTML = giocate[giocataCorrente];
		}
	});
};


function creazioneTabella() {
	var n = 1;
	document.write('<table class="table table-borderless" id="tabella">');

	for (i = 1; i <= 9; i++) {
		document.write('<tr>');
		for (j = 1; j <= 10; j++) {
			document.write('<td class="casella" id="' + n + '">' + n + '</td>');
			n++;
		}
		document.write('</tr>');
	}

	document.write('</table>');
}

function popolaArrayNumeri() {
	for (i = 0; i < 90; i++) {
		numeriDisponibili.push(i + 1);
	}
}

function estrazione() {
	var rnd = Math.floor((Math.random() * numeriDisponibili.length + 1));
	var num = numeriDisponibili.splice((rnd - 1), 1);	/* viene rimosso l'elemento rnd e non vengono lasciati spazi */

	$("#" + num).css({ "background-color": "#ff3300", "border": "1.5px solid brown", "color": "white" });

	$("#numeroEstratto").html(num);
	numeriEstratti.unshift(num);

	//nascondo la tabella e mostro il numero estratto
	$("#tabella").css("display", "none");
	$(".bigNumber").css("display", "block");

	setTimeout(
		function () {
			$("#tabella").css("display", "table");
			$(".bigNumber").css("display", "none");
		}, 1000);

	$(".lastNumbers").html(numeriEstratti.toString());

	scritturaSuFile();
}

function avanzaGiocata() {
	if (giocataCorrente >= 5) {
		msgbox("Errore", "Le giocate sono esaurite.");
	} else {
		giocataCorrente++;
		document.getElementById("giocataValida").innerHTML = giocate[giocataCorrente];
	}
}

function arretraGiocata() {
	if (giocataCorrente <= 0) {
		msgbox("Errore", "Impossibile andare indietro.");
	} else {
		giocataCorrente--;
		document.getElementById("giocataValida").innerHTML = giocate[giocataCorrente];
	}
}

function nuovaPartita() {
	var btnSi = "<button class='btn btn-brown' onclick='cancellaTutto()'>&nbsp;Si&nbsp;</button>";
	var btnNo = "<button class='btn btn-brown' onclick='closeModal()'>&nbsp;No&nbsp;</button>";
	msgbox("Avviso", "Vuoi iniziare una nuova partita?<br>" + btnSi + "&nbsp;" + btnNo);
}

function tornaIndietro() {
	var btnSi = "<button class='btn btn-brown' onclick='goToHome()'>&nbsp;Si&nbsp;</button>";
	var btnNo = "<button class='btn btn-brown' onclick='closeModal()'>&nbsp;No&nbsp;</button>";
	msgbox("Avviso", "Vuoi tornare alla home page?<br>" + btnSi + "&nbsp;" + btnNo);
}

/* funzione per differenza di due array */
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

/* funzione per il salvataggio su json della partita */
function scritturaSuFile(){
	$.ajax({
		url: 'http://localhost:3000/scriviNumeri',
		method: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({numeriEstratti:numeriEstratti, giocataCorrente:giocataCorrente}),
		success: function(response){
			console.log(response);
		}
	});
}

/* funzione per cancellare il tabellone e iniziare una nuova partita */
function cancellaTutto(){
	$.ajax({
		url: 'http://localhost:3000/eliminaNumeri',
		method: 'DELETE',
		contentType: 'application/json',
		success: function(response){
			location.reload();
		}
	});
}