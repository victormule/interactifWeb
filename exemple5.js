let sketch5 = function(p) {
  let num = 60;
  let mx = [];
  let my = [];

  p.setup = function() {
    let cnv = p.createCanvas(p.windowWidth / 3, p.windowHeight / 3);
    cnv.parent('exemple5Container'); // Lier le canvas au div #exemple3Container
    p.noStroke();
    p.fill(255, 153);
    for (let i = 0; i < num; i++) {
      mx.push(i);
      my.push(i);
    }
  };

  p.draw = function() {
    p.background(237, 34, 93);

    // Cycle through the array, using a different entry on each frame.
    let which = p.frameCount % num;
    mx[which] = p.mouseX;
    my[which] = p.mouseY;

    for (let i = 0; i < num; i++) {
      let index = (which + 1 + i) % num;
      p.ellipse(mx[index], my[index], i, i);
    }
  };
  p.windowResized = function() {
    // Redimensionne le canvas
    p.resizeCanvas(p.windowWidth / 3, p.windowHeight / 3);
    // Redessine l'arrière-plan pour s'assurer que le canvas n'apparaît pas vide
  
  };
};

new p5(sketch5);
