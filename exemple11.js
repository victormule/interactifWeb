let sketch11 = function(p) {
    let rectWidth;
  
    p.setup = function() {
      let cnv = p.createCanvas(p.windowWidth / 3, p.windowHeight / 3);
      cnv.parent('exemple11Container');
      p.noStroke();
      p.background(230);
      rectWidth = p.width / 20; // Ajustez le nombre de colonnes selon vos besoins
    };
  
    p.draw = function() {
      // La boucle de dessin reste vide pour permettre l'écoute des touches
    };
  
    p.keyPressed = function() {
      // Efface l'arrière-plan chaque fois qu'une nouvelle touche est pressée
      p.background(230);
  
      // Génère des couleurs aléatoires
      let randFill_r = Math.floor(Math.random() * 255);
      let randFill_g = Math.floor(Math.random() * 255);
      let randFill_b = Math.floor(Math.random() * 255);
      p.fill(randFill_r, randFill_g, randFill_b);
  
      // Utilise p.keyCode pour capturer toutes les touches
      // Limite l'index pour qu'il corresponde à la largeur du canevas
      let keyIndex = p.keyCode % 20; // Ajustez le modulo en fonction de rectWidth
  
      // Calcule la position x en fonction de l'index
      let x = keyIndex * rectWidth;
  
      // Dessine le rectangle couvrant toute la hauteur du canevas
      p.rect(x, 0, rectWidth, p.height);
  
      // Optionnel : Affiche le code de la touche
    //  p.fill(0);
    //  p.textSize(16);
    //  p.textAlign(p.CENTER, p.CENTER);
    //  p.text('KeyCode: ' + p.keyCode, x + rectWidth / 2, p.height / 2);
    };
  
    p.windowResized = function() {
      p.resizeCanvas(p.windowWidth / 3, p.windowHeight / 3);
      // Recalculer rectWidth si la taille de l'écran change
      rectWidth = p.width / 20;
      p.background(230);
    };
  };
  
  new p5(sketch11);
  