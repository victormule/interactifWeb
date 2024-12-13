let sketch12 = function(p) {
    let source; // Vidéo source
    let tiles = []; // Tableau des tuiles (inclut l'image)
    let cols = 3; // Nombre de colonnes dans le puzzle
    let rows = 3; // Nombre de rangées dans le puzzle
    let w, h; // Largeur et hauteur de chaque pièce du puzzle 
    let board = []; // Tableau pour stocker l'état du plateau de jeu
  
    p.preload = function() {
      // Chargez votre vidéo MP4 ici
      source = p.createVideo('video/NotreDame2.mp4');
    }
  
    p.setup = function() {
      let cnv = p.createCanvas(p.windowWidth / 3, p.windowHeight / 3);
      cnv.parent('exemple12Container');
  
      // Configure la vidéo : boucle, sans son, cachée
      source.loop();
      source.volume(0);
      source.hide();
  
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
      tiles.pop();
      board.pop();
      board.push(-1); // Ajoute une case vide au plateau
  
      simpleShuffle(board); // Mélange les pièces du plateau
    }
  
    p.draw = function() {
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
          } else {
            // Case vide
            p.fill(0);
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
  
      // Vérifie si le puzzle est résolu
      if (isSolved()) {
        p.fill(255);
        p.textSize(32);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("SOLVED!", p.width / 2, p.height / 2);
        p.noLoop(); // Arrête le dessin une fois résolu
        console.log("SOLVED");  // Affiche "SOLVED" dans la console si le puzzle est résolu
      }
    }
  
    p.windowResized = function() {
      p.resizeCanvas(p.windowWidth / 3, p.windowHeight / 3);
      w = p.width / cols; 
      h = p.height / rows; 
      // Recréation des images des tuiles à la bonne taille
      for (let i = 0; i < tiles.length; i++) {
        tiles[i].img = p.createImage(w, h);
      }
      p.background(0); // Rafraîchit le fond après redimensionnement
      updateTiles(); // Met à jour les tuiles avec la nouvelle taille
    }
  
    p.mousePressed = function() {
      let i = p.floor(p.mouseX / w);
      let j = p.floor(p.mouseY / h);
      move(i, j, board); // Déplace la pièce cliquée
    }
  
    function updateTiles() {
      source.loadPixels();
      for (let tile of tiles) {
        // Copier la portion de la vidéo correspondant à la position originale de la tuile
        if (tile) {
          tile.img.copy(source, tile.origI * w, tile.origJ * h, w, h, 0, 0, w, h);
        }
      }
    }
  
    function swap(i, j, arr) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  
    function randomMove(arr) {
      let r1 = p.floor(p.random(cols));
      let r2 = p.floor(p.random(rows));
      move(r1, r2, arr);
    }
  
    function simpleShuffle(arr) {
      for (let i = 0; i < 1000; i++) {
        randomMove(arr); // Effectue 1000 mouvements aléatoires pour mélanger les pièces
      }
    }
  
    function isSolved() {
      for (let i = 0; i < board.length - 1; i++) {
        if (board[i] !== tiles[i].index) {
          return false; // Vérifie si chaque pièce est à sa place
        }
      }
      return true;
    }
  
    function move(i, j, arr) {
      let blank = findBlank();
      let blankCol = blank % cols;
      let blankRow = p.floor(blank / cols);
  
      if (isNeighbor(i, j, blankCol, blankRow)) {
        swap(blank, i + j * cols, arr); // Échange la pièce cliquée avec la case vide si elles sont voisines
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
  
    function findBlank() {
      for (let i = 0; i < board.length; i++) {
        if (board[i] === -1) return i; // Trouve la case vide
      }
      return -1; // Retourne -1 si aucune case vide n'est trouvée
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
  