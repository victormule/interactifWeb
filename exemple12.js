let sketch12 = function(p) {
    let source; // Vidéo source
    let tiles = []; // Tableau des tuiles (inclut l'image)
    let cols = 3; // Nombre de colonnes dans le puzzle
    let rows = 3; // Nombre de rangées dans le puzzle
    let w, h; // Largeur et hauteur de chaque pièce du puzzle 
    let board = []; // Tableau pour stocker l'état du plateau de jeu
    let blankIndex; // Index de la case vide
    let shuffling = true; // Indicateur de mélange en cours
    let shuffleMoves = 100; // Nombre de mouvements pour mélanger
    let shuffleCount = 0; // Compteur de mouvements effectués
    let resetButton; // Bouton de réinitialisation
    let cnv; // Référence au canvas

    p.preload = function() {
      // Chargez votre vidéo MP4 ici
      source = p.createVideo('video/NotreDame2.mp4');
      source.hide(); // Cache la vidéo HTML
    }

    p.setup = function() {
        let canvasWidth = p.windowWidth / 3;
        let canvasHeight = canvasWidth; // Carré pour le puzzle
        cnv = p.createCanvas(canvasWidth, canvasHeight);
        cnv.parent('exemple12Container');

        // Configure la vidéo : boucle, sans son, cachée
        source.loop();
        source.volume(0);
        
        w = p.width / cols; 
        h = p.height / rows; 

        // Création des tuiles
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            let img = p.createImage(w, h); // Crée une image vide pour la pièce
            let index = i + j * cols; // Calcule l'index de la pièce
            board.push(index); // Ajoute l'index au tableau du plateau
            let tile = new Tile(index, img, i, j); // Crée une nouvelle pièce avec origI=i, origJ=j
            tiles[index] = tile; // Ajoute la pièce au tableau des pièces
          }
        }

        // Supprime la dernière pièce (qui sera la case vide)
        blankIndex = board.pop();
        tiles.pop();
        board.push(-1); // Ajoute une case vide au plateau

        // Initialisation du bouton de réinitialisation
        resetButton = p.createButton('Démarrer');
        resetButton.parent('exemple12Container');
        resetButton.mousePressed(resetPuzzle);
        resetButton.style('margin-top', '10px');

        // Positionne le bouton en dessous du puzzle
        let canvasPos = cnv.position();
        resetButton.position(canvasPos.x , canvasPos.y + p.height + 10);

        // Commence le mélange
        shufflePuzzle();
    }

    p.draw = function() {
          resetButton = p.createButton('Réinitialiser');
      p.background(0); // Fond noir pour mieux voir les tuiles

      // Mettre à jour les tuiles avec le contenu vidéo
      updateTiles();

      // Affichage des tuiles
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let index = board[i + j * cols];
          let x = i * w;
          let y = j * h;
          if (index > -1) {
            let img = tiles[index].img;
            p.image(img, x, y, w, h); // Dessine l'image de la pièce sur le canevas

            // Highlight si la tuile est voisine de la case vide
            if (isNeighbor(i, j, blankIndex % cols, p.floor(blankIndex / cols))) {
              p.noFill();
              p.stroke(50, 50, 50);
              p.strokeWeight(4);
              p.rect(x, y, w, h);
            }
          } else {
            // Case vide
            p.fill(0);
            p.noStroke();
            p.rect(x, y, w, h);
          }
        }
      }

      // Dessine la grille du puzzle
      p.stroke(255); // Couleur de la grille
      p.strokeWeight(2);
      for (let i = 0; i <= cols; i++) {
        p.line(i * w, 0, i * w, p.height);
      }
      for (let j = 0; j <= rows; j++) {
        p.line(0, j * h, p.width, j * h);
      }

      // Affiche "SOLVED!" si le puzzle est résolu
      if (isSolved()) {
        p.fill(255, 0, 0);
        p.noStroke();
        p.textSize(48);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("SOLVED!", p.width / 2, p.height / 2);
        source.pause(); // Pause la vidéo
        p.noLoop(); // Arrête le dessin une fois résolu
        console.log("SOLVED");  // Affiche "SOLVED" dans la console si le puzzle est résolu
      }
    }

    p.windowResized = function() {
      let canvasWidth = p.windowWidth / 3;
      let canvasHeight = canvasWidth; // Maintient le carré
      p.resizeCanvas(canvasWidth, canvasHeight);

      w = p.width / cols; 
      h = p.height / rows; 
      // Recréation des images des tuiles à la bonne taille
      for (let i = 0; i < tiles.length; i++) {
        tiles[i].img = p.createImage(w, h);
      }
      p.background(0); // Rafraîchit le fond après redimensionnement
      updateTiles(); // Met à jour les tuiles avec la nouvelle taille

      // Repositionne le bouton de réinitialisation
      let canvasPos = cnv.position();
      resetButton.position(canvasPos.x , canvasPos.y + p.height + 10);
    }

    p.mousePressed = function() {
      if (shuffling) return; // Ignore les clics pendant le mélange
      let i = p.floor(p.mouseX / w);
      let j = p.floor(p.mouseY / h);
      move(i, j, board); // Déplace la pièce cliquée
    }

    function updateTiles() {
      // Utilise get() pour capturer l'image actuelle de la vidéo
      let videoFrame = source.get(0, 0, source.width, source.height);
      for (let tile of tiles) {
        if (tile) {
          let sx = tile.origI * source.width / cols;
          let sy = tile.origJ * source.height / rows;
          tile.img = videoFrame.get(sx, sy, source.width / cols, source.height / rows);
        }
      }
    }

    function swap(i, j, arr) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      // Met à jour l'index de la case vide
      if (arr[i] === -1) blankIndex = i;
      if (arr[j] === -1) blankIndex = j;
    }

    function randomMove(arr) {
      let possibleMoves = getPossibleMoves(arr);
      if (possibleMoves.length > 0) {
        let move = p.random(possibleMoves);
        swap(blankIndex, move, arr);
      }
    }

    function simpleShuffle(arr, moves = 100) {
      for (let i = 0; i < moves; i++) {
        randomMove(arr); // Effectue des mouvements aléatoires pour mélanger les pièces
      }
    }

    function shufflePuzzle() {
      shuffleCount = 0;
      shuffling = true;
      // Utilise setInterval pour éviter de bloquer le thread principal
      let interval = setInterval(() => {
        if (shuffleCount < shuffleMoves) {
          randomMove(board);
          shuffleCount++;
        } else {
          clearInterval(interval);
          shuffling = false;
          p.loop(); // Reprend le dessin
        }
      }, 1); // Intervalle en millisecondes
    }

    function resetPuzzle() {
      // Réinitialise le plateau à l'état résolu
      board = [];
      for (let i = 0; i < cols * rows -1; i++) {
        board.push(i);
      }
      board.push(-1); // Case vide
      blankIndex = cols * rows -1;
      tiles = [];
      // Recréation des tuiles
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let index = i + j * cols;
          if (index < cols * rows -1) {
            let img = p.createImage(w, h);
            let tile = new Tile(index, img, i, j);
            tiles[index] = tile;
          }
        }
      }
      source.loop(); // Reprend la vidéo
      simpleShuffle(board, shuffleMoves); // Mélange à nouveau
      shuffling = true;
      p.noLoop(); // Arrête le dessin pendant le mélange
      shufflePuzzle(); // Recommence le mélange
      // p.loop() sera appelé à la fin de shufflePuzzle
    }

    function getPossibleMoves(arr) {
      let possible = [];
      let blankCol = blankIndex % cols;
      let blankRow = p.floor(blankIndex / cols);
      // Vérifie les voisins
      let directions = [
        {i: blankCol -1, j: blankRow},
        {i: blankCol +1, j: blankRow},
        {i: blankCol, j: blankRow -1},
        {i: blankCol, j: blankRow +1}
      ];
      for (let dir of directions) {
        if (dir.i >=0 && dir.i < cols && dir.j >=0 && dir.j < rows) {
          possible.push(dir.i + dir.j * cols);
        }
      }
      return possible;
    }

    function isSolved() {
      for (let i = 0; i < board.length -1; i++) {
        if (board[i] !== i) {
          return false; // Vérifie si chaque pièce est à sa place
        }
      }
      return true;
    }

    function move(i, j, arr) {
      let clickedIndex = i + j * cols;
      if (isNeighbor(i, j, blankIndex % cols, p.floor(blankIndex / cols))) {
        swap(blankIndex, clickedIndex, arr); // Échange la pièce cliquée avec la case vide si elles sont voisines
      }
    }

    function isNeighbor(i, j, x, y) {
      // Vérifie si (i, j) est adjacent à (x, y)
      if (i === x && p.abs(j - y) === 1) {
        return true;
      }
      if (j === y && p.abs(i - x) === 1) {
        return true;
      }
      return false;
    }

    class Tile {
      constructor(index, img, origI, origJ) {
        this.index = index; // Index de la tuile
        this.img = img;    // Image associée à la tuile 
        this.origI = origI; // Position originale colonne
        this.origJ = origJ; // Position originale rangée
      }
    }

};
new p5(sketch12);
