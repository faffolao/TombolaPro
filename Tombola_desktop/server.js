var express = require('express');
var app = express();						/* importazione mod. express */
var PORT = process.env.PORT || 3000;		/* impostazione porta */
var bodyParser = require('body-parser');	/* per le richieste post */
var fs = require('fs');						/* scrittura file json */

/* caricamento file */
var raw = fs.readFileSync('./numeriEstratti/numeriEstratti.json');
var partita = JSON.parse(raw)
console.log("% caricamento JSON");

app.use(express.static(__dirname));		/* viene "hostata" la cartella corrente (/) */
app.use(bodyParser.json());

// richiesta lettura numeri estratti
app.get('/leggiNumeri', function(req, res){
	res.send(partita);
	console.log("% lettura JSON");
});

// salvataggio partita
app.post('/scriviNumeri', function(req, res){
	var numEstr = req.body.numeriEstratti;	/* ottengo ciò che devo salvare */
	var giocCurr = req.body.giocataCorrente;
	
	partita.numeriEstratti.unshift(numEstr[0][0]);	/* per evitare l'array nell'array */
	partita.giocataCorrente = giocCurr;
	
	fs.writeFileSync('./numeriEstratti/numeriEstratti.json', JSON.stringify(partita));
	res.send("Partita salvata");
	console.log("% scrittura JSON");
});

// nuova partita
app.delete('/eliminaNumeri', function(req, res){
	partita.numeriEstratti = new Array();
	partita.giocataCorrente = 0;
	fs.writeFileSync('./numeriEstratti/numeriEstratti.json', JSON.stringify(partita));

	res.send("Nuova partita iniziata");
	console.log("% nuova partita iniziata");
});

app.listen(PORT, function(){
	// quando sono in ascolto nella porta 3000
	console.log("--{ Server in ascolto nella porta " + PORT + " }--");
	console.log("--{ per terminare il server chiudere questa finestra o premere CTRL + C }--");
});