var numeriDisponibili = new Array;			/* contiene i numeri non ancora estratti */
var giocate = new Array("ambo", "terna", "quaterna", "cinquina", "tombola", "tombolino");
var giocataCorrente = 0;					/* indica la giocata in corso (pos. array giocate) */
var numeriEstratti = new Array;				// contiene i numeri che sono stati estratti

/* caricamento numeri precedenti */
function caricaDatiPrec(){
	$.ajax({
		url: 'http://localhost:3000/leggiNumeri',
		contentType: 'application/json',
		success: function(response){
			// quando viene caricato l'array vengono ripristinati i vecchi numeri
			numeriEstratti = response.numeriEstratti;

			numeriDisponibili = numeriDisponibili.diff(numeriEstratti);		// differenza tra i numeri disponibili e quelli che sono stati estratti
			$(".lastNumbers").html(numeriEstratti.toString());
			
			numeriEstratti.forEach(function(i){		// evidenzio i numeri che erano stati estratti
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

function estrazione(num) {
	if(num == null){
		var rnd = Math.floor((Math.random() * numeriDisponibili.length + 1));
		num = numeriDisponibili.splice((rnd - 1), 1);	/* viene rimosso l'elemento rnd e non vengono lasciati spazi */
	}

	$("#" + num).css({ "background-color": "#ff3300", "border": "1.5px solid brown", "color": "white" });	// evidenzio il numero estratto

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

	scritturaSuFile(num);
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
function scritturaSuFile(num){
	// apro un nuovo socket e comunico al server che ho estratto un nuovo numero
	var socket = io();
	socket.emit('nuovo numero', {numero: num, giocataCorrente: giocataCorrente});
	return false;
}

/* funzione per cancellare il tabellone e iniziare una nuova partita */
function cancellaTutto(){
	// comunico al server che bisogna ricominciare una nuova partita
	var socket = io();
	socket.emit('nuova partita');
	
	// quando i dati vecchi sono stati cancellati si riaggiorna la vista
	socket.on('partita ricominciata',function(){
		location.reload();
	});
}

function inserisciNumero(){
	estrazione($("#numeroDaInserire").val());
}