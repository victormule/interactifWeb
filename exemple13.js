// Assurez-vous que la bibliothèque p5.sound est incluse dans votre projet
// <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js"></script>

let sketch13 = function(p) {
    let song; // Objet SoundFile
    let startButton; // Bouton Start
    let stopButton; // Bouton Stop
    let cnv; // Référence au canvas

    p.preload = function() {
        // Charger le fichier sonore
        song = p.loadSound('sound/sound1.mp3');
    }

    p.setup = function() {
        // Définir la taille du canvas
        let canvasWidth = p.windowWidth / 3;
        let canvasHeight = p.windowHeight / 3;
        cnv = p.createCanvas(canvasWidth, canvasHeight);
        cnv.parent('exemple13Container'); // Assurez-vous d'avoir un conteneur avec l'id 'exemple13Container' dans votre HTML

        // Initialiser le son sans le démarrer automatiquement
        song.setVolume(0.5); // Volume initial
        song.rate(1); // Taux de lecture initial

        // Création du bouton Start
        startButton = p.createButton('Start');
        startButton.parent('exemple13Container');
        startButton.mousePressed(startSketch);
        startButton.style('margin-top', '10px');
        startButton.style('margin-right', '10px');

        // Création du bouton Stop
        stopButton = p.createButton('Stop');
        stopButton.parent('exemple13Container');
        stopButton.mousePressed(stopSketch);
        stopButton.style('margin-top', '10px');

        // Positionner les boutons sous le canvas
        positionButtons();
    }

    p.draw = function() {
        p.background(200);

        // Si le son est en lecture, ajuster le volume et le taux de lecture en fonction de la souris
        if (song.isPlaying()) {
            // Map le volume à la position X de la souris
            let volume = p.map(p.mouseX, 0, p.width, 0, 1);
            volume = p.constrain(volume, 0, 1);
            song.setVolume(volume);

            // Map le taux de lecture (rate) à la position Y de la souris
            let speed = p.map(p.mouseY, 0, p.height, 0.01, 4);
            speed = p.constrain(speed, 0.01, 4);
            song.rate(speed);
        }

        // Dessiner des cercles pour visualiser les contrôles
        p.stroke(0);
        p.fill(51, 100);
        p.ellipse(p.mouseX, 100, 48, 48);
        p.ellipse(100, p.mouseY, 48, 48);
    }

    p.windowResized = function() {
        // Redimensionner le canvas
        let canvasWidth = p.windowWidth / 3;
        let canvasHeight = p.windowHeight / 3;
        p.resizeCanvas(canvasWidth, canvasHeight);

        // Repositionner les boutons
        positionButtons();
    }

    function positionButtons() {
        // Obtenir la position du canvas
        let canvasPos = cnv.position();
        // Positionner les boutons sous le canvas
        startButton.position(canvasPos.x, canvasPos.y + p.height + 10);
        stopButton.position(startButton.x + startButton.width + 10, canvasPos.y + p.height + 10);
    }

    function startSketch() {
        if (!song.isPlaying()) {
            song.loop();
        }
    }

    function stopSketch() {
        if (song.isPlaying()) {
            song.stop();
        }
    }
}

// Créer une nouvelle instance p5 avec sketch13
new p5(sketch13);
