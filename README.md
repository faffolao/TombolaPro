
<h1 id="tombola">Tombola</h1>
<p>Semplice applicazione per la tombola, creata con HTML, CSS, Bootstrap 4, JS, jQuery, Node.js e Socket.io e convertita in applicativo Android tramite Cordova.</p>
<h2 id="funzionalità">Funzionalità</h2>
<ul>
<li>Compatibile con tutti i sistemi operativi (Windows, macOS, Linux)</li>
<li>Leggera e non necessita di installazione</li>
<li>Due pagine per l’estrazione: una riservata all’estrattore e una per il tabellone, proiettabile su uno schermo separato. Il tabellone mostra in tempo reale i numeri che vengono estratti</li>
<li>È possibile controllare anche le giocate</li>
<li>Comprende anche l’app per Android (non sono inclusi il server web e il tabellone)</li>
</ul>
<h2 id="requisiti">Requisiti</h2>
<ul>
<li>Un browser web;</li>
<li>Node.js installato. Nel caso non sia installato è possibile scaricarlo da <a href="https://nodejs.org/">https://nodejs.org/</a>.</li>
</ul>
<h2 id="come-avviarla">Come avviarla</h2>
<p>Posizionarsi nella cartella <code>Tombola_desktop</code> e digitare:</p>
<pre><code>node server
</code></pre>
<p>per avviare il server della Tombola.<br>
Per iniziare a giocare digitare nel proprio browser web l’indirizzo <a href="http://localhost:3000">http://localhost:3000</a>.</p>
<p>Un file eseguibile (<em>tombola.bat</em> per Windows e <em><a href="http://tombola.sh">tombola.sh</a></em> per linux e macOS) è predisposto per automatizzare le procedure indicate sopra. Per avviarlo su Windows è sufficiente un doppio click sul file, mentre su Linux e su macOS è necessario <strong>fare un doppio click e avviarlo sul terminale.</strong><br>
<strong>Per garantire il corretto funzionamento di alcune librerie è consigliato avere una connessione ad Internet.</strong></p>
<h2 id="changelog">Changelog</h2>
<ul>
<li><strong>versione 2.2 (7/7/2019)</strong>: Aggiunte le cartelle della tombola: è possibile usare fino a due cartelle generate casualmente. Risoluzione di bug minori</li>
<li><strong>versione 2.1 (3/6/2019)</strong>: Implementazione di Socket.io (web socket) nel server.</li>
<li><strong>versione 2.0 (3/6/2019)</strong>: aggiunta del server web basato su Node.js, aggiunta della pagina del tabellone, miglioramento generale della grafica e di alcune funzioni.</li>
<li><strong>versione 1.0 (30/5/2019)</strong>: release iniziale.</li>
</ul>
<h2 id="contatti">Contatti</h2>
<p>In caso di problemi con l’applicazione è possibile contattarmi scrivendo a <a href="mailto:federico_arduini@live.it">federico_arduini@live.it</a>.</p>

