var numeriEstratti = new Array();       // contiene i numeri che sono stati estratti
var giocataCorrente = 0;                // indica la giocata in corso (pos. nell'array giocate)
var giocate = new Array("ambo", "terna", "quaterna", "cinquina", "tombola", "tombolino");

$(document).ready(function(){
    creazioneTabella();                                 /* creazione della tabella */
    ripristinoDatiPrec();                               /* ripristino numeri da json */
    controlloNumeri();                                  // controllo disponibilità di nuovi numeri
});

/* funzione per creare la tabella */
function creazioneTabella() {
	var n = 1;
	var tab = '<table class="table table-borderless" id="tabella">';

	for (i = 1; i <= 9; i++) {
		tab += '<tr>';
		for (j = 1; j <= 10; j++) {
			tab += '<td class="casella" id="' + n + '">' + n + '</td>';
			n++;
		}
		tab += '</tr>';
	}

	$(".tabellone").append(tab);
}

/* funzione per differenza di due array */
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

function controlloNumeri(){
    // apro un socket e controllo se è arrivato un nuovo numero o se la partita è ricominciata
    var socket = io();
    socket.on('nuovo numero estratto', function(response){
        /* controllo se ci sono differenze tra i numeri */
        var tmp = response.numeriEstratti.diff(numeriEstratti);    /* la differenza dei due array viene messa qui */
        if(tmp.length > 0){ /* se vi sono effettivamente delle differenze */
            /* prendo sempre il numero in prima posizione */
            $("#" + tmp[0]).css({ "background-color": "#ff3300", "border": "1.5px solid brown", "color": "white" });
            
            numeriEstratti = response.numeriEstratti;
            giocataCorrente = response.giocataCorrente; /* recupero la giocata in corso */
            mostraNumero(tmp[0]);
        }
    });
    socket.on('partita ricominciata', function(){
        location.reload();
    });
}

function mostraNumero(num){
    $("#numeroEstratto").html(num);           
    $("strong").html(giocate[giocataCorrente]);

    //nascondo la tabella e mostro il numero estratto
	$("#tabella").css("display", "none");
	$(".bigNumber").css("display", "block");

	setTimeout(
		function () {
			$("#tabella").css("display", "table");
			$(".bigNumber").css("display", "none");
		}, 750);
}

function ripristinoDatiPrec(){
    $.ajax({
		url: 'http://localhost:3000/leggiNumeri',
		contentType: 'application/json',
		success: function(response){
            numeriEstratti = response.numeriEstratti;   /* recupero i numeri estratti */
            giocataCorrente = response.giocataCorrente; /* recupero la giocata in corso */

            numeriEstratti.forEach(function(i){
				$("#" + i).css({ "background-color": "#ff3300", "border": "1.5px solid brown", "color": "white" });
            });
            
            $("strong").html(giocate[giocataCorrente]);
        }
	});
}