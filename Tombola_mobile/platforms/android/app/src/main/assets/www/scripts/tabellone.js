var numeriEstratti = new Array();
var giocataCorrente = 0;
var giocate = new Array("ambo", "terna", "quaterna", "cinquina", "tombola", "tombolino");
var partitaNuova = true;

$(document).ready(function(){
    creazioneTabella();                                 /* creazione della tabella */
    ripristinoDatiPrec();                               /* ripristino numeri da json */
    setInterval(function (){controlloNumeri()}, 100);   /* controllo continuo nuovi numeri */
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
    $.ajax({
        url: 'http://localhost:3000/leggiNumeri',
		contentType: 'application/json',
		success: function(response){
            if(response.numeriEstratti.length <= 0 && !partitaNuova){
                partitaNuova = true;
                location.reload();
            }
            
            /* controllo se ci sono differenze tra i numeri */
            var tmp = response.numeriEstratti.diff(numeriEstratti);    /* la differenza dei due array viene messa qui */
            if(tmp.length > 0){ /* se vi sono effettivamente delle differenze */
                /* prendo sempre il numero in prima posizione */
                $("#" + tmp[0]).css({ "background-color": "#ff3300", "border": "1.5px solid brown", "color": "white" });
                
                numeriEstratti = response.numeriEstratti;
                giocataCorrente = response.giocataCorrente; /* recupero la giocata in corso */
                mostraNumero(tmp[0]);
                partitaNuova = false;
            }
		}
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