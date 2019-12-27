var express = require('express');
var cors = require('cors');
var app = express();						/* importazione mod. express */
var http = require('http').Server(app);		/* viene aperta la porta 3000 */
var io = require('socket.io')(http);		/* importazione socket.io */
var helmet = require('helmet');				/* per aumentare la sicurezza */
var bodyParser = require('body-parser');	/* per le richieste post */
var fs = require('fs');						/* scrittura file json */

/* caricamento file */
var raw = fs.readFileSync('./numeriEstratti/numeriEstratti.json');
var partita = JSON.parse(raw);			// leggo il json e lo trasformo in un oggetto
console.log("% caricamento JSON");

app.use(helmet());						// indico che sto usando HELMET
app.use(cors());
app.use(express.static(__dirname));		// vengono resi fruibili tutti i contenuti della cartella
app.use(bodyParser.json());

// quando un utente (tabellone o estrattore) si connette viene emesso un messaggio
io.on('connection', function(socket){
	console.log('=> ricevuta una richiesta in entrata');
	
	socket.on('disconnect', function(){					/* abbandono tabellone/estrazione */
		console.log('<= un client si è disconnesso');
	});

	socket.on('nuovo numero', function(obj){			/* estratto nuovo numero */
		var numEstr = obj.numero;
		var giocCurr = obj.giocataCorrente;

		partita.numeriEstratti.unshift(numEstr[0]);	/* per evitare l'array nell'array */
		partita.giocataCorrente = giocCurr;

		fs.writeFileSync('./numeriEstratti/numeriEstratti.json', JSON.stringify(partita));
		console.log("% scrittura JSON");
		io.emit('nuovo numero estratto', partita);		// comunico che un nuovo numero è stato estratto
	});

	socket.on('nuova partita', function(){
		// ricostruisco l'oggetto partita con dati vuoti
		partita.numeriEstratti = new Array();
		partita.giocataCorrente = 0;
		fs.writeFileSync('./numeriEstratti/numeriEstratti.json', JSON.stringify(partita));

		io.emit('partita ricominciata');
		console.log("% nuova partita iniziata");
	});
});

// richiesta lettura numeri estratti
app.get('/leggiNumeri', function(req, res){
	res.send(partita);
	console.log("% lettura JSON");
});

http.listen(3000, function(){
	// quando sono in ascolto nella porta 3000
	console.log("--{ Server in ascolto nella porta 3000 }--");
	console.log("--{ per terminare il server chiudere questa finestra o premere CTRL + C }--");
});