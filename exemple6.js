let sketch6 = function(p) {

    p.setup = function() {
      // Crée un canvas et l'associe au conteneur exemple6Container
      let cnv = p.createCanvas(p.windowWidth / 3, p.windowHeight / 3);
      cnv.parent('exemple6Container'); 
      p.background(200);
  
      // Appelle randomColor() lorsqu'un double-clic est détecté sur le canvas
      cnv.doubleClicked(randomColor);
  
      p.describe('A gray square changes color when the user double-clicks the canvas.');
    };
  
    // Fonction pour changer la couleur de fond aléatoirement
    function randomColor() {
      let c = p.random(['red', 'yellow', 'blue', 'green']);
      p.background(c);
    }
  
    p.windowResized = function() {
      // Redimensionne le canvas
      p.resizeCanvas(p.windowWidth / 3, p.windowHeight / 3);
      // Redessine l'arrière-plan pour s'assurer que le canvas n'apparaît pas vide
    
    };
  
  };
  
  new p5(sketch6);
  