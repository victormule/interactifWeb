let sketch3 = function(p) {
  let progress = 0; // Cette variable suivra la progression de la barre.
  let filling = false; // Cette variable suivra si la barre est en train de se remplir.
  let font;

  p.preload = function() {
    font = p.loadFont('font/DS-DIGII.TTF');
  }

  p.setup = function() {
    let cnv = p.createCanvas(800, 60);
    cnv.parent('exemple3Container'); // Lier le canvas au div #exemple3Container
    p.textSize(36); // Taille du texte pour le pourcentage
    p.textFont(font);
    p.textAlign(p.CENTER, p.BOTTOM); // Alignement du texte au centre horizontalement
    p.rectMode(p.CORNER); // Mode de dessin des rectangles
  }

  p.draw = function() {
    p.background(220); // Définit la couleur de fond du canvas.
    
    if (filling) {
      progress += 2 - progress / 370; // Augmente la progression si la barre se remplit.
    } else {
      progress -= 1; // Diminue la progression si la barre ne se remplit pas.
    }

    // Contraindre la progression entre 0 et width-1
    progress = p.constrain(progress, 0, p.width - 1);
    
    // Calcul du pourcentage
    let percentageValue = (progress / p.width) * 100;
    
    // Détermine le nombre de décimales en fonction du pourcentage
    let decimals;
    if (percentageValue < 25) {
      decimals = 0;
    } else if (percentageValue < 50) {
      decimals = 1;
    } else if (percentageValue < 75) {
      decimals = 2;
    } else {
      decimals = 3;
    }
    
    // Formate le pourcentage avec le nombre de décimales approprié
    let percentage = percentageValue.toFixed(decimals) + '%';
    
    // Dessine le pourcentage au centre, au-dessus de la barre de chargement
    p.fill(0); // Couleur du texte (noir)
    p.text(percentage, p.width / 2, p.height - 25);

    // Dessine la barre de progression
    p.noStroke();
    p.fill(100, 100, 250); // Couleur de la barre
    p.rect(0, p.height - 20, progress, 20); // Barre en bas du canvas

    // Réinitialise la progression si la barre est pleine
    if (progress >= p.width - 1) {
      progress = 0;
    }
  }

  p.keyPressed = function() {
    if (p.keyCode === 16) { // 16 = touche Maj (Shift)
      filling = true;
      return false; // Empêche tout comportement par défaut
    }
  }
  
  p.keyReleased = function() {
    if (p.keyCode === 16) { 
      filling = false;
      return false; 
    }
  }

};

new p5(sketch3);
