let sketch1 = function(p) {
    p.setup = function() {
    let cnv = p.createCanvas(p.windowWidth / 3, p.windowHeight / 3);
      cnv.parent('exemple1Container'); // Lier le canvas au div #exemple1Container
      p.noStroke();
      p.rectMode(p.CENTER);
    };
  
    p.draw = function() {
      p.background(230);
  
      let r1 = p.map(p.mouseX, 0, p.width, 0, p.height);
      let r2 = p.height - r1;
  
      p.fill(237, 34, 93, r1);
      p.rect(p.width / 2 + r1 / 2, p.height / 2, r1, r1);
  
      p.fill(237, 34, 93, r2);
      p.rect(p.width / 2 - r2 / 2, p.height / 2, r2, r2);
    };
  
    p.windowResized = function() {
        // Redimensionne le canvas
        p.resizeCanvas(p.windowWidth / 3, p.windowHeight / 3);
        // Redessine l'arrière-plan pour s'assurer que le canvas n'apparaît pas vide
      
      };
  };
  
  new p5(sketch1);
  